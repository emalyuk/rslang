import React from 'react';
import './Card.scss';

const Card = ({
  word, wordTranslate, activeId, setActiveId, id, setActiveImg, image, setActiveAudio, audio
}) => {
  const isActive = activeId === id;

  function setCurrendItem(id, image, setActiveImg, setActiveId) {
    setActiveId(id);
    setActiveImg(image)
    setActiveAudio(audio)
  }
  return (
    <div className={['card ', isActive ? 'isActive' : '', id].join(' ')} onClick={() => setCurrendItem(id, image, setActiveImg, setActiveId)}>
      <p>{word}</p>
      <p>{wordTranslate}</p>
    </div>
  )
}
export default Card
