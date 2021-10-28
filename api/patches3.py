import cv2
import os
from patchify import patchify 

img = cv2.imread("carcinoma.png")
patches_img = patchify(img, (224,224,3), step=224)
diretorio_path = "teste"
data_path = os.path.join(diretorio_path, "carcinoma")

print(data_path)
for i in range(patches_img.shape[0]):
    for j in range(patches_img.shape[1]):
        single_patch_img = patches_img[i, j, 0, :, :, :]
        print(f'{data_path}' + str(i)+str(j)+'.png')
        if not cv2.imwrite(f'{data_path}' + str(i)+str(j)+'.png', single_patch_img):
            raise Exception("Could not write the image")

