import fs from "fs";
import path from "path";

export const generateUUID = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

/**
 *
 * @param images [{ path: String, uuid_card_type: String }]
 */
function getAllImagePaths(dirpath, cardTypes) {
  let allImages = [];
  let files = fs.readdirSync(dirpath);

  for (const file in files) {
    const file_location = path.join(dirpath, files[file]);
    const card_type = cardTypes.find((value) => value.name == files[file]);
    allImages = [...allImages, ...getImages(file_location, card_type)];
  }

  return allImages;
}

function getImages(dirpath, cardType) {
  const images = [];
  let files = fs.readdirSync(dirpath);

  for (const file in files) {
    const file_location = path.join(dirpath, files[file]);
    images.push({ path: file_location, uuid_card_type: cardType.uuid });
  }

  return images;
}

export default {
  getAllImagePaths,
};
