import { useState, useEffect } from "react";

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
  }, [breakpoint]);

  return isMobile;
};

export { useIsMobile };
