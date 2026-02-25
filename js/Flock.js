import * as THREE from 'three';
import { Boid } from './Boid.js';
import { SpatialGrid } from './SpatialGrid.js';

const COLORS = [
    new THREE.Color(0x7ecad6),
    new THREE.Color(0xe8a0b5),
    new THREE.Color(0x8fd5a6),
    new THREE.Color(0xe8d479),
    new THREE.Color(0xb8a4e0),
];

const MAX_BOIDS = 500;

export class Flock {
    constructor(scene, count, bounds) {
        this.scene = scene;
        this.bounds = bounds;
        this.boids = [];
        this._dummy = new THREE.Object3D();
        this._up = new THREE.Vector3(0, 1, 0);
        this._dir = new THREE.Vector3();

        const geometry = new THREE.ConeGeometry(1, 3, 4);
        const material = new THREE.MeshStandardMaterial({
            roughness: 0.45,
            metalness: 0.25,
            flatShading: true,
        });

        this.mesh = new THREE.InstancedMesh(
            geometry, material, MAX_BOIDS
        );
        this.mesh.count = 0;
        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        scene.add(this.mesh);

        this.grid = new SpatialGrid(75);
        this.setCount(count);
    }

    setCount(newCount) {
        newCount = Math.max(1, Math.min(newCount, MAX_BOIDS));

        while (this.boids.length < newCount) {
            const boid = new Boid(this.bounds);
            const idx = this.boids.length;
            this.boids.push(boid);
            this.mesh.setColorAt(idx, COLORS[boid.colorIndex]);
        }

        if (newCount < this.boids.length) {
            this.boids.length = newCount;
        }

        this.mesh.count = newCount;
        if (this.mesh.instanceColor) {
            this.mesh.instanceColor.needsUpdate = true;
        }
    }

    update(dt, params) {
        this.grid.cellSize = params.perceptionRadius;
        this.grid.clear();

        for (const boid of this.boids) {
            this.grid.insert(
                boid,
                boid.position.x,
                boid.position.y,
                boid.position.z
            );
        }

        for (let i = 0; i < this.boids.length; i++) {
            const boid = this.boids[i];
            const neighbors = this.grid.query(
                boid.position.x,
                boid.position.y,
                boid.position.z
            );

            boid.flock(neighbors, params, this.bounds);
            boid.update(dt, params);

            this._dummy.position.copy(boid.position);
            this._dir.copy(boid.velocity).normalize();

            if (this._dir.lengthSq() > 0.001) {
                this._dummy.quaternion.setFromUnitVectors(
                    this._up, this._dir
                );
            }

            this._dummy.updateMatrix();
            this.mesh.setMatrixAt(i, this._dummy.matrix);
        }

        this.mesh.instanceMatrix.needsUpdate = true;
    }
}
