# Local Font Assets

Committed Latin WOFF2 subsets for `next/font/local`. Files may be retained as
source material even when they are not globally wired into `src/app/layout.tsx`.

| Family | File | Source CSS URL | License |
| --- | --- | --- | --- |
| Inter | `inter-latin-variable.woff2` | `https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap` | `OFL-Inter.txt` |
| Newsreader | `newsreader-latin-variable.woff2` | `https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..500;1,6..72,300..500&display=optional` | `OFL-Newsreader.txt` |
| Newsreader Italic | `newsreader-latin-italic-variable.woff2` | same as Newsreader | `OFL-Newsreader.txt` |
| JetBrains Mono | `jetbrains-mono-latin-variable.woff2` | `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap` | `OFL-JetBrains-Mono.txt` |
| Sacramento | `sacramento-latin-regular.woff2` | `https://fonts.googleapis.com/css2?family=Sacramento&display=swap` | `OFL-Sacramento.txt` |

Keep Newsreader `display: "optional"` and the interface fonts `display: "swap"`
unless a performance measurement says otherwise. The normal Newsreader face is
the global display face; the italic file is retained for future route-specific
loading, while global italic text currently uses browser synthesis to stay
inside the route font budget.
