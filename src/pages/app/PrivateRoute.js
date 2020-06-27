import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import ROUTES from '../../routes';
import { userLoginDataKey } from '../../constants/constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = Boolean(global.localStorage.getItem(userLoginDataKey));

  return (
    <Route
      {...rest}
      render={(props) => ((auth === false)
        ? <Redirect to={ROUTES.login} />
        : <Component {...props} />
      )}
    />
  );
};

export default PrivateRoute;
