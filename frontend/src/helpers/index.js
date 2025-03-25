import { useState, useEffect } from "react";

const mapBlocks = (filteredBlocks, images) =>
  filteredBlocks.map((filteredBlock) => ({
    id: filteredBlock.id,
    paperId: filteredBlock.paperId,
    tildaId: filteredBlock.tildaId,
    title: filteredBlock.title,
    original: filteredBlock.original,
    text: filteredBlock.text,
    color: filteredBlock.color,
    images: images.filter((image) => filteredBlock.images.includes(image.id)),
  }));

const mapLists = (filteredBlocks, lists) =>
  filteredBlocks.map((filteredBlock) => ({
    id: filteredBlock.id,
    title: filteredBlock.title,
    lists: lists.filter((list) => filteredBlock.lists.includes(list.id)),
  }));

const loadImage = (imageName, API_URL) => {
  const imagePath = `${API_URL}/images/${imageName}`;
  return new Promise((resolve, reject) => {
    const imageElement = new Image();
    imageElement.onload = () => resolve(imagePath);
    imageElement.onerror = (error) => reject(error);
    imageElement.src = imagePath;
  });
};

const useIsMobile = (breakpoint = 700) => {
  // Если "window" недоступен (SSR), считается, что ширина неизвестна. Начальное значение false.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= breakpoint;
    }
    return false;
  });

  useEffect(() => {
    // Для серверных условий `window` недоступен: пропускаем хук.
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth <= breakpoint;
      setIsMobile((prevIsMobile) =>
        prevIsMobile !== isCurrentlyMobile ? isCurrentlyMobile : prevIsMobile,
      );
    };

    // Вызов обработчика при монтировании компонента (для синхронизации)
    handleResize();

    // Добавление слушателя события
    window.addEventListener("resize", handleResize);

    // Удаление слушателя при размонтировании компонента
    return () => window.removeEventListener("resize", handleResize);
  });

  return isMobile;
};

const useElementVisibility = (ref, callback, offset = 0) => {
  useEffect(() => {
    if (typeof window === "undefined" && !ref) return;

    const onWindowScroll = () => {
      const rect = ref.getBoundingClientRect();
      const isVisible = rect.top - offset <= 0;

      // Вызываем переданный callback с параметром: виден элемент или нет
      callback(isVisible);
    };

    // Слушаем событие прокрутки
    window.addEventListener("scroll", onWindowScroll);

    // Убираем слушатель при размонтировании
    return () => {
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, [ref, callback, offset]); // Зависимости
};

export { useIsMobile, mapBlocks, mapLists, loadImage, useElementVisibility };
