import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import wabtInit from "wabt";

const root = process.cwd();
const sourcePath = path.join(
  root,
  "src",
  "components",
  "lab",
  "wasm",
  "boids-neighborhood.wat",
);
const outputDir = path.join(root, "public", "lab", "wasm");
const outputPath = path.join(outputDir, "boids-neighborhood.wasm");

const wabt = await wabtInit();
const source = await readFile(sourcePath, "utf8");
const watModule = wabt.parseWat(sourcePath, source);

try {
  watModule.resolveNames();
  watModule.validate();
  const { buffer } = watModule.toBinary({
    log: false,
    write_debug_names: true,
  });

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, Buffer.from(buffer));
  console.log(`Wrote ${path.relative(root, outputPath)}`);
} finally {
  watModule.destroy();
}
