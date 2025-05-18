# Boids Flocking Simulation

A real-time, interactive visualization of the classic "boids" flocking algorithm, built entirely in modern HTML, CSS, and JavaScript. Adjust parameters live to see emergent bird-like flocking behavior with a clean, minimal UI.

![screenshot](/assets/thumbnail.jpeg)

---

## 🌐 Live Demo

[**View the simulation on GitHub Pages →**](https://nik-code.github.io/boids-simulation/boids.html)

---

## 🚀 Features

* **Dynamic Boids Flocking:**
  Simulates groups of virtual "boids" (bird-like agents) that follow simple rules—separation, alignment, and cohesion—to create life-like swarm behavior.
* **Beautiful, Minimal UI:**
  Pastel colors, glassmorphic control panel, and elegant motion.
* **Real-Time Controls:**
  Tweak flocking parameters on the fly:

  * Separation (crowd avoidance)
  * Alignment (direction matching)
  * Cohesion (group attraction)
  * Perception Radius (how far a boid can "see")
  * Max Speed
  * Max Force (agility)
* **Responsive & Optimized:**
  Adapts to any screen. Uses a spatial grid for efficient neighbor searches (good performance even with 100+ boids).
* **No frameworks, just HTML/CSS/JS!**
---

## 🧑‍💻 How it Works

Each "boid" is an agent with position, velocity, and acceleration. Every frame, it looks for neighbors in its perception radius and:

* **Separation:** Steers away from crowding others.
* **Alignment:** Steers towards the average heading of neighbors.
* **Cohesion:** Moves towards the average position of the group.

The simulation uses an efficient spatial grid to speed up neighborhood lookups, enabling smooth flocking even on large screens.

---

## 🕹 Controls

* Use the sliders to adjust each flocking parameter in real time.
* Try increasing Separation for "nervous" birds, or boost Alignment for elegant synchronized motion!

---

## 🛠 Local Development

No build tools needed! To run locally:

```bash
git clone https://github.com/Nik-code/boids-simulation.git
```

And just double-click `boids.html` in your file explorer.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## ⭐ Credits

* Created by [Nik](https://github.com/Nik-code)
* Inspired by Craig Reynolds' original Boids algorithm (1986)

---

## 💡 Ideas to Try

* Play with Perception Radius and Alignment to make "schools of fish" or "bird murmurations"!
* Fork and add features: mouse interaction, trails, color themes, or custom shapes.

---

## 🤝 Contributing

PRs are welcome! If you find a bug or want to add something fun, open an issue or submit a pull request.

---

Enjoy flocking! 🐦
