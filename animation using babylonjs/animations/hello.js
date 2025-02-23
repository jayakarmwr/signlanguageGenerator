// animations/words/hello.js
export default function animateHello(hand, scene) {
    const { thumb, index, middle, ring, pinky } = hand.fingers;

    // Ensure fingers exist
    if (!thumb || !index || !middle || !ring || !pinky) {
        console.error("Fingers not found in hand model.");
        return;
    }

    // Define keyframes for waving motion
    const waveFrames = [
        { frame: 0, value: hand.rotation.y },
        { frame: 10, value: hand.rotation.y + Math.PI / 6 },
        { frame: 20, value: hand.rotation.y - Math.PI / 6 },
        { frame: 30, value: hand.rotation.y + Math.PI / 6 },
        { frame: 40, value: hand.rotation.y }
    ];

    // Create wave animation
    const waveAnimation = new BABYLON.Animation(
        "waveAnim",
        "rotation.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    waveAnimation.setKeys(waveFrames);

    // Open palm position (all fingers extended)
    const extendFingers = [
        { finger: thumb, rotation: { x: 0, y: 0, z: 0 } },
        { finger: index, rotation: { x: 0, y: 0, z: 0 } },
        { finger: middle, rotation: { x: 0, y: 0, z: 0 } },
        { finger: ring, rotation: { x: 0, y: 0, z: 0 } },
        { finger: pinky, rotation: { x: 0, y: 0, z: 0 } }
    ];

    extendFingers.forEach(({ finger, rotation }) => {
        if (!finger) return;

        const animX = new BABYLON.Animation(
            "extendAnimX", "rotation.x", 30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        animX.setKeys([
            { frame: 0, value: finger.rotation.x },
            { frame: 10, value: rotation.x }
        ]);

        finger.animations = [animX];
        scene.beginAnimation(finger, 0, 10, false);
    });

    // Apply wave animation to the hand
    hand.animations = [waveAnimation];
    scene.beginAnimation(hand, 0, 40, true);
}
