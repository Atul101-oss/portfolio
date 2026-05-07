# React Page Generator

A single React + Vite project that can build multiple independent websites completely independently.

## Project Structure

```
react-page-generator/
├── sites/                # All your independent sites go here
│   ├── site-a/           # Folder name becomes the site ID
│   │   ├── index.html    # Entry point for Site A
│   │   ├── main.jsx      # React entry for Site A
│   │   ├── App.jsx       # Root component for Site A
│   │   └── styles/       # Site-specific styles
│   └── site-b/           # Another independent site
├── shared/               # Code shared between sites (optional)
├── vite.config.js        # Auto-discovers all sites in /sites
└── package.json          # Single set of dependencies
```

## How to add a new site

1. Create a new folder under `sites/` (e.g., `sites/my-new-site`).
2. Add an `index.html` and a `main.jsx`.
3. The generator will automatically detect it!

## Development

Run the development server:
```bash
npm run dev
```
Access your sites at:
- `http://localhost:5173/sites/landing-page/`
- `http://localhost:5173/sites/portfolio-site/`
- `http://localhost:5173/sites/my-new-site/`

## Build

Build all sites at once:
```bash
npm run build
```
This will generate the built sites directly into the main Django project's static folder at `../static/react-pages/`.

## Why this approach?

- **Single Dependency Management**: Manage React, Vite, and other libraries in one place.
- **Independence**: Each site has its own entry point and can have completely different designs.
- **Efficiency**: Vite's fast HMR and optimized build process applied to multiple projects simultaneously.
