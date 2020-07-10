function setUniqueId() {
  return `_${Math.random().toString(36).substr(2, 9)}`;
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

function wordWithCanvasData(item, i, arr, offsets, width, numberOfSymbols, height, index) {
  const canvasWidth = Math.round((width / numberOfSymbols) * item.length);
  const res = createWord(item, i, arr, offsets, canvasWidth, height);

  if (i === arr.length - 1) {
    offsets.x = 0;
  } else {
    offsets.x += canvasWidth;
  }
  offsets.y = height * index;
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
  const transformed = wordsArr.map((item, i, arr) => {
    return wordWithCanvasData(item, i, arr, offsets, width, numberOfSymbols, height, index);
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
  const sliced = shuffled.slice(numOfMaxElements);
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
    this.fontSize = 18;
    this.image = image;
    this.xCoord = Math.round(this.width / 2);
    this.yCoord = Math.round((this.height - this.fontSize) / 2);
    this.colorRight = 'rgba(0, 209, 59, 0.54)';
    this.colorWrong = 'rgba(209, 35, 0, 0.54)';
  }

  updateCtx(canvas) {
    this.ctx = canvas.getContext('2d');
    this.ctx.canvas.height = this.height;
    this.ctx.canvas.width = this.width;
  }

  drawText() {
    this.ctx.font = `${this.fontSize}px Arial`;
    this.ctx.textBaseline = 'hanging';
    this.ctx.fillStyle = 'aqua';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${this.word}`, this.xCoord, this.yCoord);
  }

  drawImage() {
    this.ctx.drawImage(
      this.image, this.xOffset, this.yOffset, this.width, this.height, 0, 0, this.width, this.height
    );
  }

  drawUnmarked() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawImage();
    this.drawText();
  }

  drawWithoutImage() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawText();
  }

  drawMarked(state) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawImage();
    if (state) {
      this.markCanvas(this.colorRight)
    } else {
      this.markCanvas(this.colorWrong)
    }
    this.drawText();
  }

  markCanvas(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height)
  }
}
