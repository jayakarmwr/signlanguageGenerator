import pandas as pd
import numpy as np
import cv2
import os

# Paths
DATASET_PATH = "C:/Users/FLORENCE/.cache/kagglehub/datasets/datamunge/sign-language-mnist/versions/1"
train_csv_path = os.path.join(DATASET_PATH, "sign_mnist_train.csv")
test_csv_path = os.path.join(DATASET_PATH, "sign_mnist_test.csv")

# Output directories for images
train_output_dir = "sign_train_images"
test_output_dir = "sign_test_images"
os.makedirs(train_output_dir, exist_ok=True)
os.makedirs(test_output_dir, exist_ok=True)

def csv_to_images(csv_path, output_dir):
    df = pd.read_csv(csv_path)
    labels = df.iloc[:, 0].values  # First column is the label
    pixel_data = df.iloc[:, 1:].values  # Rest are pixel values

    for i, (label, pixels) in enumerate(zip(labels, pixel_data)):
        img = np.array(pixels, dtype=np.uint8).reshape(28, 28)  # Reshape to 28x28
        img_path = os.path.join(output_dir, f"{label}_{i}.png")
        cv2.imwrite(img_path, img)

    print(f"✅ Images saved in: {output_dir}")

# Convert train and test CSV data to images
csv_to_images(train_csv_path, train_output_dir)
csv_to_images(test_csv_path, test_output_dir)
