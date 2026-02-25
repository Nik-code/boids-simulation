/**
 * 3D spatial hash grid for efficient neighbor lookups.
 * Cell size should match perception radius for optimal performance.
 */
export class SpatialGrid {
    constructor(cellSize) {
        this.cellSize = cellSize;
        this.cells = new Map();
    }

    clear() {
        this.cells.clear();
    }

    _key(x, y, z) {
        const cx = Math.floor(x / this.cellSize);
        const cy = Math.floor(y / this.cellSize);
        const cz = Math.floor(z / this.cellSize);
        return (cx * 73856093) ^ (cy * 19349663) ^ (cz * 83492791);
    }

    insert(item, x, y, z) {
        const key = this._key(x, y, z);
        let cell = this.cells.get(key);
        if (!cell) {
            cell = [];
            this.cells.set(key, cell);
        }
        cell.push(item);
    }

    query(x, y, z) {
        const results = [];
        const cx = Math.floor(x / this.cellSize);
        const cy = Math.floor(y / this.cellSize);
        const cz = Math.floor(z / this.cellSize);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dz = -1; dz <= 1; dz++) {
                    const key =
                        ((cx + dx) * 73856093) ^
                        ((cy + dy) * 19349663) ^
                        ((cz + dz) * 83492791);
                    const cell = this.cells.get(key);
                    if (cell) {
                        for (let i = 0; i < cell.length; i++) {
                            results.push(cell[i]);
                        }
                    }
                }
            }
        }
        return results;
    }
}
