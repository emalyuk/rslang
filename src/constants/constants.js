import ROUTS from '../routes';

const imgPath = '/img/';
const githubUserLink = 'https://github.com/';
const userLoginDataKey = 'JWT';
const userSettingsDataKey = 'settings';
const rsSchoolLink = 'https://rs.school/';

const wordsCountTotal = 3600;
const maxLimitCardsPerDay = 50;
const minLimitCardsPerDay = 10;
const minLimitNewCardsPerDay = 0;
const responseStatusNotFound = 404;
const responseStatusInvalidToken = 401;

const navOptions = [
  { route: ROUTS.home, title: 'Home' },
  { route: ROUTS.game, title: 'Game' },
  { route: ROUTS.promo, title: 'Promo' },
  { route: ROUTS.team, title: 'Team' },
];

const navOptionsUnLoginUser = [
  { route: ROUTS.login, title: 'Login' },
  { route: ROUTS.registration, title: 'Registration' },
];

export {
  imgPath, githubUserLink, navOptions,
  navOptionsUnLoginUser, userLoginDataKey,
  rsSchoolLink, wordsCountTotal,
  maxLimitCardsPerDay,
  minLimitCardsPerDay,
  minLimitNewCardsPerDay,
  responseStatusNotFound,
  responseStatusInvalidToken,
  userSettingsDataKey,
};
