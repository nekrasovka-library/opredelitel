const fs = require("fs");
const path = require("path");
const { Router } = require("express");
const router = Router();
const { join } = require("path");
const sharp = require("sharp");

const CACHE_PATH = path.join(__dirname, ".cache"); // Кэш обработанных изображений

if (!fs.existsSync(CACHE_PATH)) {
  fs.mkdirSync(CACHE_PATH, { recursive: true }); // Создаем папку для кэша, если её нет
}

router.get("/optimized-images/:height/:imageName", async (req, res) => {
  const { imageName, height } = req.params;
  const heightValue = parseInt(height, 10);
  const originalImagePath = join(__dirname, "../../images", imageName);
  const cachedImagePath = path.join(
    CACHE_PATH,
    `${path.parse(imageName).name}.webp`,
  );

  try {
    if (!fs.existsSync(originalImagePath)) {
      console.error(`Original file not found at: ${originalImagePath}`);
      return res.status(404).send("Original image not found");
    }

    // Если кэш уже существует, отдаем кэшированное изображение
    if (fs.existsSync(cachedImagePath)) {
      res.set("Content-Type", "image/webp");
      return fs.createReadStream(cachedImagePath).pipe(res);
    }

    // Обработка через sharp
    const optimizedImageBuffer = await sharp(originalImagePath)
      .resize({ height: heightValue })
      .toFormat("webp", { quality: 100 })
      .toBuffer();

    // Сохраняем обработанное изображение
    fs.writeFileSync(cachedImagePath, optimizedImageBuffer);

    res.set("Content-Type", "image/webp");
    res.send(optimizedImageBuffer);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("An error occurred while processing the image");
  }
});

module.exports = router;
