import ROUTS from '../routes';

const imgPath = '/img/';
const usersPath = '/users/';
const wordsPath = '/words/';
const statsPath = '/statistics';
const settingsPath = '/settings';
const groupPath = 'page=';
const wordsPathEnding = '/words';
const wordsPerExampleSentencePath = '&wordsPerExampleSentenceLTE=20';
const wordsPerPagePath = '&wordsPerPage=600';
const githubUserLink = 'https://github.com/';
const userLoginDataKey = 'JWT';
const userSettingsKey = 'settings';
const userStatsKey = 'stats';
const baseAssetsUrl =
  'https://raw.githubusercontent.com/abukato/LearnWords/master/';
const baseWordsUrl = '/words?';
const rsSchoolLink = 'https://rs.school/';

const wordsCountTotal = 3600;
const wordsInGroup = 600;
const countCardsPerDayStep = 10;
const numberOfOption = 10;
const responseStatusNotFound = 404;
const responseStatusInvalidToken = 401;

const sentenceRegExpWithChar = /<.*?>(.+)<.*?>(.)/;
const sentenceRegExp = /<.*?>(.+)<.*?>/;

const navOptions = [
  { route: ROUTS.promo, title: 'Promo' },
  { route: ROUTS.home, title: 'Home' },
  { route: ROUTS.game, title: 'Games' },
  { route: ROUTS.team, title: 'Team' },
  { route: ROUTS.statistic, title: 'Statistics' },
  { route: ROUTS.dictionary, title: 'Dictionary' },
];

const navOptionsUnLoginUser = [
  { route: ROUTS.login, title: 'Login' },
  { route: ROUTS.registration, title: 'Registration' },
  { route: ROUTS.game, title: 'Games' },
  { route: ROUTS.promo, title: 'Promo' },
  { route: ROUTS.team, title: 'Team' },
];

const CORRECT_WORD_CHANCE = 50; // in %
const GUESS_FROM_QUANTITY = 100 / CORRECT_WORD_CHANCE;

const convertMsToSeconds = (ms) => (ms / 1000).toFixed(0);
const initialTime = 60 * 1000;
const interval = 1000;

export {
  imgPath,
  githubUserLink,
  navOptions,
  navOptionsUnLoginUser,
  userLoginDataKey,
  rsSchoolLink,
  wordsCountTotal,
  countCardsPerDayStep,
  numberOfOption,
  responseStatusNotFound,
  responseStatusInvalidToken,
  userSettingsKey,
  usersPath,
  statsPath,
  wordsPath,
  settingsPath,
  CORRECT_WORD_CHANCE,
  GUESS_FROM_QUANTITY,
  convertMsToSeconds,
  initialTime,
  interval,
  baseWordsUrl,
  baseAssetsUrl,
  sentenceRegExp,
  sentenceRegExpWithChar,
  userStatsKey,
  groupPath,
  wordsPerExampleSentencePath,
  wordsPerPagePath,
  wordsInGroup,
  wordsPathEnding,
};
