import React, { useEffect, useRef } from "react";
import { BlockImages } from "./masonry.styles";
import imagesLoaded from "imagesloaded";

const GRID_MAX_WIDTH = 1200;

const MasonryGrid = ({ images, openImage }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const getGridStyles = (gridElement) => {
      const computedStyle = window.getComputedStyle(gridElement);
      return {
        paddingLeft: parseInt(computedStyle.paddingLeft, 10) || 0,
        paddingRight: parseInt(computedStyle.paddingRight, 10) || 0,
        gap: parseInt(computedStyle.gap, 10) || 0,
      };
    };

    const initializeGrid = (gridElement, el, groupedWidths) => {
      gridElement.style.flexWrap = "wrap";
      gridElement.style.visibility = "visible";
      groupedWidths.flat().forEach((width, index) => {
        el[index].img.style.width = `${width}px`;
      });
    };

    const updateGridWidth = (gridElement, targetWidth) => {
      gridElement.style.width = `${targetWidth}px`;
    };

    const resizeGrid = () => {
      const gridElement = gridRef.current;

      const { paddingLeft, paddingRight, gap } = getGridStyles(gridElement);
      const totalOffset = paddingLeft + paddingRight;
      const width = window.innerWidth;
      const targetWidth = Math.min(width, GRID_MAX_WIDTH) - totalOffset;

      const imgLoad = imagesLoaded(gridElement);

      imgLoad.on("done", function () {
        const imageElements = imgLoad.images;
        const imageWidths = imageElements.map((img) => img.img.naturalWidth);
        const groupedWidths = groupImagesByWidth(gap, imageWidths, targetWidth);
        updateGridWidth(gridElement, targetWidth);
        initializeGrid(gridElement, imageElements, groupedWidths);
      });
    };

    window.addEventListener("resize", resizeGrid);
    resizeGrid();

    return () => window.removeEventListener("resize", resizeGrid);
  }, [gridRef.current]);

  const calculateAdjustedWidths = (gap, group, targetWidth) => {
    const totalGaps = gap * (group.length - 1);
    const currentTotalWidth =
      group.reduce((sum, width) => sum + width, 0) + totalGaps;
    const widthDifference = currentTotalWidth - targetWidth;
    const correctionFactor = widthDifference / group.length;

    return group.map((width) => width - Math.max(correctionFactor, 0));
  };

  const groupImagesByWidth = (gap, widths, targetWidth) => {
    const groups = [];
    let currentGroup = [];
    let currentWidth = 0;

    for (const width of widths) {
      if (currentGroup.length > 0) currentWidth += gap;
      currentWidth += width;
      currentGroup.push(width);

      if (currentWidth >= targetWidth) {
        groups.push(calculateAdjustedWidths(gap, currentGroup, targetWidth));
        currentGroup = [];
        currentWidth = 0;
      }
    }

    if (currentGroup.length > 0) {
      groups.push(calculateAdjustedWidths(gap, currentGroup, targetWidth));
    }

    return groups;
  };
  return (
    <BlockImages>
      <div ref={gridRef} style={{ visibility: "hidden" }}>
        {images.map((image, index) => {
          return (
            <div key={index} onClick={() => openImage(index)}>
              <img
                src={`${process.env.REACT_APP_API_URL}/api/optimized-images/200/${image.dataset.original}`}
                alt={image.name}
              />
            </div>
          );
        })}
      </div>
    </BlockImages>
  );
};

export default MasonryGrid;
