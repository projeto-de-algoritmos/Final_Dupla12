import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Board.css';
import shrekImage from '../../assets/images/shrek.png';
import dragonImage from '../../assets/images/dragon.png';
import backgroundImage from '../../assets/images/StoneFloorTexture.png';
import wallImage from '../../assets/images/WallTexture.jpg';
import lavaImage from '../../assets/images/lavaTexture.jpg';

function Board({ map, currentCell, items, forwardedRef }) {
  const canvas = useRef(null);
  const [context, setCtx] = useState(undefined);
  const previousCell = useRef(0, 0);

  const onResize = useCallback(() => {
    const { offsetWidth, offsetHeight } = forwardedRef.current;
    canvas.current.width = offsetWidth;
    canvas.current.height = offsetHeight;
  }, [forwardedRef]);

  useEffect(() => {
    setCtx(canvas.current.getContext('2d'));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  const drawImage = (x, y, img) => {
    const blockWidth = Math.floor(canvas.current.width / map.cols);
    const blockHeight = Math.floor(canvas.current.height / map.rows);

    const image = new Image();
    image.onload = () => {
      context.drawImage(
        image,
        x * blockWidth,
        y * blockHeight,
        blockWidth,
        blockHeight
      );
    };

    image.src = img;
  };

  useEffect(() => {
    if (!map) {
      return;
    }

    for (let y = 0; y < map.rows; y++) {
      for (let x = 0; x < map.cols; x++) {

        const cell = map.cells[x + y * map.cols];

        if (cell.blockType === 1) {
          drawImage(x, y, wallImage)
        }
        else if (cell.blockType === 2) {
          drawImage(x, y, lavaImage)
        } else {
          drawImage(x, y, backgroundImage)
        }

      }
    }
    drawImage(map.endCell[0], map.endCell[1], dragonImage)
  }, [map])

  useEffect(() => {
    if (!map) {
      return;
    }

    items.forEach(item => {
      const { cell, image, isTaken } = item;

      if (!isTaken)
        drawImage(cell[0], cell[1], image);
      else {

        const itemCell = map.getCell(cell[0], cell[1]);
        if (itemCell && itemCell.blockType === 2)
          drawImage(cell[0], cell[1], lavaImage);
        else
          drawImage(cell[0], cell[1], backgroundImage);
      }
    });

    drawImage(currentCell[0], currentCell[1], shrekImage);
    const cell = map.cells[previousCell.current[0] + previousCell.current[1] * map.cols];
    if (cell && cell.blockType === 2)
      drawImage(previousCell.current[0], previousCell.current[1], lavaImage, true);
    else
      drawImage(previousCell.current[0], previousCell.current[1], backgroundImage, true);


    previousCell.current = currentCell
  }, [currentCell]);

  return (
    <div className="board-container">
      <canvas className="canvas" ref={canvas} />
    </div>
  );
}

export default Board;
