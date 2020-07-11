import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './GameCard.scss';

const GameCard = React.forwardRef(({ name, description, path, id, heightDescription }, ref) => {
  const [isShowDescription, setIsShowDescription] = useState(false);
  const refDescription = useRef();

  const history = useHistory();

  const toggleHidden = () => {
    refDescription.current.classList.add('hide');
    if (isShowDescription) {
      setTimeout(() => {
        refDescription.current.classList.remove('down');
      }, 100);
    } else {
      refDescription.current.classList.remove('hide');
      setTimeout(() => {
        refDescription.current.classList.add('down');
      }, 100);
    }
    setIsShowDescription(!isShowDescription);
  };

  return (
    <div
      ref={ref}
      className='gamecard-wrapper'
      data-id={id}
      onClick={() => history.push(path)}
    >
      <div className='gamecard-text'>
        <div className='gamecard-name'>
          {name}
        </div>
        <div className='gamecard-words'>
          Слов: 123
        </div>
      </div>
      <div className='woah'>
        <div
          className='woah-icon'
          onMouseEnter={() => toggleHidden()}
          onMouseLeave={() => toggleHidden()}
        />
      </div>
      <div
        className='description up hide'
        style={{
          right: id % 2 !== 0 ? 0 : 'auto',
          left: id % 2 === 0 ? 0 : 'auto',
          height: heightDescription > 0 ? heightDescription : 'auto',
        }}
        ref={refDescription}
      >
        <div
          className='description-text'
          data-id={id}
          style={{ height: heightDescription > 0 ? heightDescription : 'auto' }}
        >
          {description}
        </div>
      </div>
    </div>
  );
});

export default GameCard;
