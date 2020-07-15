import ROUTS from '../routes';

const imgPath = '/img/';
const usersPath = '/users/';
const statsPath = '/statistics';
const settingsPath = '/settings';
const githubUserLink = 'https://github.com/';
const userLoginDataKey = 'JWT';
const userSettingsKey = 'settings';
const rsSchoolLink = 'https://rs.school/';

const wordsCountTotal = 3600;
const countCardsPerDayStep = 10;
const numberOfOption = 10;
const responseStatusNotFound = 404;
const responseStatusInvalidToken = 401;

const navOptions = [
  { route: ROUTS.home, title: 'Home' },
  { route: ROUTS.game, title: 'Game' },
  { route: ROUTS.promo, title: 'Promo' },
  { route: ROUTS.team, title: 'Team' },
  { route: ROUTS.statistic, title: 'Statistics' },
  { route: ROUTS.dictionary, title: 'Dictionary' },
];

const navOptionsUnLoginUser = [
  { route: ROUTS.login, title: 'Login' },
  { route: ROUTS.registration, title: 'Registration' },
  { route: ROUTS.game, title: 'Game' },
  { route: ROUTS.promo, title: 'Promo' },
  { route: ROUTS.team, title: 'Team' },
];

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
  settingsPath,
};
