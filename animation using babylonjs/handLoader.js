// handLoader.js
function initScene() {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // Camera setup
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 3, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 10;

    scene.createDefaultLight();

    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());

    return scene;
}

function loadHand(scene, position = new BABYLON.Vector3(0, -0.5, 0)) {
    return new Promise((resolve) => {
        BABYLON.SceneLoader.ImportMesh("", "./models/", "hand_animated_v6.glb", scene, (meshes) => {
            const hand = meshes[0];
            hand.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            hand.position = position;
            hand.rotation = new BABYLON.Vector3(0, Math.PI, 0);

            // Check if the model has existing materials
            if (hand.material) {
                console.log("Existing material detected:", hand.material.name);
            }

            // Create a PBR material (better for GLB models)
            const skinMaterial = new BABYLON.PBRMaterial("skinMaterial", scene);
            skinMaterial.albedoColor = new BABYLON.Color3(0.76, 0.55, 0.38); // Indian skin tone
            skinMaterial.metallic = 0;  // No metallic look
            skinMaterial.roughness = 1;  // Matte skin texture
            skinMaterial.subSurface.isTranslucencyEnabled = true; // Helps with realistic skin shading
            skinMaterial.subSurface.translucencyIntensity = 0.5;

            // Apply material to all mesh sub-parts
            hand.getChildMeshes().forEach((mesh) => {
                mesh.material = skinMaterial;
            });

            scene.stopAllAnimations();
            const fingers = {};
            hand.getChildTransformNodes().forEach(node => {
                const name = node.name.toLowerCase();
                if (name.includes("thumb")) fingers.thumb = node;
                if (name.includes("index")) fingers.index = node;
                if (name.includes("middle")) fingers.middle = node;
                if (name.includes("ring")) fingers.ring = node;
                if (name.includes("pinky")) fingers.pinky = node;
            });

            hand.fingers = fingers;
            resolve(hand);
        });
    });
}
