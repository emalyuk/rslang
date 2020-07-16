import { gallery } from '../../constants';
import { getStats, putStats } from '../../pages/home/HomeApi';

export function setUniqueId() {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

export function getImgData(group, page) {
  return gallery[page][group];
}

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createWord(item, index, a, offsets, width, height) {
  const { x: xOffset, y: yOffset } = offsets;
  const isFirst = index === 0;
  const isLast = index === a.length - 1;
  const position = index;
  const id = setUniqueId();
  const result = {
    draggable: true,
    id,
    isFirst,
    isLast,
    word: item,
    xOffset,
    yOffset,
    height,
    width,
    position,
  };
  return result
}

function wordWithCanvasData(
  item, i, arr, offsets, width, numberOfSymbols, height, index, wordsNum,
) {
  const offsetsObj = offsets;
  const extraWidth = 20;
  const spaceForSymbols = width - extraWidth * wordsNum;
  const canvasWidth = Math.round((spaceForSymbols / numberOfSymbols) * item.length + extraWidth);
  const res = createWord(item, i, arr, offsetsObj, canvasWidth, height);

  if (i === arr.length - 1) {
    offsetsObj.x = 0;
  } else {
    offsetsObj.x += canvasWidth;
  }
  offsetsObj.y = height * index;
  return res;
}

function processItem(objItem, width, height, index) {
  const {
    audioExample, id, textExample, textExampleTranslate, word, wordsPerExampleSentence,
  } = objItem;
  const offsets = {
    x: 0,
    y: height * index,
  };
  const example = textExample.replace(/(<\/*b>)/g, '');
  const wordsArr = example.split(' ');
  const numberOfSymbols = wordsArr.reduce((acc, wordItem) => acc + wordItem.length, 0);
  const numberOfWords = wordsArr.length;
  const transformed = wordsArr.map((item, i, arr) => {
    return wordWithCanvasData(
      item, i, arr, offsets, width, numberOfSymbols, height, index, numberOfWords,
    );
  });
  const shuffled = shuffle(transformed);
  return {
    isRightPos: null,
    wordsArr,
    audioExample,
    id,
    example,
    shuffled,
    textExampleTranslate,
    word,
    wordsPerExampleSentence,
    numberOfSymbols,
  }
}

export function transform(arr, width, height) {
  const numOfMaxElements = 10;
  const filtered = arr.filter((item) => item.wordsPerExampleSentence <= 10);
  const shuffled = shuffle(filtered);
  const sliced = shuffled.slice(0, numOfMaxElements);
  const res = sliced.map((wordItem, index) => processItem(wordItem, width, height, index));
  return res;
}

export function createRows(arr) {
  return arr.map((item, index) => {
    const { wordsArr } = item;
    const isVisible = index === 0;
    const isCurrent = index === 0;
    const number = index + 1;
    return {
      wordsArr,
      number,
      isVisible,
      isGuessed: false,
      isCurrent,
      isUseHint: false,
      sentence: [],
    }
  })
}

export function createArrWithElems(arrLength) {
  const arr = new Array(arrLength).fill(true);
  return arr.map((item, ind) => ind);
}

export function resizeImage(image, width, height) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL('image/png')
}

export class CanvasApi {
  constructor(image, dataObj) {
    Object.assign(this, dataObj)
    this.fontSize = 16;
    this.image = image;
    this.yCoord = Math.round((this.height - this.fontSize) / 2);
    this.colorRight = 'rgba(0, 209, 59, 0.54)';
    this.colorWrong = 'rgba(209, 35, 0, 0.54)';
    this.strokeStyle = 'rgb(0,255,250)';
    this.widthOfLine = 3;
    this.radius = 8;
    this.middleY = this.height / 2;
  }

  updateCtx(canvas) {
    this.ctx = canvas.getContext('2d');
    if (this.isFirst) {
      this.ctx.canvas.width = this.width;
    } else {
      this.ctx.canvas.width = this.width + this.radius;
    }
    this.ctx.canvas.height = this.height;
  }

  drawText() {
    this.ctx.font = `${this.fontSize}px verdana`;
    this.ctx.fillText(`${this.word}`, 0, -100);
    const physicalTextSize = this.ctx.measureText(this.word).width
    this.ctx.textBaseline = 'hanging';
    this.ctx.fillStyle = this.strokeStyle;
    const xCoord = (this.width - physicalTextSize) / 2;
    this.ctx.shadowColor = 'black';
    this.ctx.shadowOffsetX = 1;
    this.ctx.shadowOffsetY = 1;
    this.ctx.shadowBlur = 1;
    this.ctx.fillText(`${this.word}`, xCoord, this.yCoord);
  }

  drawFirstPuzzle() {
    this.ctx.lineTo(this.width - this.radius, 0);
    this.ctx.arc(
      this.width - this.radius, this.middleY, this.radius, Math.PI * 1.5, Math.PI * 0.5, false
    );
    this.ctx.lineTo(this.width - this.radius, this.height);
    this.ctx.lineTo(0, this.height);
  }

  drawLastPuzzle() {
    this.ctx.lineTo(this.width + this.radius, 0);
    this.ctx.lineTo(this.width + this.radius, this.height);
    this.ctx.lineTo(0, this.height);
    this.ctx.arc(0, this.middleY, this.radius, Math.PI * 0.5, Math.PI * 1.5, true);
  }

  drawMiddlePuzzle() {
    this.ctx.lineTo(this.width, 0);
    this.ctx.arc(this.width, this.middleY, this.radius, Math.PI * 1.5, Math.PI * 0.5, false);
    this.ctx.lineTo(this.width, this.height);
    this.ctx.lineTo(0, this.height);
    this.ctx.arc(0, this.middleY, this.radius, Math.PI * 0.5, Math.PI * 1.5, true);
  }

  draw() {
    this.ctx.lineWidth = this.widthOfLine;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);

    if (this.isFirst) this.drawFirstPuzzle();
    if (this.isLast) this.drawLastPuzzle();
    if (!this.isFirst && !this.isLast) this.drawMiddlePuzzle();

    this.ctx.lineTo(0, 0);
    this.ctx.clip();

    if (!this.isFirst) {
      try {
        this.ctx.drawImage(
          this.image, this.xOffset - this.radius, this.yOffset, this.width + this.radius,
          this.height, 0, 0, this.width + this.radius, this.height
        );
      } catch (err) {
        console.log(err)
      }
    }
    if (this.isFirst) {
      try {
        this.ctx.drawImage(
          this.image, this.xOffset, this.yOffset, this.width, this.height, 0, 0,
          this.width, this.height,
        );
      } catch (err) {
        console.log(err)
      }
    }

    this.ctx.globalCompositeOperation = 'destination-put';
    this.ctx.stroke()
  }

  drawUnmarked() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.draw();
    this.drawText();
  }

  drawMarked(state) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.draw();
    if (state) {
      this.markCanvas(this.colorRight)
    } else {
      this.markCanvas(this.colorWrong)
    }
    this.drawText();
  }

  markCanvas(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width + this.radius, this.height)
  }
}

export function setLocalStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorage(key) {
  const item = window.localStorage.getItem(key)
  const result = JSON.parse(item);
  return result;
}

export const postStat = async (st) => {
  const guessed = st.rows.filter((obj) => obj.isGuessed)
  const notGuessed = st.rows.filter((obj) => !obj.isGuessed)
  const stats = await getStats();

  const currentGameStats = {
    date: new Date().toLocaleDateString(),
    right: guessed.length,
    wrong: notGuessed.length,
  };

  let newStats;

  if (stats.optional.englishpuzzle.statistics.length) {
    newStats = {
      ...stats,
      optional: {
        ...stats.optional,
        englishpuzzle: {
          statistics: [...stats.optional.englishpuzzle.statistics, currentGameStats],
        },
      },
    }
  } else {
    newStats = {
      ...stats,
      optional: {
        ...stats.optional,
        englishpuzzle: {
          statistics: [currentGameStats],
        },
      },
    };
  }
  putStats(newStats);
};

export function setLocalStorageStat(value) {
  const stat = window.localStorage.getItem('englishPuzzleStat')
  const { page, group, rows } = value;
  const round = `${group + 1}/${page + 1}`;
  const guessed = rows.filter((obj) => obj.isGuessed);
  const notGuessed = rows.filter((obj) => !obj.isGuessed);
  const date = new Date().toLocaleDateString();
  const newItem = { date, round, guessed: guessed.length, notGuessed: notGuessed.length };
  let newStat
  if (stat) {
    const parsed = JSON.parse(stat);
    newStat = [...parsed, newItem];
  } else {
    newStat = [newItem];
  }
  window.localStorage.setItem('englishPuzzleStat', JSON.stringify(newStat))
}

export function getLocalStorageStat() {
  return JSON.parse(window.localStorage.getItem('englishPuzzleStat'));
}
