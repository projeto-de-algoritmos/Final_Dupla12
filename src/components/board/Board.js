import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Board.css';
import shrekImage from '../../assets/images/shrek.png';
import dragonImage from '../../assets/images/dragon.png';
import backgroundImage from '../../assets/images/StoneFloorTexture.png';

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

  const drawWall = (coordX, coordY, width, height) => {
    context.strokeStyle = 'white';
    context.beginPath();
    context.moveTo(coordX, coordY);
    context.lineTo(coordX + width, coordY + height);
    context.stroke();
  };

  const drawImage = (x, y, img) => {
    const blockWidth = Math.floor(canvas.current.width / map.cols);
    const blockHeight = Math.floor(canvas.current.height / map.rows);
    const xOffset = Math.floor((canvas.current.width - map.cols * blockWidth) / 2);

    const imgSize = 0.75 * Math.min(blockWidth, blockHeight);
    const image = new Image(imgSize, imgSize);
    image.onload = () => {
      context.drawImage(
        image,
        x * blockWidth + xOffset + (blockWidth - imgSize) / 2,
        y * blockHeight + (blockHeight - imgSize) / 2,
        imgSize,
        imgSize
      );
    };

    image.src = img;
  };

  useEffect(() => {
    if (!map) {
      return;
    }

    const blockWidth = Math.floor(canvas.current.width / map.cols);
    const blockHeight = Math.floor(canvas.current.height / map.rows);
    const xOffset = Math.floor((canvas.current.width - map.cols * blockWidth) / 2);

    for (let y = 0; y < map.rows; y++) {
      for (let x = 0; x < map.cols; x++) {

        const cell = map.cells[x + y * map.cols];
        if (y === 0 && cell[0]) {
          drawWall(blockWidth * x + xOffset, blockHeight * y, blockWidth, 0);
        }
        if (cell[1]) {
          drawWall(blockWidth * (x + 1) + xOffset, blockHeight * y, 0, blockHeight);
        }
        if (cell[2]) {
          drawWall(blockWidth * x + xOffset, blockHeight * (y + 1), blockWidth, 0);
        }
        if (x === 0 && cell[3]) {
          drawWall(blockWidth * x + xOffset, blockHeight * y, 0, blockHeight);
        }
        drawImage(x, y, backgroundImage)
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
      else{
        drawImage(cell[0], cell[1], backgroundImage);
      }
    });

    drawImage(currentCell[0], currentCell[1], shrekImage);
    drawImage(previousCell.current[0], previousCell.current[1], backgroundImage);

    previousCell.current = currentCell
  }, [currentCell]);

  return (
    <div className="board-container">
      <canvas className="canvas" ref={canvas} />
    </div>
  );
}

export default Board;
