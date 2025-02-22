import cv2
import os
import json
import numpy as np

# Define input and output paths
TRAIN_IMAGE_PATH = "sign_train_images"
TEST_IMAGE_PATH = "sign_test_images"
OUTPUT_PATH = "keypoints_data"
os.makedirs(OUTPUT_PATH, exist_ok=True)

def extract_keypoints(image_dir, output_filename):
    keypoints_list = []  # Store keypoints for all images

    for img_file in sorted(os.listdir(image_dir)):  # Sort to maintain order
        if img_file.endswith(".png"):
            img_path = os.path.join(image_dir, img_file)
            image = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)  # Convert to grayscale
            blurred = cv2.GaussianBlur(image, (5, 5), 0)  # Reduce noise
            edges = cv2.Canny(blurred, 50, 150)  # Edge detection

            # Find contours
            contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

            frame_keypoints = []

            # Extract key points from contours
            for contour in contours:
                for point in contour:
                    x, y = point[0]
                    frame_keypoints.append([int(x), int(y)])

            keypoints_list.append(frame_keypoints)

    # Save keypoints as JSON
    with open(os.path.join(OUTPUT_PATH, output_filename), "w") as f:
        json.dump(keypoints_list, f, indent=4)

    print(f"✅ Keypoints extracted and saved: {output_filename}")

# Extract keypoints from both train and test images
extract_keypoints(TRAIN_IMAGE_PATH, "train_keypoints.json")
extract_keypoints(TEST_IMAGE_PATH, "test_keypoints.json")
