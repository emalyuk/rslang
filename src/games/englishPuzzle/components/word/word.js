/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { CanvasApi } from '../../EnglishPuzzleUtils';

const Word = (props) => {
  const {
    data, image, clickHandler, dragStart,
    dragEnter, dragEnd, dragOver, index,
  } = props;
  const canvas = useRef(null);
  const { id, draggable, isRightPos } = data;
  const canvasProcessor = new CanvasApi(image, data);

  useEffect(() => {
    canvasProcessor.updateCtx(canvas.current);
    canvasProcessor.drawUnmarked();
  }, [canvasProcessor]);

  useEffect(() => {
    canvasProcessor.updateCtx(canvas.current);
    if (typeof isRightPos !== 'undefined') {
      canvasProcessor.drawMarked(isRightPos);
    }
    if (typeof isRightPos === 'undefined') {
      canvasProcessor.drawUnmarked(isRightPos);
    }
  }, [isRightPos, canvasProcessor]);

  return (
    <canvas
      className='englishPuzzle__canvas'
      ref={canvas}
      draggable={draggable}
      onClick={() => clickHandler(id)}
      onDragEnd={(e) => dragEnd(e)}
      onDragStart={(e) => dragStart(e, index, isRightPos)}
      onDragEnter={(e) => dragEnter(e, index)}
      onDragOver={(e) => dragOver(e, index)}
    />
  )
}

export default Word;

Word.defaultProps = {
  clickHandler: () => { },
  dragEnter: () => { },
  dragStart: () => { },
  dragEnd: () => { },
  dragOver: () => { },
};
