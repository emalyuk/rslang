import { baseAssetsUrl } from 'constants/constants';

const playAudioArr = (
  audio,
  audioMeaning,
  audioExample,
  isShowWordMeaning,
  isShowWordExample,
  callBack,
) => {
  const audioArr = [`${baseAssetsUrl}${audio}`];

  if (isShowWordMeaning) {
    audioArr.push(`${baseAssetsUrl}${audioMeaning}`);
  }

  if (isShowWordExample) {
    audioArr.push(`${baseAssetsUrl}${audioExample}`);
  }

  const playAudio = (audioArray) => {
    const sound = new Audio();
    let index = 1;

    [sound.src] = audioArr;
    sound.play();

    sound.onended = () => {
      if (index < audioArray.length) {
        sound.src = audioArray[index];
        sound.play();
        index += 1;
      } else {
        callBack();
        return false;
      }
    };
  };

  playAudio(audioArr);
};

export { playAudioArr };
