import React, { useState, useEffect } from 'react';
import './SpeakIt.scss';
import Card from './components/card/Card'
import ViewBox from './components/viewBox/ViewBox'
import { finished } from 'stream';

const Team = () => {
  const [words, setWords] = useState([])
  const [activeId, setActiveId] = useState(false)
  const [activeImg, setActiveImg] = useState('')
  const [activeAudio, setActiveAudio] = useState('')
  const [wordTranslate, setWordTranslate] = useState('')
  const audio = document.querySelector('audio')
  const [isGameMod, setIsGameMod] = useState(false)
  const [gameWordNum, setGameWordNum] = useState(0)
  const [speakWord, setSpeakWord] = useState(null)

  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async function getData(page, group) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    try {
      const responce = await fetch(url);
      const data = await responce.json();
      data.map((item) => {
        item['isGuessed'] = false;
        item['isNotGuessed'] = false;
      })
      setWords(data)
    } catch (e) {
      console.log(e.message)
    }
  }
  function checkWord(word) {
    if (word.toLowerCase() === words[gameWordNum].wordTranslate) {
      words[gameWordNum].isGuessed = true;
    } else {
      words[gameWordNum].isNotGuessed = true;
    }
  }
  function showPendingWord(i) {
    setActiveId(words[i].id)
    setActiveImg(words[i].image)
    setWordTranslate(words[i].wordTranslate)
  }
  function finishedGame() {
    console.log('ok')
  }
  useEffect(() => {
    if (gameWordNum < 20) {
      if (speakWord == null) {
      } else {
        checkWord(speakWord)
        setGameWordNum(gameWordNum + 1)
        showPendingWord(gameWordNum + 1)
      }
    }
  }, [speakWord])

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



  function startRecording() {
    // eslint-disable-next-line no-undef
    const recognizer = new webkitSpeechRecognition();

    // Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
    recognizer.interimResults = true;

    // Какой язык будем распознавать?
    recognizer.lang = 'ru-Ru';

    // Используем колбек для обработки результатов
    recognizer.onresult = function (event) {
      const result = event.results[event.resultIndex];
      if (result.isFinal) {
        console.log('Вы сказали: ' + result[0].transcript);
        setSpeakWord(result[0].transcript)
      } else {
        console.log('Промежуточный результат: ', result[0].transcript);
      }
    };
    recognizer.onend = function () {
      recognizer.start();
    }
    // Начинаем слушать микрофон и распознавать голос
    recognizer.start();
  }
  function startGame() {
    setIsGameMod(true)
    setActiveId(false)
    setWords(shuffle(words))
    showPendingWord(gameWordNum)
    startRecording()
  }
  function showWords() {
    console.log(words)
  }
  return (
    <div className='SpeakIt container'>
      <h1>Speak IT</h1>
      <button onClick={startGame}>начать игру</button>
      <button onClick={showWords}>показать слова</button>
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
