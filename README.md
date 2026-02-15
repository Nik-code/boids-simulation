# Boids Flocking Simulation

A real-time, interactive visualization of the classic "boids" flocking algorithm, built entirely in vanilla HTML, CSS, and JavaScript.

![screenshot](/assets/thumbnail.jpeg)

**[View Live Demo →](https://nik-code.github.io/boids-simulation/boids.html)**

## Features

* **Dynamic Simulation:** Simulates agents following the three core flocking rules: Separation, Alignment, and Cohesion.
* **Real-Time Controls:** Adjust parameters instantly via the UI:
    * Separation (crowd avoidance)
    * Alignment (direction matching)
    * Cohesion (group attraction)
    * Perception Radius & Max Speed/Force
* **Performance:** Implements a spatial grid for efficient neighbor lookups, allowing for high agent counts without lag.
* **Zero Dependencies:** Built with pure JavaScript—no frameworks or build tools required.

## How it Works

Each "boid" is an autonomous agent that calculates its movement based on its neighbors within a specific radius:

1.  **Separation:** Steer to avoid crowding local flockmates.
2.  **Alignment:** Steer towards the average heading of local flockmates.
3.  **Cohesion:** Steer to move towards the average position (center of mass) of local flockmates.

## Local Development

Since this project uses no build tools, you can run it directly from the file system.

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Nik-code/boids-simulation.git](https://github.com/Nik-code/boids-simulation.git)
    ```

2.  Open `boids.html` in your web browser.

## Credits & License

* **Author:** [Nik](https://github.com/Nik-code)
* **Inspiration:** Craig Reynolds (1986)
* **License:** MIT License — see [LICENSE](LICENSE) for details.
