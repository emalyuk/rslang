import React from 'react';
import './ViewBox.scss';

const ViewBox = ({ activeImg, activeAudio, wordTranslate }) => {

  return (
    <div className='ViewBox'>
      <img src={`https://raw.githubusercontent.com/aleksey-drozdov/rslang-data/master/${activeImg ? activeImg : 'files/01_0009.jpg'}`} atl='img' />
      <p>{wordTranslate}</p>
      {
        activeAudio ? <audio src={`https://raw.githubusercontent.com/aleksey-drozdov/rslang-data/master/${activeAudio}`} autoPlay /> : ''
      }
    </div>
  )
}
export default ViewBox
