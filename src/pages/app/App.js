/* eslint-disable no-multi-spaces */
import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Loading, Header, Footer } from '../../components';

import PrivateRoute from './PrivateRoute';
import routes from '../../routes';

import './App.scss';

const Registration = lazy(() => import('pages/auth/registration/Registration'));
const Login = lazy(() => import('pages/auth/login/Login'));
const Home = lazy(() => import('pages/home/Home'));
const Team = lazy(() => import('pages/team/Team'));
const Promo = lazy(() => import('pages/promo/Promo'));
const Dictionary = lazy(() => import('pages/dictionary/Dictionary'));
const Statistic = lazy(() => import('pages/statistic/Statistic'));

const Games = lazy(() => import('pages/game/Game'));
const Savanna = lazy(() => import('../../games/savanna/Savanna'));
const SpeakIt = lazy(() => import('../../games/speakIt/SpeakIt'));
const Sprint = lazy(() => import('../../games/sprint'));

const NotFound = lazy(() => import('pages/notFound/NotFound'));

const App = () => {
  return (
    <div className='app'>
      <Header />
      <div className='content'>
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route path={routes.login} component={Login} exact />
            <Route path={routes.registration} component={Registration} exact />
            <Route path={routes.team} component={Team} exact />
            <Route path={routes.promo} component={Promo} exact />
            <Route path={routes.game} component={Games} exact />
            <Route path={routes.games.savanna} component={Savanna} exact />
            <Route path={routes.games.spealIt} component={SpeakIt} exact />
            <Route path={routes.games.sprint} component={Sprint} exact />
            <PrivateRoute path={routes.statistic} component={Statistic} exact />
            <PrivateRoute path={routes.home} component={Home} exact />
            <PrivateRoute path={routes.dictionary} component={Dictionary} exact />
            <Route component={NotFound} />
          </Switch>
        </React.Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default App;
