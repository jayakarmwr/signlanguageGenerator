// C.js
export function animateC(hand, scene) {
    const fingers = {
        thumb: [],
        index: [],
        middle: [],
        ring: [],
        pinky: []
    };

    // Collect all relevant finger bones
    hand.getChildTransformNodes().forEach(node => {
        const name = node.name.toLowerCase();
        if (name.includes("thumb")) fingers.thumb.push(node);
        if (name.includes("index")) fingers.index.push(node);
        if (name.includes("middle")) fingers.middle.push(node);
        if (name.includes("ring")) fingers.ring.push(node);
        if (name.includes("pinky")) fingers.pinky.push(node);
    });

    function animateBone(bone, rotationX, rotationY = 0, rotationZ = 0) {
        if (!bone) return;

        // Reset rotation quaternion to allow for Euler rotations
        bone.rotationQuaternion = null;

        // Create animation for X rotation
        const animX = new BABYLON.Animation("animX", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animX.setKeys([{ frame: 0, value: bone.rotation.x }, { frame: 10, value: rotationX }]);

        // Create animation for Y rotation
        const animY = new BABYLON.Animation("animY", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animY.setKeys([{ frame: 0, value: bone.rotation.y }, { frame: 10, value: rotationY }]);

        // Create animation for Z rotation
        const animZ = new BABYLON.Animation("animZ", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animZ.setKeys([{ frame: 0, value: bone.rotation.z }, { frame: 10, value: rotationZ }]);

        // Assign animations to the bone and begin animation
        bone.animations = [animX, animY, animZ];
        scene.beginAnimation(bone, 0, 10, false);
    }

    // Apply the 'C' gesture
    const fingerCurlAmountX = 0.5;  // Adjust for upward curvature
    const fingerCurlAmountZ = 0.3;   // Adjust for inward curvature

    // Curl all fingers upward and slightly inward
    fingers.index.forEach(bone => animateBone(bone, fingerCurlAmountX, 0, fingerCurlAmountZ));   // Curve index finger
    fingers.middle.forEach(bone => animateBone(bone, fingerCurlAmountX, 0, fingerCurlAmountZ));  // Curve middle finger
    fingers.ring.forEach(bone => animateBone(bone, fingerCurlAmountX, 0, fingerCurlAmountZ));    // Curve ring finger
    fingers.pinky.forEach(bone => animateBone(bone, fingerCurlAmountX, 0, fingerCurlAmountZ));   // Curve pinky finger

    // Thumb adjustments - curve downward and outward
    const thumbRotationX = 0.2;    // Adjust for downward curvature
    const thumbRotationY = -0.5;   // Adjust for outward positioning

    fingers.thumb.forEach(bone => animateBone(bone, thumbRotationX, thumbRotationY,-1 ));        // Position thumb
}
