const fs = require("fs");
const path = require("path");
const { Router } = require("express");
const { Worker } = require("worker_threads"); // Подключение многопоточности
const router = Router();
const { join } = require("path");

const CACHE_PATH = path.join(__dirname, ".cache"); // Кэш обработанных изображений

if (!fs.existsSync(CACHE_PATH)) {
  fs.mkdirSync(CACHE_PATH, { recursive: true }); // Создаем папку для кэша, если её нет
}

router.get("/optimized-images/:imageName", (req, res) => {
  const { imageName } = req.params;
  const originalImagePath = join(__dirname, "../../images", imageName);
  const cachedImagePath = path.join(
    CACHE_PATH,
    `${path.parse(imageName).name}.webp`,
  );

  // Если кэшированное изображение уже существует - вернуть его
  if (fs.existsSync(cachedImagePath)) {
    res.set("Content-Type", "image/webp");
    return fs.createReadStream(cachedImagePath).pipe(res);
  }

  // Если картинки в кэше нет, обрабатываем через воркер
  const worker = new Worker(
    path.join(__dirname, "/helpers/imageProcessor.js"),
    {
      workerData: { originalImagePath, cachedImagePath }, // Передача данных в воркер
    },
  );

  // Флаг, чтобы исключить несколько вызовов res.send
  let responseSent = false;

  worker.on("message", () => {
    if (!responseSent) {
      responseSent = true; // Устанавливаем флаг
      res.set("Content-Type", "image/webp");
      fs.createReadStream(cachedImagePath).pipe(res);
    }
  });

  worker.on("error", (err) => {
    if (!responseSent) {
      responseSent = true; // Устанавливаем флаг
      console.error("Ошибка обработки изображения", err);
      res.status(500).send("Ошибка обработки изображения.");
    }
  });

  worker.on("exit", (code) => {
    if (code !== 0 && !responseSent) {
      responseSent = true; // Устанавливаем флаг
      console.error(`Воркер завершился с кодом ${code}`);
      res.status(500).send("Ошибка обработки изображения.");
    }
  });
});

module.exports = router;
