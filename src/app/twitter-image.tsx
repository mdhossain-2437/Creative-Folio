// Twitter / X uses og:image as a fallback automatically, but Next.js
// supports a separate twitter-image file convention so platforms that
// distinguish the two (Twitter v2 cards, LinkedIn, Slack) can be served
// the same artwork. We re-export the OG generator with explicit `runtime`
// because Next requires the runtime export to live in the route module
// itself, not be re-exported.
import OG, { alt as ogAlt, size as ogSize, contentType as ogContentType } from "./opengraph-image";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;
export const runtime = "nodejs";

export default OG;
