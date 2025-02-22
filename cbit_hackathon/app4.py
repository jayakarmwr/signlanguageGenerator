import json
import numpy as np
import matplotlib
matplotlib.use("Qt5Agg")  # Use Qt5Agg to avoid Tkinter issues
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import time

# Load the JSON file containing alphabet points
try:
    with open("mesh_avatar_data.json", "r") as file:
        alphabet_data = json.load(file)
except FileNotFoundError:
    print("Error: mesh_avatar_data.json not found.")
    exit()

# Convert the JSON data into a dictionary mapping letters to 3D coordinates
alphabet_points = {chr(65 + i): tuple(point) for i, point in enumerate(alphabet_data)}

# Get user input
input_text = input("Enter a string (A-Z only): ").upper()

# Filter out invalid characters
input_text = "".join(c for c in input_text if c in alphabet_points)

if not input_text:
    print("No valid letters to plot.")
    exit()

# Set up the 3D plot
fig = plt.figure()
ax = fig.add_subplot(111, projection="3d")

# Animate each letter sequentially
for letter in input_text:
    x, y, z = alphabet_points[letter]
    ax.scatter(x, y, z, c="r", marker="o", s=100)
    ax.text(x, y, z, letter, fontsize=12, color="blue")
    
    plt.draw()
    plt.pause(1)  # Pause for animation effect

plt.show()
