# Harsh Singh – Portfolio (v2)

Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Three.js / React Three Fiber.

## Edit content
Everything on the site comes from src/data/portfolio.ts. Change text there, commit and push; Vercel redeploys automatically.

## Run locally
    npm install
    npm run dev      # http://localhost:3000

## Deploy on Vercel
Push this folder to GitHub, then in Vercel: Add New > Project > Import > Deploy. The Next.js preset is detected automatically.

## Structure
- src/app: layout, page, global styles
- src/components: one file per section (Hero, Rack, Skills, ...)
- src/data: portfolio.ts (your content), worldDots.ts (map data)
