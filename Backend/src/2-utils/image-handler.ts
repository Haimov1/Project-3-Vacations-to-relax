import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";
import path from "path";
import fs from "fs";

const vacationImagesFolder = "./src/1-assets/images/destination/";

async function saveImage(image: UploadedFile): Promise<string> {
    // Create unique image name:
    const uniqueImageName = createImageName(image.name);
    // Create absolute page:
    const absolutePath = vacationImagesFolder + uniqueImageName;
    // Save to disk:
    await image.mv(absolutePath); // mv = move.

    // Return new name:
    return uniqueImageName;
}

async function updateImage(image: UploadedFile, existingImageName: string): Promise<string> {

    // Delete existing image:
    await deleteImage(existingImageName);

    // Save new image to disk:
    const uniqueImageName = await saveImage(image);

    // Return unique name:
    return uniqueImageName;
}

async function deleteImage(existingImageName: string): Promise<void> {
    try {
        // If not send image:
        if (!existingImageName) return;

        await fsPromises.unlink(vacationImagesFolder + existingImageName);
    }
    catch (err: any) {
        console.error(err.message);
    }
}

function createImageName(originalImageName: string): string {

    // Take original extension:
    const extension = originalImageName.substring(originalImageName.lastIndexOf("."));

    // Create unique name including original extension (v4 = 36 chars uuid):
    const uniqueImageName = uuid() + extension;

    // Return unique name:
    return uniqueImageName;
}

function getAbsolutePath(imageName: string): string {
    let absolutePath = path.join(__dirname, "..", "1-assets", "images", "destination", imageName);
    if (!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname, "..", "1-assets", "images", "not-found.png");
    }
    return absolutePath;
}

export default {
    saveImage,
    updateImage,
    deleteImage,
    getAbsolutePath
};
