import React, { useEffect } from "react";
import { BlockImages } from "./masonry.styles";
import imagesLoaded from "imagesloaded";

// Константы
const GRID_MAX_WIDTH = 1200;

const MasonryGrid = ({ images, openImage }) => {
  useEffect(() => {
    const getGridStyles = (gridElement) => {
      const computedStyle = window.getComputedStyle(gridElement);
      return {
        paddingLeft: parseInt(computedStyle.paddingLeft, 10) || 0,
        paddingRight: parseInt(computedStyle.paddingRight, 10) || 0,
        gap: parseInt(computedStyle.gap, 10) || 0,
      };
    };

    const initializeGrid = (gridElement, widths, groupedWidths) => {
      gridElement.style.flexWrap = "wrap";
      gridElement.style.visibility = "visible";
      groupedWidths.flat().forEach((width, index) => {
        widths[index].style.width = `${width}px`;
      });
    };

    const updateGridWidth = (gridElement, targetWidth) => {
      gridElement.style.width = `${targetWidth}px`;
    };

    const resizeGrid = () => {
      const gridElement = document.querySelector(".grid");
      const imageElements = Array.from(gridElement.querySelectorAll("img"));
      const { paddingLeft, paddingRight, gap } = getGridStyles(gridElement);
      const totalOffset = paddingLeft + paddingRight;
      const width = window.innerWidth;
      const targetWidth = Math.min(width, GRID_MAX_WIDTH) - totalOffset;

      imagesLoaded(gridElement, () => {
        const imageWidths = imageElements.map((img) => img.offsetWidth);
        const groupedWidths = groupImagesByWidth(gap, imageWidths, targetWidth);
        updateGridWidth(gridElement, targetWidth);
        initializeGrid(gridElement, imageElements, groupedWidths);
      });
    };

    window.addEventListener("resize", resizeGrid);
    resizeGrid();

    return () => window.removeEventListener("resize", resizeGrid);
  }, []);

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
      <div className="grid" style={{ visibility: "hidden" }}>
        {images.map((image, index) => (
          <div
            className="grid-item"
            key={index}
            onClick={() => openImage(index)}
          >
            <img
              loading="lazy"
              src={`${process.env.REACT_APP_API_URL}/api/optimized-images/250/${image.dataset.original}`}
              alt={image.name}
            />
          </div>
        ))}
      </div>
    </BlockImages>
  );
};

export default MasonryGrid;
