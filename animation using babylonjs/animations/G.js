export function animateG(hand, scene) {
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

    function animateBone(bone, rotationX, rotationZ = 0) {
        if (!bone) return;

        // Reset rotation quaternion to allow for Euler rotations
        bone.rotationQuaternion = null;

        // Create animation for X rotation
        const animX = new BABYLON.Animation("animX", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animX.setKeys([{ frame: 0, value: bone.rotation.x }, { frame: 10, value: rotationX }]);

        // Create animation for Z rotation
        const animZ = new BABYLON.Animation("animZ", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animZ.setKeys([{ frame: 0, value: bone.rotation.z }, { frame: 10, value: rotationZ }]);

        // Assign animations to the bone and begin animation
        bone.animations = [animX, animZ];
        scene.beginAnimation(bone, 0, 10, false);
    }

    // Apply the 'G' gesture 
    fingers.index.forEach(bone => animateBone(bone, 0));   // Extend index finger
    fingers.middle.forEach(bone => animateBone(bone, 2.5));  // Curl middle finger
    fingers.ring.forEach(bone => animateBone(bone, 2.5));    // Curl ring finger
    fingers.pinky.forEach(bone => animateBone(bone, 2.5));   // Curl pinky finger
    fingers.thumb.forEach(bone => animateBone(bone, 2.5));    // Abduct thumb
}
