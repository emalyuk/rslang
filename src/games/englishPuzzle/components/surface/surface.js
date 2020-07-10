import React, { Fragment, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toCurrentRow, sortCurrentRow, resetWords } from '../../EnglishPuzzleReducer';
import { Word } from '..';

const Surface = ({ image }) => {
  const { rows, width, height } = useSelector((state) => state.englishPuzzle);
  const dispatch = useDispatch();
  const parents = useRef(rows.map(() => React.createRef()));

  const clickHandler = (id) => {
    dispatch(resetWords())
    dispatch(toCurrentRow({ id }))
  }

  //drag and drop part
  // ======================drag and drop temp data
  let draggedIndex = null;
  let targetIndex = null;
  let targetElem = null;
  let middlePointOfElem = null;
  let startOfElem = null;
  let endOfElem = null;

  // ==========================================drag and drop container handlers
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

  const dragDrop = (e, i) => {
    dispatch(resetWords())
    dispatch(toCurrentRow({ type: 'check' }))
    const { target, pageX } = e.nativeEvent;
    const { x, width: elemWidth } = target.getBoundingClientRect();
    const middleOfTarget = x + elemWidth / 2;
    const insertPosition = pageX > middleOfTarget ? 'after' : 'before';
    const dataFromAnotherNode = parseInt(e.dataTransfer.getData('text/shuffled'), 10);

    [...parents.current[i].current.children].forEach((child) => {
      child.classList.remove('englishPuzzle__canvas--left')
      child.classList.remove('englishPuzzle__canvas--right')
    });

    if (dataFromAnotherNode || dataFromAnotherNode === 0) {
      dispatch(sortCurrentRow({
        indexFromAnotherNode: dataFromAnotherNode,
        targetIndex,
        insertPosition,
      }))
    } else {
      dispatch(sortCurrentRow({
        targetIndex,
        draggedIndex,
        insertPosition,
      }))
    }
    e.dataTransfer.clearData();
  }
  // ==========================================drag and drop item handlers
  const dragStart = (e, index) => {
    draggedIndex = index;
    e.dataTransfer.setData('text/surface', index)
  }

  const dragEnd = (e) => {
    draggedIndex = null;
    targetIndex = null;
    startOfElem = null;
    endOfElem = null;
    middlePointOfElem = null;
  }

  const dragEnter = (e, index) => {
    const { target } = e.nativeEvent;
    if (draggedIndex === index) return;
    if (targetElem === target) return
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

  const elemDragOver = (e, id) => {
    const { target, pageX } = e.nativeEvent;
    if (draggedIndex === id) return;
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
    <div className='englishPuzzle__surface'>
      {
        rows.map((row, i) => {
          const {
            number, isVisible, sentence, isGuessed, isUseHint,
            isCurrent,
          } = row;
          const resultClass = isGuessed ? 'englishPuzzle__result--right' : 'englishPuzzle__result--wrong';
          if (isVisible) {
            return (
              // eslint-disable-next-line react/jsx-fragments
              <Fragment key={number}>
                <div className='englishPuzzle__row-number'>{number}</div>
                <div
                  className={`englishPuzzle__row-sentence ${(isGuessed || isUseHint) ? 'englishPuzzle__row-sentence--disabled' : ''}`}
                  ref={parents.current[i]}
                  style={{ height, width }}
                  onDrop={(e) => dragDrop(e, i)}
                  onDragOver={dragOver}
                >
                  {sentence.map((dataObj, index) => {
                    return (
                      <Word
                        index={index}
                        key={dataObj.id}
                        data={dataObj}
                        image={image}
                        clickHandler={clickHandler}
                        dragStart={dragStart}
                        dragEnter={dragEnter}
                        dragEnd={(e) => dragEnd(e)}
                        dragOver={elemDragOver}
                      />
                    )
                  })}
                </div>
                <div className={`englishPuzzle__result ${!isCurrent ? resultClass : ''}`} />
              </Fragment>
            )
          }
          return null;
        })
      }
    </div>
  )
}

export default Surface;
