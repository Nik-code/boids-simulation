const SECTIONS = [
    {
        label: 'Behavior',
        sliders: [
            {
                key: 'separation', label: 'Separation',
                min: 0, max: 5, step: 0.1,
            },
            {
                key: 'alignment', label: 'Alignment',
                min: 0, max: 5, step: 0.1,
            },
            {
                key: 'cohesion', label: 'Cohesion',
                min: 0, max: 5, step: 0.1,
            },
        ],
    },
    {
        label: 'Physics',
        sliders: [
            {
                key: 'perceptionRadius', label: 'Radius',
                min: 10, max: 200, step: 1,
            },
            {
                key: 'maxSpeed', label: 'Speed',
                min: 1, max: 10, step: 0.1,
            },
            {
                key: 'maxForce', label: 'Force',
                min: 0.05, max: 1, step: 0.01,
            },
        ],
    },
    {
        label: 'Population',
        sliders: [
            {
                key: 'boidCount', label: 'Count',
                min: 20, max: 500, step: 10,
            },
        ],
    },
];

/**
 * Creates the controls panel and appends it to the document body.
 * Mutates `params` directly on slider input.
 */
export function createControlPanel(params, onChange) {
    const defaults = { ...params };
    const refs = [];

    const panel = document.createElement('div');
    panel.className = 'controls-panel';

    const title = document.createElement('div');
    title.className = 'panel-title';
    title.textContent = 'BOIDS \u00B7 3D';
    panel.appendChild(title);

    for (const section of SECTIONS) {
        const header = document.createElement('div');
        header.className = 'section-label';
        header.textContent = section.label;
        panel.appendChild(header);

        for (const cfg of section.sliders) {
            const row = document.createElement('div');
            row.className = 'slider-row';

            const label = document.createElement('span');
            label.className = 'slider-label';
            label.textContent = cfg.label;

            const input = document.createElement('input');
            input.type = 'range';
            input.min = cfg.min;
            input.max = cfg.max;
            input.step = cfg.step;
            input.value = params[cfg.key];

            const val = document.createElement('span');
            val.className = 'slider-value';
            val.textContent = params[cfg.key];

            input.addEventListener('input', () => {
                const v = parseFloat(input.value);
                params[cfg.key] = v;
                val.textContent = v;
                onChange(cfg.key, v);
            });

            refs.push({ input, val, key: cfg.key });

            row.appendChild(label);
            row.appendChild(input);
            row.appendChild(val);
            panel.appendChild(row);
        }
    }

    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-btn';
    resetBtn.textContent = '\u21BA Reset Defaults';
    resetBtn.addEventListener('click', () => {
        Object.assign(params, defaults);
        for (const r of refs) {
            r.input.value = params[r.key];
            r.val.textContent = params[r.key];
            onChange(r.key, params[r.key]);
        }
    });
    panel.appendChild(resetBtn);

    document.body.appendChild(panel);
}
