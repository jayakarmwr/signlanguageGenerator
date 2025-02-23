function animateFinger(finger, rotationX, rotationZ = 0) {
    if (!finger) return;

    if (finger.rotationQuaternion) {
        finger.rotationQuaternion = null;
    }

    const animX = new BABYLON.Animation("animX", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const animZ = new BABYLON.Animation("animZ", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    animX.setKeys([{ frame: 0, value: finger.rotation.x }, { frame: 10, value: rotationX }]);
    animZ.setKeys([{ frame: 0, value: finger.rotation.z }, { frame: 10, value: rotationZ }]);

    const easingFunction = new BABYLON.CubicEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    animX.setEasingFunction(easingFunction);
    animZ.setEasingFunction(easingFunction);

    finger.animations = [animX, animZ];
    finger.getScene().beginAnimation(finger, 0, 10, false);
}

// Sign Language Gestures

function helloGesture(hand) {
    let frame = 0;
    const shakeAnim = setInterval(() => {
        hand.rotation.y += frame % 2 === 0 ? 0.2 : -0.2; // Shake effect
        frame++;
        if (frame > 6) clearInterval(shakeAnim);
    }, 100);
}

function thankYouGesture(hand) {
    animateFinger(hand.fingers.thumb, -0.5, 0);
    animateFinger(hand.fingers.index, -0.5, 0);
    animateFinger(hand.fingers.middle, -0.5, 0);
    animateFinger(hand.fingers.ring, -0.5, 0);
    animateFinger(hand.fingers.pinky, -0.5, 0);
}

function yesGesture(hand) {
    animateFinger(hand.fingers.index, -1, 0);
    animateFinger(hand.fingers.middle, -1, 0);
    animateFinger(hand.fingers.ring, -1, 0);
    animateFinger(hand.fingers.pinky, -1, 0);
}

function noGesture(hand) {
    animateFinger(hand.fingers.index, 0.5, 0);
    animateFinger(hand.fingers.middle, 0.5, 0);
}

function helpGesture(hand, secondHand) {
    animateFinger(hand.fingers.thumb, 0, 0);
    animateFinger(hand.fingers.index, -1, 0);
    animateFinger(hand.fingers.middle, -1, 0);
    animateFinger(hand.fingers.ring, -1, 0);
    animateFinger(hand.fingers.pinky, -1, 0);
    
    if (!secondHand) return;
    secondHand.position = new BABYLON.Vector3(0.5, -0.5, 0);
    animateFinger(secondHand.fingers.index, 0.5, 0);
}

// Function to apply gestures based on input
function applyGesture(gesture) {
    if (!hand) return;

    if (gesture === "hello") helloGesture(hand);
    else if (gesture === "thank you") thankYouGesture(hand);
    else if (gesture === "yes") yesGesture(hand);
    else if (gesture === "no") noGesture(hand);
    else if (gesture === "help") {
        loadHand(hand.getScene(), new BABYLON.Vector3(0.5, -0.5, 0), true).then((newHand) => {
            secondHand = newHand;
            helpGesture(hand, secondHand);
        });
    }
}
