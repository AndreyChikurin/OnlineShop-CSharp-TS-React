import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context } from '../index';
import { authRoutes, publicRoutes } from 'src/routes';
import { SHOP_ROUTE } from 'src/utils/consts';

const AppRouter = () => {
  const { user } = useContext(Context);

  return (
    <Switch>
      <Route path="watch/:id"></Route>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => <Route key={path} path={path} component={Component} exact />)}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
