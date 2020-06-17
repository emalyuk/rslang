import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Loading, Navbar } from 'components';
import routes from 'routes';
import './App.scss';

const Home = lazy(() => import('pages/home/Home'));
const Team = lazy(() => import('pages/team/Team'));
const Login = lazy(() => import('pages/auth/login/Login'));
const Registration = lazy(() => import('pages/auth/registration/Registration'));
const NotFound = lazy(() => import('pages/notFound/NotFound'));
const Promo = lazy(() => import('pages/promo/Promo'));

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <div className='content'>
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route path={routes.home} component={Home} exact />
            <Route path={routes.login} component={Login} exact />
            <Route path={routes.registration} component={Registration} exact />
            <Route path={routes.team} component={Team} exact />
            <Route path={routes.promo} component={Promo} exact />
            <Route component={NotFound} />
          </Switch>
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;
