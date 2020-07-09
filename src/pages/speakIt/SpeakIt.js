import React, {
  useEffect,
  useState,
} from 'react'
import Card from './components/card/Card'
import ViewBox from './components/viewBox/ViewBox'
import './SpeakIt.scss'

export const request = async (url, config = {}) => {
  try {
    const response = await fetch(url, config);
    return response.json()
  } catch (e) {
    console.log(e.message)
  }
}

const maxCountWord = 20
const activeInit = {
  id: false,
  img: '',
  wordTranslate: ''
}

const Team = () => {
  const audio = document.querySelector('audio')

  const [words, setWords] = useState([])
  const [active, setActive] = useState(activeInit)
  const [activeAudio, setActiveAudio] = useState('')
  const [isGameMod, setIsGameMod] = useState(false)
  const [gameWordNum, setGameWordNum] = useState(18)
  const [speakWord, setSpeakWord] = useState(null)

  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const getData = async (page, group) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;

    try {
      const data = await request(url)

      data.map((item) => {
        item.isGuessed = false;
        item.isNotGuessed = false;
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
    if (words && words[i] && Object.keys(words[i]).length > 0) {
      const newActive = { ...active }
      const { id, image, wordTranslate } = words[i]

      newActive.id = id
      newActive.img =image
      newActive.wordTranslate =wordTranslate

      setActive(newActive)
    }
  }
  function finishedGame() {
    console.log('ok')
  }
  useEffect(() => {
    if (speakWord !== null && gameWordNum < maxCountWord) {
      checkWord(speakWord)
      setGameWordNum(gameWordNum + 1)
    }
  }, [speakWord])

  useEffect(() => {
    showPendingWord(gameWordNum)

    if (gameWordNum === maxCountWord) {
      finishedGame()
    }
  }, [gameWordNum])

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
    setActive({
      ...active,
      id: false
    })
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
      <ViewBox activeImg={active.img} activeAudio={activeAudio} wordTranslate={active.wordTranslate} />
      {
        words.map((item) => (
          <Card
            {...item}
            key={item.id}
            active={active}
            setActive={setActive}
            setActiveAudio={setActiveAudio}
            audioPlayer={audio}
            isGameMod={isGameMod}
          />
        ))
      }
    </div >
  )
};

export default Team;
