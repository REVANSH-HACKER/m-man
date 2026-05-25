# The Missile Man — Endurance / Triathlon Platform (UI)

Static HTML/CSS/JS UI for an endurance triathlon platform inspired by Dr. A.P.J. Abdul Kalam ("The Missile Man"). Built to be later restructured into **Next.js**.

## Run it
No build step. Just open `index.html` in a browser, or serve the folder:
```bash
npx serve .
# or
python -m http.server 8000
```

## Structure
```
website kalam/
├── index.html                 # Home
├── about.html                 # About + Dr. Kalam tribute
├── competition.html           # All competitions (listing)
├── competition-73mile.html    # Flagship: 73 Mile Kalam Challenge (detail + register + FAQ)
├── css/style.css              # All styling + animations (design tokens at top)
├── js/main.js                 # Nav, scroll-reveal, counters, countdown, FAQ, form
└── assets/                    # (reserved for images/logos)
```

## Design
- **Palette:** yellow (`#FFC107`/`#FFB300`) + white + near-black. Tokens live in `:root` of `style.css`.
- **Fonts:** Oswald (headings) + Inter (body), via Google Fonts.
- **Animations:** hero athletes, orbiting rocket, scroll reveals, animated counters, marquee, wave/parallax — all respect `prefers-reduced-motion`.

## Next.js migration notes
- Header + footer are duplicated per page on purpose → become `<Header/>` and `<Footer/>` components.
- `js/main.js` blocks map cleanly to `useEffect` hooks / client components (scroll reveal → IntersectionObserver hook, countdown → timer hook).
- Event cards on `competition.html` → map over a data array.
- Register form is front-end only (`data-register`) → wire to a Next.js API route / server action.
- Inline SVGs → move to an `icons/` component set.
- `css/style.css` works as-is in `app/globals.css`, or split per-component with CSS Modules.
