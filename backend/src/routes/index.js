const { Router } = require("express");
const imageRoutes = require("./imageRoutes");

const router = Router();

router.use(imageRoutes); // Подключаем маршрутизацию для обработки изображений

module.exports = router;
