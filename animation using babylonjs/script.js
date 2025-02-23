import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, mixer, model, animations = {};

// Initialize Scene
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);

    // Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.5, 3);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 2, 3);
    scene.add(light);

    // Load Human Model
    const loader = new GLTFLoader();
    loader.load("human_model.glb", (gltf) => {
        model = gltf.scene;
        scene.add(model);

        // Animation Mixer
        mixer = new THREE.AnimationMixer(model);
        
        // Store animations
        gltf.animations.forEach((clip) => {
            animations[clip.name.toLowerCase()] = mixer.clipAction(clip);
        });

        console.log("Animations Loaded:", Object.keys(animations));
    });

    // Handle Window Resize
    window.addEventListener("resize", onWindowResize);
}

// Resize Handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Play Animation
function playAnimation(action) {
    if (!mixer || !animations[action]) {
        console.log("Animation not found:", action);
        return;
    }

    // Stop all animations and play selected one
    Object.values(animations).forEach(anim => anim.stop());
    animations[action].reset().play();
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    if (mixer) mixer.update(0.02); // Update animations
    renderer.render(scene, camera);
}

// Initialize and Run
init();
animate();

// Make function global for button clicks
window.playAnimation = playAnimation;
