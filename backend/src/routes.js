const fs = require("fs");
const path = require("path");
const { Router } = require("express");
const router = Router();
const { join } = require("path");
const sharp = require("sharp");

const CACHE_PATH = path.join(__dirname, ".cache"); // Кэш обработанных изображений

// Проверка и создание основной папки кэша
if (!fs.existsSync(CACHE_PATH)) {
  fs.mkdirSync(CACHE_PATH, { recursive: true });
}

router.get("/optimized-images/:size/:imageName", async (req, res) => {
  const { imageName, size } = req.params;

  // Соответствие между размером и параметрами
  let heightValue;
  let folderName;

  if (size === "sm") {
    heightValue = 20; // Высота для small
    folderName = "small";
  } else if (size === "md") {
    heightValue = 200; // Высота для medium
    folderName = "medium";
  } else {
    // Если передано значение size, не соответствующее ни одному из вариантов
    return res.status(400).send("Invalid size parameter");
  }

  const originalImagePath = join(__dirname, "../../images", imageName);
  const cachedImageFolder = path.join(CACHE_PATH, folderName); // Путь до папки c сохранением (например: .cache/small)
  const cachedImagePath = path.join(
    cachedImageFolder,
    `${path.parse(imageName).name}.webp`,
  );

  try {
    // Проверяем существование папки для текущего размера (например, small/medium)
    if (!fs.existsSync(cachedImageFolder)) {
      fs.mkdirSync(cachedImageFolder, { recursive: true }); // Создаем папку, если её нет
    }

    // Проверка, существует ли оригинальное изображение
    if (!fs.existsSync(originalImagePath)) {
      console.error(`Original file not found at: ${originalImagePath}`);
      return res.status(404).send("Original image not found");
    }

    // Если уже создано кэшированное изображение, возвращаем его
    if (fs.existsSync(cachedImagePath)) {
      res.set("Content-Type", "image/webp");
      return fs.createReadStream(cachedImagePath).pipe(res);
    }

    // Обработка изображения с использованием sharp
    const optimizedImageBuffer = await sharp(originalImagePath)
      .resize({ height: heightValue })
      .toFormat("webp", { quality: 100 })
      .toBuffer();

    // Сохранение обработанного изображения в соответствующую папку
    fs.writeFileSync(cachedImagePath, optimizedImageBuffer);

    res.set("Content-Type", "image/webp");
    res.send(optimizedImageBuffer);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("An error occurred while processing the image");
  }
});

module.exports = router;
