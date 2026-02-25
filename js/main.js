import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Flock } from './Flock.js';
import { createControlPanel } from './ui.js';

const BOUNDS = 200;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x08080f);
scene.fog = new THREE.FogExp2(0x08080f, 0.0008);

const camera = new THREE.PerspectiveCamera(
    60, window.innerWidth / window.innerHeight, 1, 2000
);
camera.position.set(260, 180, 260);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x334466, 0.8));
const dirLight = new THREE.DirectionalLight(0xffeedd, 1.4);
dirLight.position.set(150, 250, 100);
scene.add(dirLight);
scene.add(new THREE.HemisphereLight(0x4488cc, 0x111122, 0.5));

const edgesGeo = new THREE.EdgesGeometry(
    new THREE.BoxGeometry(BOUNDS * 2, BOUNDS * 2, BOUNDS * 2)
);
scene.add(new THREE.LineSegments(
    edgesGeo,
    new THREE.LineBasicMaterial({
        color: 0x334455, transparent: true, opacity: 0.12,
    })
));

const STAR_COUNT = 2500;
const starPos = new Float32Array(STAR_COUNT * 3);
for (let i = 0; i < STAR_COUNT; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 3000;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 3000;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 3000;
}
const starsGeo = new THREE.BufferGeometry();
starsGeo.setAttribute(
    'position', new THREE.BufferAttribute(starPos, 3)
);
scene.add(new THREE.Points(
    starsGeo,
    new THREE.PointsMaterial({ color: 0x445566, size: 1.2 })
));

const params = {
    separation: 1.5,
    alignment: 1.0,
    cohesion: 1.0,
    perceptionRadius: 75,
    maxSpeed: 4,
    maxForce: 0.2,
    boidCount: 150,
};

const flock = new Flock(scene, params.boidCount, BOUNDS);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;
orbitControls.minDistance = 80;
orbitControls.maxDistance = 900;

createControlPanel(params, (key, value) => {
    if (key === 'boidCount') {
        flock.setCount(value);
    }
});

let lastTime = performance.now();

function animate() {
    requestAnimationFrame(animate);

    const now = performance.now();
    let dt = (now - lastTime) / 16.67;
    dt = Math.min(dt, 3);
    lastTime = now;

    flock.update(dt, params);
    orbitControls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
