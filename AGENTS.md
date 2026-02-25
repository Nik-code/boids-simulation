# AGENTS.md

## Cursor Cloud specific instructions

Zero-dependency web project using Three.js (loaded via CDN import maps). No build step, no package manager, no backend.

### Running the application

```bash
python3 -m http.server 8000
# Landing page: http://localhost:8000/index.html
# 3D Simulation: http://localhost:8000/simulation.html
# Legacy 2D sim: http://localhost:8000/boids.html
```

### Lint / Test / Build

- **Lint**: No linter configured. JS uses ES modules (`js/` directory).
- **Tests**: No automated tests. Manual testing via browser — interact with sliders, orbit camera, adjust boid count.
- **Build**: No build step. Files served as-is; Three.js loaded from `cdn.jsdelivr.net` via import map in `simulation.html`.

### Project structure

| Path | Purpose |
|---|---|
| `index.html` | Landing page (dark theme, links to simulation) |
| `simulation.html` | 3D simulation page (Three.js import map, loads `js/main.js`) |
| `boids.html` | Legacy 2D canvas simulation (standalone) |
| `js/main.js` | Entry point — scene, camera, renderer, animation loop |
| `js/Flock.js` | Flock manager — InstancedMesh, spatial grid integration |
| `js/Boid.js` | Boid class — 3D flocking physics (separation, alignment, cohesion) |
| `js/SpatialGrid.js` | 3D spatial hash grid for O(n) neighbor lookups |
| `js/ui.js` | Controls panel — creates DOM sliders dynamically |
| `css/landing.css` | Landing page styles |
| `css/simulation.css` | Simulation page styles (dark glassmorphism panel) |

### Architecture notes

- **InstancedMesh**: All boids rendered in a single draw call for performance (max 500 instances).
- **Spatial hashing**: Grid cell size = perception radius; only 27 neighboring cells queried per boid.
- **Boundary avoidance**: Smooth force-based boundary steering (not toroidal wrapping) for natural 3D behavior.
- **VM WebGL**: The cloud VM uses software WebGL; expect GPU-stall console warnings — these are harmless.
