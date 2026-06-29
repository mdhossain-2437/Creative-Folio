#!/usr/bin/env node

import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const workspace = process.cwd();
const lhciDir = path.join(workspace, ".lighthouseci");
const configPath = path.join(workspace, "lighthouserc.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolvePnpmPackageDir(packageName) {
  const pnpmDir = path.join(workspace, "node_modules", ".pnpm");
  const escaped = packageName.replace("/", "+");
  const match = fs
    .readdirSync(pnpmDir)
    .find((entry) => entry === escaped || entry.startsWith(`${escaped}@`));

  if (!match) {
    throw new Error(`Unable to resolve ${packageName} under node_modules/.pnpm`);
  }

  return path.join(pnpmDir, match, "node_modules", packageName);
}

function removePreviousReports() {
  fs.mkdirSync(lhciDir, { recursive: true });
  for (const fileName of fs.readdirSync(lhciDir)) {
    if (
      !/^lhr-\d+\.(json|html)$/.test(fileName) &&
      fileName !== "assertion-results.json" &&
      fileName !== "manifest.json" &&
      fileName !== "links.json"
    ) {
      continue;
    }

    const target = path.resolve(lhciDir, fileName);
    if (!target.startsWith(lhciDir)) {
      throw new Error(`Refusing to remove outside .lighthouseci: ${target}`);
    }
    fs.rmSync(target, { force: true });
  }
}

function runInherited(command, args) {
  const result = childProcess.spawnSync(command, args, {
    cwd: workspace,
    env: process.env,
    shell: false,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function waitForServer(command, readyPattern, timeoutMs) {
  const child = childProcess.spawn(command, {
    cwd: workspace,
    env: process.env,
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  const readyRegex = new RegExp(readyPattern, "i");
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    let settled = false;
    let output = "";

    const done = (error) => {
      if (settled) return;
      settled = true;
      clearInterval(timer);
      if (error) {
        killServer(child);
        reject(error);
      } else {
        resolve(child);
      }
    };

    const onData = (chunk) => {
      const text = chunk.toString();
      output += text;
      process.stdout.write(`[lhci-server] ${text}`);
      if (readyRegex.test(output)) {
        done();
      }
    };

    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("exit", (code) => {
      if (!settled) {
        done(new Error(`LHCI server exited before readiness with code ${code}`));
      }
    });

    const timer = setInterval(() => {
      if (Date.now() - startedAt > timeoutMs) {
        done(
          new Error(
            `Timed out waiting for LHCI server readiness pattern: ${readyPattern}`,
          ),
        );
      }
    }, 250);
  });
}

function killServer(child) {
  if (!child.pid) return;
  if (process.platform === "win32") {
    childProcess.spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
      stdio: "ignore",
    });
  } else {
    child.kill("SIGTERM");
  }
}

function isLhrLike(value) {
  return (
    value.startsWith("{") &&
    value.includes('"lighthouseVersion":') &&
    value.endsWith("}")
  );
}

function runLighthouse(url, index, settings) {
  const lighthouseDir = resolvePnpmPackageDir("lighthouse");
  const lighthouseCli = path.join(lighthouseDir, "cli", "index.js");
  const flagsPath = path.join(lhciDir, `flags-${index}.json`);
  fs.writeFileSync(flagsPath, JSON.stringify(settings));

  const child = childProcess.spawnSync(
    process.execPath,
    [
      lighthouseCli,
      url,
      "--output",
      "json",
      "--output-path",
      "stdout",
      "--cli-flags-path",
      flagsPath,
    ],
    {
      cwd: workspace,
      env: process.env,
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 64,
    },
  );

  fs.rmSync(flagsPath, { force: true });

  const stdout = child.stdout.trim();
  const stderr = child.stderr.trim();
  const hasRecoverableWindowsCleanupError =
    process.platform === "win32" &&
    child.status === 1 &&
    isLhrLike(stdout) &&
    /EPERM|ChromeLauncher|taskkill/i.test(stderr);

  if (child.status !== 0 && !hasRecoverableWindowsCleanupError) {
    process.stderr.write(stderr);
    throw new Error(`Lighthouse failed for ${url} with code ${child.status}`);
  }

  if (hasRecoverableWindowsCleanupError) {
    process.stderr.write(
      `Recovered Lighthouse report for ${url} after Windows Chrome cleanup warning.\n`,
    );
  }

  if (!isLhrLike(stdout)) {
    throw new Error(`Lighthouse did not produce a valid JSON report for ${url}`);
  }

  const reportPath = path.join(lhciDir, `lhr-${Date.now() + index}.json`);
  fs.writeFileSync(reportPath, stdout);
}

async function main() {
  const config = readJson(configPath).ci;
  const collect = config.collect;
  const urls = Array.isArray(collect.url) ? collect.url : [collect.url];
  const settings = collect.settings || {};
  const lhciCli = path.join(resolvePnpmPackageDir("@lhci/cli"), "src", "cli.js");

  runInherited(process.execPath, [lhciCli, "healthcheck", "--fatal"]);
  removePreviousReports();

  const server = await waitForServer(
    collect.startServerCommand,
    collect.startServerReadyPattern || "listen|ready",
    collect.startServerReadyTimeout || 10000,
  );

  try {
    urls.forEach((url, index) => {
      process.stdout.write(`Running Lighthouse 1 time(s) on ${url}\n`);
      process.stdout.write(`Run #1...`);
      runLighthouse(url, index, settings);
      process.stdout.write("done.\n");
    });
  } finally {
    killServer(server);
  }

  runInherited(process.execPath, [lhciCli, "assert", "--config=lighthouserc.json"]);
  runInherited(process.execPath, [lhciCli, "upload", "--config=lighthouserc.json"]);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
