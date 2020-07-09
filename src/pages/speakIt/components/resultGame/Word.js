import React from 'react';
import './ResultGame.scss';

const Word = ({ wordTranslate, isGuessed }) => {

  return (
    <p className={['Word', isGuessed ? 'isGuessed' : 'isNotGuessed'].join(' ')}>
      {wordTranslate}
    </p>
  )
}
export default Word
