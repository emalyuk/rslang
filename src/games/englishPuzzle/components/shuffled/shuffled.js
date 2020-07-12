import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toGuessingRow, sortGuessingRow } from '../../EnglishPuzzleReducer';
import { Word } from '..';

const Shuffled = ({ image }) => {
  const { shuffled, width, height, isImgShow } = useSelector((state) => state.englishPuzzle);
  const dispatch = useDispatch();
  const parent = useRef(null);

  const clickHandler = (id) => {
    dispatch(toGuessingRow({ id }));
  }

  let draggedIndex = null;
  let targetIndex = null;
  let targetElem = null;
  let middlePointOfElem = null;
  let startOfElem = null;
  let endOfElem = null;

  const dragOver = (e) => {
    e.preventDefault();
    const elemBorderFactor = 10;
    const { pageX } = e.nativeEvent;
    if (pageX < startOfElem + elemBorderFactor && targetElem) {
      targetElem.classList.remove('englishPuzzle__canvas--right')
    }
    if (pageX > endOfElem - elemBorderFactor && targetElem) {
      targetElem.classList.remove('englishPuzzle__canvas--left')
    }
  }

  const dragDrop = (e) => {
    const { target, pageX } = e.nativeEvent;
    const { x, width: elemWidth } = target.getBoundingClientRect();
    const middleOfTarget = x + elemWidth / 2;
    const insertPosition = pageX > middleOfTarget ? 'after' : 'before';
    const dataFromAnotherNode = parseInt(e.dataTransfer.getData('text/surface'), 10);

    [...parent.current.children].forEach((child) => {
      child.classList.remove('englishPuzzle__canvas--left')
      child.classList.remove('englishPuzzle__canvas--right')
    });

    if (dataFromAnotherNode || dataFromAnotherNode === 0) {
      dispatch(sortGuessingRow({
        indexFromAnotherNode: dataFromAnotherNode,
        targetIndex,
        insertPosition,
      }))
    } else {
      dispatch(sortGuessingRow({
        targetIndex,
        draggedIndex,
        insertPosition,
      }))
    }
    e.dataTransfer.clearData();
  }

  const dragStart = (e, index) => {
    draggedIndex = index;
    e.dataTransfer.setData('text/shuffled', index)
  }

  const dragEnd = () => {
    targetIndex = null;
    startOfElem = null;
    endOfElem = null;
    middlePointOfElem = null;
  }

  const dragEnter = (e, index) => {
    const { target } = e.nativeEvent;
    if (draggedIndex === index) return;
    if (targetElem === target) return;
    targetElem = target;

    const { x, width: elemWidth } = target.getBoundingClientRect();
    const middleOfTarget = x + elemWidth / 2;
    middlePointOfElem = middleOfTarget;
    setTimeout(() => {
      targetIndex = index;
      startOfElem = x;
      endOfElem = x + elemWidth;
    }, 0)
  }

  const elemDragOver = (e, index) => {
    const { target, pageX } = e.nativeEvent;
    if (draggedIndex === index) return;
    if (pageX < middlePointOfElem) {
      target.classList.remove('englishPuzzle__canvas--left');
      target.classList.add('englishPuzzle__canvas--right')
    }
    if (pageX > middlePointOfElem) {
      target.classList.remove('englishPuzzle__canvas--right')
      target.classList.add('englishPuzzle__canvas--left');
    }
  }

  return (
    <div
      className='englishPuzzle__shuffled'
      style={{ width, height }}
      ref={parent}
      onDragOver={dragOver}
      onDrop={dragDrop}
    >
      {shuffled.map((obj, index) => {
        return (
          <Word
            key={obj.id}
            index={index}
            data={obj}
            image={image}
            imgFlag={isImgShow}
            clickHandler={clickHandler}
            dragStart={dragStart}
            dragEnter={dragEnter}
            dragEnd={dragEnd}
            dragOver={elemDragOver}
          />
        )
      })}
    </div>
  )
}

export default Shuffled;
