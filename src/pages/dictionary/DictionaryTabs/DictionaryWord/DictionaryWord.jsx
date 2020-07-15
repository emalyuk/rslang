import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeoFaw from '../../../../components/leoFaw/LeoFaw';
import CheckBox from '../../../../components/checkBox/CheckBox';
import playAudio from '../../../../utils/playAudio';
import { changeShowDeleteModal, updateTrash, toggleIsSelect, toggleIsAllSelected } from '../../DictionaryReducer';
import './DictionaryWord.scss';

const DictionaryWord = ({ word, wordTranslate, image, audio, _id, isAll, color }) => {
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

  const wordHandler = (idWord) => {
    const copyTrash = trash.slice();
    copyTrash.push(idWord);
    dispatch(updateTrash(copyTrash));
    dispatch(changeShowDeleteModal(true));
  };

  return (
    <div className='dictionary-word'>
      <CheckBox id={_id} onClick={() => toggleWordInTrash(_id, false)} isChecked={isAll} />
      <div className='audio-icon' onClick={() => playAudio(linkRaw, audio)} />
      <div className='my-words'>
        <div className='word'>{word}</div>
        <div className='translate'>{wordTranslate}</div>
      </div>
      <div className='word-image' style={{ backgroundImage: `url('${linkRaw}${image}')` }} />
      <LeoFaw color={color} />
      {!isSelect ? <div className='trash-icon' onClick={() => wordHandler(_id)} /> : <div className='empty' />}
    </div>
  );
};

export default DictionaryWord;
