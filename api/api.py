from flask import Flask
from flask import request
import cv2
import os
from sklearn.feature_extraction.image import extract_patches_2d
from tkinter import *
from tkinter import filedialog

W = 2048
H = 1536
w = 224
h = 224
banco = "PAD"
diretorio_path = ''
data_path = "carcinoma.png"
diretorio_path = os.path.join(data_path)

app = Flask(__name__)
@app.route('/status')
def get_status():
    image = cv2.imread(diretorio_path, 1)
    num_patches = 20
    file_name = "image"
    patch_images = extract_patches_2d(image, patch_size=(w, h), max_patches=int(num_patches))
    for index, image in enumerate(patch_images):
                cv2.imwrite(f"teste/{file_name}_{index}.png", image)
    return {'status': 'ok'}