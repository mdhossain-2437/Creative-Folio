# Local Font Assets

Committed Latin WOFF2 subsets retained as unwired source material. The public
site uses its original `next/font/google` configuration in
`src/app/layout.tsx`; do not substitute these files without explicit visual
approval and a rendered typography comparison.

| Family | File | Source CSS URL | License |
| --- | --- | --- | --- |
| Inter | `inter-latin-variable.woff2` | `https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap` | `OFL-Inter.txt` |
| Newsreader | `newsreader-latin-variable.woff2` | `https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..500;1,6..72,300..500&display=optional` | `OFL-Newsreader.txt` |
| Newsreader Italic | `newsreader-latin-italic-variable.woff2` | same as Newsreader | `OFL-Newsreader.txt` |
| JetBrains Mono | `jetbrains-mono-latin-variable.woff2` | `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap` | `OFL-JetBrains-Mono.txt` |
| Sacramento | `sacramento-latin-regular.woff2` | `https://fonts.googleapis.com/css2?family=Sacramento&display=swap` | `OFL-Sacramento.txt` |

The original global configuration keeps Newsreader `display: "optional"` with
300, 400, and 500 weights in normal and italic styles. Inter, JetBrains Mono,
and Sacramento use `display: "swap"`. These files are not imported by the root
layout.
