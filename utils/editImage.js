const jimp = require('jimp');

const editImage = async (imagePath, width, height) => {
  const image = await jimp.read(imagePath);
  image.resize(width, height);
  await image.writeAsync(imagePath);
};

module.exports = editImage;
