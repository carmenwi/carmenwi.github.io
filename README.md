# carmenwi.github.io

Personal portfolio — vanilla HTML/CSS/JS, zero dependencies, zero build step.

**Live:** https://carmenwi.github.io

## Features
- Bilingual EN/ES (auto-detects browser language, persists choice)
- Light/dark theme (follows system, manual override, View Transitions API)
- Canvas particle network, scroll-driven reveals, bento grid, magnetic buttons
- SEO: Open Graph, JSON-LD Person schema, semantic HTML, WCAG-friendly
- Respects `prefers-reduced-motion`

## Deploy (GitHub Pages)
```bash
git remote add origin https://github.com/carmenwi/carmenwi.github.io.git
git push -u origin main --force   # replaces the old site content
```
Then in the repo: Settings → Pages → Source: `main` branch, `/ (root)`.

## Customize
- **Photo:** save your portrait as `assets/profile.jpg` (a monogram shows if missing).
- **Content/translations:** every string lives in the `I18N` object in `script.js`; structure in `index.html`.
- **Colors:** design tokens at the top of `styles.css` (`--accent`, `--bg`, ...).
- **CVs:** replace the PDFs in `assets/` keeping the same filenames.
- **Contact form (optional):** the contact section uses direct email by design. To add a form, create one at [formspree.io](https://formspree.io) and drop their `<form>` snippet into `#contact`.
