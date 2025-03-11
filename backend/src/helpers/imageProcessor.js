const { parentPort, workerData } = require("worker_threads");
const sharp = require("sharp");
const fs = require("fs");

// Получаем параметры задачи из основного потока
const { originalImagePath, cachedImagePath } = workerData;

async function processImage() {
  try {
    // Обработка изображения через sharp
    const optimizedImageBuffer = await sharp(originalImagePath)
      .resize({ height: 250 }) // Изменение размера (высота 250)
      .toFormat("webp") // Преобразование в формат WEBP
      .toBuffer(); // Получить буфер изображения

    // Сохранение обработанного изображения в файл кэша
    fs.writeFileSync(cachedImagePath, optimizedImageBuffer);

    // Отправляем сообщение в основной поток о завершении задачи
    parentPort.postMessage("done");
  } catch (error) {
    // В случае ошибки уведомляем о ней основной поток
    parentPort.postMessage({ error: error.message });
  }
}

processImage();
