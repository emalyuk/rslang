const playAudio = (link, src) => {
  const audio = new Audio(`${link}${src}`).play();
};

export default playAudio;
