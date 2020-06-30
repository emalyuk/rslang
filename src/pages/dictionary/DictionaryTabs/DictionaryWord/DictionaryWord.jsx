import React, { useState } from 'react';
import './DictionaryWord.scss';
import { useDispatch, useSelector } from 'react-redux';
import LeoFaw from '../../../../components/leoFaw/LeoFaw';
import CheckBox from '../../../../components/checkBox/CheckBox';
import playAudio from '../../../../utils/playAudio';
import { changeShowDeleteModal, updateTrash, toggleIsSelect, toggleIsAllSelected } from '../../DictionaryReducer';

const DictionaryWord = ({ word, translate, image, audio, id, isAll }) => {
  const trash = useSelector((state) => state.dictionary.trash);
  const isSelect = useSelector((state) => state.dictionary.isSelect);
  const [linkRaw] = useState('https://raw.githubusercontent.com/himimetsu/rslang-data/master/');
  const dispatch = useDispatch();

  const toggleWordInTrash = (sd, showModal) => {
    const copyTrash = trash.slice();
    if (!showModal) {
      if (trash.length === 0) {
        copyTrash.push(sd);
        dispatch(updateTrash(copyTrash));
      } else if (trash.includes(sd)) {
        const repeatId = trash.indexOf(sd);
        copyTrash.splice(repeatId, 1);
        dispatch(updateTrash(copyTrash));
      } else {
        copyTrash.push(sd);
        dispatch(updateTrash(copyTrash));
      }
    } else {
      dispatch(changeShowDeleteModal(true));
    }

    if (copyTrash.length > 0) {
      dispatch(toggleIsSelect(true));
    } else {
      dispatch(toggleIsSelect(false));
      dispatch(toggleIsAllSelected(false));
    }
  };

  return (
    <div className='dictionary-word'>
      <CheckBox id={id} click={() => toggleWordInTrash(id, false)} isAll={isAll} />
      <div className='audio-icon' onClick={() => playAudio(audio)} />
      <div className='my-words'>
        <div className='word'>{word}</div>
        <div className='translate'>{translate}</div>
      </div>
      <div className='word-image' style={{ backgroundImage: `url('${rawImage}${image}')` }} />
      <LeoFaw color='orange' />
      {!isSelect && <div className='trash-icon' onClick={() => toggleWordInTrash(id, true)} />}
    </div>
  );
};

export default DictionaryWord;
