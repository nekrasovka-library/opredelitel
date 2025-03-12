import React, { useEffect, useRef, useState } from "react";
import { ImageStyles } from "./image.styles";

const Image = ({ imageUrl, className }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const DEFAULT_IMAGE = `${API_URL}/api/optimized-images/20/${imageUrl}`;
  const LARGE_IMAGE = `${API_URL}/images/${imageUrl}`;
  const blockRef = useRef(null); // Ссылка на HTML-элемент
  const [isFullImageLoaded, setIsFullImageLoaded] = useState(false); // Флаг завершённой загрузки изображения (чтобы не грузить снова)
  const [isIntersected, setIsIntersected] = useState(false);
  const visibilityTimerRef = useRef(null); // Таймер на 200 мс

  const loadImage = () => {
    const img = document.createElement("img");
    img.src = LARGE_IMAGE;

    img.onload = () => {
      const div = blockRef.current.children[0].children[0];
      div.style.backgroundImage = `url(${LARGE_IMAGE})`;
      setIsFullImageLoaded(true);
    };
  };

  useEffect(() => {
    // Создаём Observer для отслеживания видимости
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsIntersected(entry.isIntersecting);

        if (entry.isIntersecting) {
          if (!isFullImageLoaded) {
            visibilityTimerRef.current = setTimeout(() => {
              loadImage();
            }, 200); // Ожидаем, пока блок находится в видимости 200 мс
          }
        } else clearTimeout(visibilityTimerRef.current);
      },
      { threshold: 0.1 }, // 10% блока должны быть видимы
    );

    if (blockRef.current) {
      observer.observe(blockRef.current);
    }

    return () => {
      // Чистим observer и таймер при размонтировании
      if (blockRef.current) {
        observer.unobserve(blockRef.current);
      }

      clearTimeout(visibilityTimerRef.current);
    };
  }, [imageUrl, isFullImageLoaded]);

  return (
    <ImageStyles
      isIntersected={isIntersected}
      className={className}
      ref={blockRef}
      imageUrl={`url(${DEFAULT_IMAGE})`}
    >
      <div>
        <div />
      </div>
    </ImageStyles>
  );
};

export default Image;
