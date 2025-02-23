// D.js
export function animateD(hand, scene) {
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
         if (name.includes("thumb")) {
            if(name.includes(".0") || name.includes(".1") || name.includes(".2"))
            fingers.thumb.push(node);
        }
        if (name.includes("index")) {
             if(name.includes(".0") || name.includes(".1") || name.includes(".2"))
            fingers.index.push(node);
        }
        if (name.includes("middle")) {
             if(name.includes(".0") || name.includes(".1") || name.includes(".2"))
            fingers.middle.push(node);
        }
        if (name.includes("ring")) {
             if(name.includes(".0") || name.includes(".1") || name.includes(".2"))
            fingers.ring.push(node);
        }
        if (name.includes("pinky")) {
             if(name.includes(".0") || name.includes(".1") || name.includes(".2"))
            fingers.pinky.push(node);
        }
    });

    function animateBone(bone, rotationX, rotationY = 0, rotationZ = 0) {
        if (!bone) return;

        // Reset rotation quaternion to allow for Euler rotations
        bone.rotationQuaternion = null;

        // Create animation for X rotation
        const animX = new BABYLON.Animation("animX", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animX.setKeys([{ frame: 0, value: bone.rotation.x }, { frame: 10, value: rotationX }]);

        // Create animation for Z rotation
        const animZ = new BABYLON.Animation("animZ", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animZ.setKeys([{ frame: 0, value: bone.rotation.z }, { frame: 10, value: rotationZ }]);

        // Create animation for Y rotation
        const animY = new BABYLON.Animation("animY", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animY.setKeys([{ frame: 0, value: bone.rotation.y }, { frame: 10, value: rotationY }]);

        // Assign animations to the bone and begin animation
        bone.animations = [animX, animZ, animY];
        scene.beginAnimation(bone, 0, 10, false);
    }

    // Apply the 'D' gesture
    fingers.index.forEach(bone => animateBone(bone, 0.1, 0.1, 0));   // Extend index finger
    fingers.middle.forEach(bone => animateBone(bone, 1.3, 0, 0));  // Curl middle finger
    fingers.ring.forEach(bone => animateBone(bone, 1.3, 0, 0));    // Curl ring finger
    fingers.pinky.forEach(bone => animateBone(bone, 1.3, 0, 0));   // Curl pinky finger

    // Thumb adjustments
    fingers.thumb.forEach(bone => animateBone(bone, 0.2, 0, 0));    // Touch index finger
}
