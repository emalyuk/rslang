import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Loading, Header, Footer } from '../../components';

import PrivateRoute from './PrivateRoute';
import routes from '../../routes';

import './App.scss';

const Game = lazy(() => import('pages/game/Game'));
const Savanna = lazy(() => import('../../games/savanna/Savanna'));
const Home = lazy(() => import('pages/home/Home'));
const Cards = lazy(() => import('pages/cards/Cards'));
const Team = lazy(() => import('pages/team/Team'));
const Login = lazy(() => import('pages/auth/login/Login'));
const Registration = lazy(() => import('pages/auth/registration/Registration'));
const NotFound = lazy(() => import('pages/notFound/NotFound'));
const Promo = lazy(() => import('pages/promo/Promo'));
const Games = lazy(() => import('pages/game/Game'));
const Dictionary = lazy(() => import('pages/dictionary/Dictionary'));

const App = () => {
  return (
    <div className='app'>
      <Header />
      <div className='content'>
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route path={routes.login} component={Login} exact />
            <Route path={routes.game} component={Game} exact />
            <Route path={routes.registration} component={Registration} exact />
            <Route path={routes.game} component={Games} exact />
            <Route path={routes.games.savanna} component={Savanna} exact />
            <PrivateRoute path={routes.team} component={Team} exact />
            <PrivateRoute path={routes.home} component={Home} exact />
            <PrivateRoute path={routes.cards} component={Cards} exact />
            <PrivateRoute path={routes.promo} component={Promo} exact />

            <Route path={routes.dictionary} component={Dictionary} exact />
            <Route component={NotFound} />
          </Switch>
        </React.Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default App;
