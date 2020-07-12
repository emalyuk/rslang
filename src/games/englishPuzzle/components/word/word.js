/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { CanvasApi } from '../../EnglishPuzzleUtils';

const Word = (props) => {
  const {
    data, image, clickHandler, dragStart,
    dragEnter, dragEnd, dragOver, index,
    imgFlag
  } = props;
  const canvas = useRef(null);
  const {
    id, draggable, isRightPos, isFirst,
  } = data;

  const canvasProcessor = new CanvasApi(image, data);

  useEffect(() => {
    canvasProcessor.updateCtx(canvas.current);
    canvasProcessor.drawUnmarked(imgFlag);
  }, [imgFlag]);

  useEffect(() => {
    canvasProcessor.updateCtx(canvas.current);
    if (typeof isRightPos !== 'undefined') {
      canvasProcessor.drawMarked(isRightPos);
    }
    if (typeof isRightPos === 'undefined') {
      canvasProcessor.drawUnmarked(isRightPos);
    }
  }, [isRightPos, canvasProcessor]);

  // useEffect(() => {
  //   // canvasProcessor.drawUnmarked();

  // }, [imgFlag]);

  return (
    <canvas
      className={`englishPuzzle__canvas ${!isFirst ? 'englishPuzzle__canvas--offset' : ''}`}
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
