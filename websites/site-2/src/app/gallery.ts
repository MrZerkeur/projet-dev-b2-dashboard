import fs from 'fs';
import path from 'path';

export function getGalleryImages(): string[] {
  const pathToGalleryDir = path.join(process.cwd(), 'public', 'assets', 'images', 'gallery');

  if (!fs.existsSync(pathToGalleryDir)) {
    return []; // Return empty array if directory does not exist
  }

  const imagePaths: string[] = [];

  // Get folders inside gallery folder
  const folderNames = fs.readdirSync(pathToGalleryDir);

  folderNames.forEach((folderName) => {
    const pathToFolder = path.join(pathToGalleryDir, folderName);

    // Check if the folder is a directory
    if (fs.lstatSync(pathToFolder).isDirectory()) {
      // Read files inside the directory
      const files = fs.readdirSync(pathToFolder);

      // Retrieve image paths and store them
      files.forEach((file) => {
        const filePath = path.join('/assets/images/gallery', folderName, file);
        imagePaths.push(filePath);
      });
    }
  });
  return imagePaths;
}

export function getHeroImages(): string[] {
  const pathToGalleryDir = path.join(process.cwd(), 'public', 'assets', 'images', 'heroImage');

  if (!fs.existsSync(pathToGalleryDir)) {
    return []; // Return empty array if directory does not exist
  }

  const imagePaths: string[] = [];

  // Get folders inside gallery folder
  const folderNames = fs.readdirSync(pathToGalleryDir);

  folderNames.forEach((folderName) => {
    const pathToFolder = path.join(pathToGalleryDir, folderName);

    // Check if the folder is a directory
    if (fs.lstatSync(pathToFolder).isDirectory()) {
      // Read files inside the directory
      const files = fs.readdirSync(pathToFolder);

      // Retrieve image paths and store them
      files.forEach((file) => {
        const filePath = path.join('/assets/images/heroImage', folderName, file);
        imagePaths.push(filePath);
      });
    }
  });
  return imagePaths;
}