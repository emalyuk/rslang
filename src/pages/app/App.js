import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Loading, Header } from '../../components';
import routes from '../../routes';
import './App.scss';

const Home = lazy(() => import('../../pages/home/Home'));
const Login = lazy(() => import('../../pages/auth/login/Login'));
const Registration = lazy(() => import('../../pages/auth/registration/Registration'));
const Team = lazy(() => import('../../pages/team/Team'));
//TODO: add forgot password
const NotFound = lazy(() => import('../../pages/notFound/NotFound'));

const App = () => {
  return (
    <div className='app'>
      <Header />
      <div className='content'>
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route path={routes.home} component={Home} exact />
            <Route path={routes.login} component={Login} exact />
            <Route path={routes.registration} component={Registration} exact />
            <Route path={routes.team} component={Team} exact />
            <Route component={NotFound} />
          </Switch>
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;
