import React from 'react';
import './Card.scss';

const Card = ({
  word, transcription, activeId, setActiveId,
  id, setActiveImg, image, setActiveAudio,
  audio, setWordTranslate, wordTranslate,
  audioPlayer, isGameMod, isGuessed, isNotGuessed
}) => {
  const isActive = activeId === id;

  function setCurrendItem(id, image, setActiveImg, setActiveId) {
    if (isActive) {
      audioPlayer.play()
    } else {
      setActiveId(id);
      setActiveImg(image)
      setActiveAudio(audio)
      setWordTranslate(wordTranslate)
    }

  }
  return (
    <div
        className={
        [
          'Card ',
          isActive ? 'isActive' : '',
          id,
          isGameMod ? 'isGame' : '',
          isGuessed ? 'isGuessed' : '',
          isNotGuessed ? "isNotGuessed" : ''
        ].join(' ')}
         onClick={() => setCurrendItem(id, image, setActiveImg, setActiveId)}
    >
      <p>{word}</p>
      <p>{wordTranslate}</p>
      <p>{transcription}</p>
    </div>
  )
}
export default Card
