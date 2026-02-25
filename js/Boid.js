import * as THREE from 'three';

const _diff = new THREE.Vector3();
const _perturb = new THREE.Vector3();

export class Boid {
    constructor(bounds) {
        this.position = new THREE.Vector3(
            (Math.random() - 0.5) * bounds * 1.6,
            (Math.random() - 0.5) * bounds * 1.6,
            (Math.random() - 0.5) * bounds * 1.6
        );
        this.velocity = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize().multiplyScalar(2 + Math.random() * 2);
        this.acceleration = new THREE.Vector3();
        this.colorIndex = Math.floor(Math.random() * 5);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    separate(neighbors, params) {
        const steer = new THREE.Vector3();
        let count = 0;

        for (const other of neighbors) {
            if (other === this) continue;
            const d = this.position.distanceTo(other.position);
            if (d > 0 && d < params.perceptionRadius) {
                _diff.copy(this.position).sub(other.position);
                _diff.divideScalar(d);
                steer.add(_diff);
                count++;
            }
        }

        if (count > 0) {
            steer.divideScalar(count);
            steer.setLength(params.maxSpeed);
            steer.sub(this.velocity);
            steer.clampLength(0, params.maxForce);
        }
        return steer;
    }

    align(neighbors, params) {
        const steer = new THREE.Vector3();
        let count = 0;

        for (const other of neighbors) {
            if (other === this) continue;
            const d = this.position.distanceTo(other.position);
            if (d > 0 && d < params.perceptionRadius) {
                steer.add(other.velocity);
                count++;
            }
        }

        if (count > 0) {
            steer.divideScalar(count);
            steer.setLength(params.maxSpeed);
            steer.sub(this.velocity);
            steer.clampLength(0, params.maxForce);
        }
        return steer;
    }

    cohere(neighbors, params) {
        const steer = new THREE.Vector3();
        let count = 0;

        for (const other of neighbors) {
            if (other === this) continue;
            const d = this.position.distanceTo(other.position);
            if (d > 0 && d < params.perceptionRadius) {
                steer.add(other.position);
                count++;
            }
        }

        if (count > 0) {
            steer.divideScalar(count);
            steer.sub(this.position);
            steer.setLength(params.maxSpeed);
            steer.sub(this.velocity);
            steer.clampLength(0, params.maxForce);
        }
        return steer;
    }

    avoidBounds(bounds, params) {
        const steer = new THREE.Vector3();
        const margin = bounds * 0.3;
        const p = this.position;

        for (const axis of ['x', 'y', 'z']) {
            if (p[axis] > bounds - margin) {
                const t = (p[axis] - (bounds - margin)) / margin;
                steer[axis] = -t * params.maxForce * 4;
            } else if (p[axis] < -bounds + margin) {
                const t = ((-bounds + margin) - p[axis]) / margin;
                steer[axis] = t * params.maxForce * 4;
            }
        }
        return steer;
    }

    flock(neighbors, params, bounds) {
        const sep = this.separate(neighbors, params);
        const ali = this.align(neighbors, params);
        const coh = this.cohere(neighbors, params);
        const bnd = this.avoidBounds(bounds, params);

        sep.multiplyScalar(params.separation);
        ali.multiplyScalar(params.alignment);
        coh.multiplyScalar(params.cohesion);

        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);
        this.applyForce(bnd);
    }

    update(dt, params) {
        this.velocity.addScaledVector(this.acceleration, dt);
        this.velocity.clampLength(1, params.maxSpeed);

        _perturb.set(
            (Math.random() - 0.5) * 0.08 * dt,
            (Math.random() - 0.5) * 0.08 * dt,
            (Math.random() - 0.5) * 0.08 * dt
        );
        this.velocity.add(_perturb);

        this.position.addScaledVector(this.velocity, dt);
        this.acceleration.set(0, 0, 0);
    }
}
