# prime-minds (website)

The Prime Minds landing page at https://www.khalk.co. Next.js 16 on Vercel, DNS on Cloudflare.

Part of the Prime Minds workspace:

```
~/projects/primeminds/   global brief + brand   (Moondsun-999/prime-minds-hq)
├── website/             this repo              (Moondsun-999/prime-minds)
└── ops/                 business operations    (Moondsun-999/prime-minds-ops)
```

## Run it

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

## Before a PR

```bash
npm run lint && npx tsc --noEmit && npm run build
```

Deployment details: [docs/deployment.md](docs/deployment.md). Working rules for Claude: [CLAUDE.md](CLAUDE.md).
