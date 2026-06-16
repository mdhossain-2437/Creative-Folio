# Public IP Access

The app scripts bind Next.js to `0.0.0.0:3000`, so the server accepts traffic
from outside the machine when the network path allows it.

Production/local URL:

```text
http://20.219.204.239:3000
```

Run locally:

```bash
corepack pnpm dev
```

If the URL does not open from another device, check the network layer:

- The machine firewall allows inbound TCP `3000`.
- The cloud/router security group forwards TCP `3000` to this device.
- The public IP `20.219.204.239` is assigned to this machine or forwards to it.

For Google indexing, prefer the HTTPS canonical domain
`https://2027.delowarhossain.dev`; public-IP access is useful for previewing,
but search engines should index the canonical domain, not the raw IP.
