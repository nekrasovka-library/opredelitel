import React, { useEffect, useRef, useState } from "react";
import { FullscreenImage } from "../Block/block.styles";

const ProgressiveImage = ({ smallSrc, largeSrc, alt }) => {
  const [currentSrc, setCurrentSrc] = useState(""); // Ссылка на текущее отображаемое изображение
  const [isSmallLoaded, setIsSmallLoaded] = useState(false); // Маленькое изображение загружено
  const controllerRef = useRef(null); // AbortController для загрузок

  useEffect(() => {
    // Сбрасываем состояния при изменении smallSrc или largeSrc
    setCurrentSrc("");
    setIsSmallLoaded(false);

    // Отменяем предыдущий запрос, если smallSrc или largeSrc меняется
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Новый контроллер загрузки
    const controller = new AbortController();
    controllerRef.current = controller;

    // Загружаем маленькое изображение
    const smallImage = new Image();
    smallImage.src = smallSrc;

    smallImage.onload = () => {
      if (!controller.signal.aborted) {
        setCurrentSrc(smallSrc); // Устанавливаем маленькое изображение
        setIsSmallLoaded(true); // Помечаем, что маленькое изображение загружено
      }
    };

    smallImage.onerror = () => {
      if (!controller.signal.aborted) {
        console.error("Ошибка загрузки маленького изображения.");
        setIsSmallLoaded(true); // Снимаем ожидание даже в случае ошибки
      }
    };

    // Загружаем большое изображение
    const largeImage = new Image();
    largeImage.src = largeSrc;

    largeImage.onload = () => {
      if (!controller.signal.aborted) {
        setCurrentSrc(largeSrc); // Мгновенно переключаемся на большое изображение!
      }
    };

    largeImage.onerror = () => {
      if (!controller.signal.aborted) {
        console.error("Ошибка загрузки большого изображения.");
      }
    };

    // Убираем загрузчики при размонтировании компонента
    return () => {
      controller.abort();
    };
  }, [smallSrc, largeSrc]); // Эффект запускается, если изменяются smallSrc или largeSrc

  return isSmallLoaded ? (
    <FullscreenImage
      src={currentSrc} // Текущее изображение (smallSrc -> largeSrc)
      alt={alt}
    />
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f0f0", // Фон до загрузки smallSrc
      }}
    />
  );
};

export default ProgressiveImage;
