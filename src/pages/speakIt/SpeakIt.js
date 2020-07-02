import React, { useState, useEffect } from 'react';
import './SpeakIt.scss';
import Card from './components/card/Card'

const Team = () => {
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeId, setActiveId] = useState(false)
  const [activeImg, setActiveImg] = useState('files/01_0009.jpg')
  const [activeAudio, setActiveAudio] = useState('')
  const [wordNum, setWordNum] = useState(0)
  const input = document.querySelector('textarea')

  async function getData() {
    const url = 'https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0';
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
    setLoading(true);
    await getData();
    setLoading(false)
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

  function playWord(id, img, audio) {
    setActiveId(id)
    setActiveImg(img)
    setActiveAudio(audio)
  }
  function startGame() {
    setWordNum(0)
    setWords(shuffle(words))
    const currentWord = words[wordNum]
    console.log(words)
    // playWord(currentWord.id, currentWord.image, currentWord.audio)
    startRec()
  }
  function startRec() {
    // eslint-disable-next-line no-var
    // eslint-disable-next-line no-undef
    const recognizer = new webkitSpeechRecognition()
    recognizer.lang = 'en-En';
    recognizer.interimResults = true
    recognizer.interimResults = true;
    recognizer.start()
    recognizer.onresult = function (e) {
      const result = e.results[e.resultIndex];
      if (result.isFinal) {
        input.value = result[0].transcript;
        checkWords(result[0].transcript)
      } else {
        console.log('Промежуточный результат: ', result[0].transcript);
      }
    }
  }
  function checkWords(word) {
    for (let i = 0; i < words.length; i++) {
      if (words[i].word === word) {
        setActiveId(words[i].id)
      }
    }
    console.log(word)
  }
  function nextWord() {
    setWordNum(wordNum + 1)
    const currentWord = words[wordNum]
    playWord(currentWord.id, currentWord.image, currentWord.audio)
    console.log(wordNum, currentWord)
  }

  return (
    <div className='main container'>
      <h1>Speak IT</h1>
      <button className='btnStart' onClick={startGame}>начать игру</button>
      <button onClick={nextWord}>next word</button>
      <textarea />
      {
        loading ? (<h1>загрузка</h1>)
          : (
            words.map((item) => (
              <Card
                {...item}
                key={item.id}
                activeId={activeId}
                setActiveId={setActiveId}
                setActiveImg={setActiveImg}
                setActiveAudio={setActiveAudio}
              />
            ))
          )
      }
      <img src={`https://raw.githubusercontent.com/aleksey-drozdov/rslang-data/master/${activeImg}`} atl='img' />
      {
        activeAudio === '' ? '' : <audio src={`https://raw.githubusercontent.com/aleksey-drozdov/rslang-data/master/${activeAudio}`} autoPlay />
      }
    </div>
  )
};

export default Team;
