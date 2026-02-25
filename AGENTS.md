# AGENTS.md

## Cursor Cloud specific instructions

This is a zero-dependency, single-file web project (vanilla HTML/CSS/JS). There is no build step, no package manager, and no backend.

### Running the application

Serve the project root with any static file server, then open `boids.html`:

```bash
python3 -m http.server 8000
# Open http://localhost:8000/boids.html in a browser
```

### Lint / Test / Build

- **Lint**: No linter is configured. The project is a single HTML file with inline `<style>` and `<script>` blocks.
- **Tests**: No automated tests exist. Manual testing is done by opening the page in a browser and interacting with the control sliders (Separation, Alignment, Cohesion, Perception Radius, Max Speed, Max Force).
- **Build**: No build step. The file is served as-is.

### Project structure

| File | Purpose |
|---|---|
| `boids.html` | Entire application — self-contained HTML with inline CSS and JS |
| `README.md` | Project documentation |
| `LICENSE` | MIT License |
| `assets/thumbnail.jpeg` | Screenshot used in README |
