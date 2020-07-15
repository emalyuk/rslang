import React from 'react';
import './ResultGame.scss';

const Word = ({ word, isGuessed }) => {

  return (
    <p className={['Word', isGuessed ? 'isGuessed' : 'isNotGuessed'].join(' ')}>
      {word}
    </p>
  )
}
export default Word
