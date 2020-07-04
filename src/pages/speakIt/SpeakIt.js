import React, { useState, useEffect } from 'react';
import './SpeakIt.scss';
import Card from './components/card/Card'
import ViewBox from './components/viewBox/ViewBox'

const Team = () => {
  const [words, setWords] = useState([])
  const [activeId, setActiveId] = useState(false)
  const [activeImg, setActiveImg] = useState('')
  const [activeAudio, setActiveAudio] = useState('')
  const [wordTranslate, setWordTranslate] = useState('')
  const audio = document.querySelector('audio')
  const [isGameMod, setIsGameMod] = useState(false)
  const [spokenWord, setSpokenWord] = useState('')
  const [gameWordNum, setGameWordNum] = useState(0)

  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async function getData(page, group) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    try {
      const responce = await fetch(url);
      const data = await responce.json();
      setWords(data)
    } catch (e) {
      console.log(e.message)
    }
  }

  // начальная загрузка данных
  async function init() {
    await getData(getRandomNum(0, 29), 0);
  }
  useEffect(() => {
    init()
  }, [])

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  function showPendingWord() {
    setActiveId(words[gameWordNum].id)
    setActiveImg(words[gameWordNum].image)
    setWordTranslate(words[gameWordNum].wordTranslate)
  }
  function startGame() {
    setIsGameMod(true)
    setActiveId(false)
    setWords(shuffle(words))
    showPendingWord()
  }
  return (
    <div className='SpeakIt container'>
      <h1>Speak IT</h1>
      <button onClick={startGame}>начать игру</button>
      <ViewBox activeImg={activeImg} activeAudio={activeAudio} wordTranslate={wordTranslate}></ViewBox>
      {
        words.map((item) => (
          <Card
            {...item}
            key={item.id}
            activeId={activeId}
            setActiveId={setActiveId}
            setActiveImg={setActiveImg}
            setActiveAudio={setActiveAudio}
            setWordTranslate={setWordTranslate}
            audioPlayer={audio}
            isGameMod={isGameMod}
          />
        ))
      }
    </div >
  )
};

export default Team;
