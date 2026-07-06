import { NextResponse } from "next/server";

export const runtime = "edge";

const PREFETCH_ROUTES = ["/works", "/lab", "/journal", "/about", "/ai"];
const PRERENDER_ROUTES = ["/works", "/lab"];

type SpeculationRules = {
  prefetch: Array<{
    source: "list";
    urls: string[];
    eagerness: "moderate";
  }>;
  prerender: Array<{
    source: "list";
    urls: string[];
    eagerness: "conservative";
  }>;
};

const EMPTY_RULES: SpeculationRules = {
  prefetch: [],
  prerender: [],
};

const ACTIVE_RULES: SpeculationRules = {
  prefetch: [
    {
      source: "list",
      urls: PREFETCH_ROUTES,
      eagerness: "moderate",
    },
  ],
  prerender: [
    {
      source: "list",
      urls: PRERENDER_ROUTES,
      eagerness: "conservative",
    },
  ],
};

function constrainedByRequest(headers: Headers): boolean {
  const saveData = headers.get("save-data")?.toLowerCase() === "on";
  const effectiveConnectionType = headers.get("ect")?.toLowerCase() ?? "";
  return (
    saveData ||
    effectiveConnectionType === "slow-2g" ||
    effectiveConnectionType === "2g" ||
    effectiveConnectionType === "3g"
  );
}

export function GET(request: Request) {
  const rules = constrainedByRequest(request.headers) ? EMPTY_RULES : ACTIVE_RULES;

  return new NextResponse(JSON.stringify(rules), {
    headers: {
      "Content-Type": "application/speculationrules+json; charset=utf-8",
      "Cache-Control": "private, max-age=300, stale-while-revalidate=86400",
      Vary: "Save-Data, ECT",
    },
  });
}
