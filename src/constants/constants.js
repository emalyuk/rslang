import ROUTS from '../routes';

const imgPath = '/img/';
const githubUserLink = 'https://github.com/';
const userLoginDataKey = 'JWT';
const rsSchoolLink = 'https://rs.school/';

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
  imgPath, githubUserLink, navOptions, navOptionsUnLoginUser, userLoginDataKey, rsSchoolLink,
};
