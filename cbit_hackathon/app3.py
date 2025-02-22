import json

# Load keypoints extracted earlier
with open("keypoints_data/train_keypoints.json", "r") as f:
    keypoints = json.load(f)

# Convert to Microsoft Mesh Avatar skeletal format
formatted_data = {
    "skeleton": [{"x": kp[0], "y": kp[1], "z": 0} for kp in keypoints[0]]  # Sample frame
}

# Save as JSON for API request
with open("mesh_avatar_data.json", "w") as f:
    json.dump(formatted_data, f, indent=4)

print("✅ Formatted keypoints saved for Mesh Avatar API")
