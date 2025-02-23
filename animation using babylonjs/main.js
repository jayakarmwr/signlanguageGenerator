// main.js
let scene, hand;

window.addEventListener("DOMContentLoaded", async () => {
    scene = initScene();
    hand = await loadHand(scene);

    document.getElementById("submitBtn").addEventListener("click", async () => {
        const gesture = document.getElementById("gestureInput").value.toLowerCase();
        await applyGesture(gesture);
    });
});

async function applyGesture(gesture) {
    try {
        const gestureFile = gesture.toUpperCase();
        const module = await import(`./animations/${gestureFile}.js`);

        if (module && module[`animate${gestureFile}`]) {
            module[`animate${gestureFile}`](hand, scene);
        } else {
            console.error(`Gesture "${gesture}" found, but function animate${gestureFile}() is missing.`);
        }
    } catch (error) {
        console.error(`Gesture "${gesture}" not found.`, error);
    }
}

