import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { map } from "lodash";
import { MainRoutes, AuthRoutes, AuthMainRoutes } from "./routes";
import LogoLoader from "components/Loader/LogoLoader";
import Navbar from 'components/Navbar/index';

const DashboardRoutes = ({ layout, store, _setVal }) => {
  const RoutesItems = store?.user ? store?.user?.first_name ? MainRoutes : AuthMainRoutes : AuthRoutes;
  return (
    <>
      {store?.user && <Navbar lang={store?.lang} user={store?.user} _setVal={_setVal} />}
      <Switch>
        {map(RoutesItems, (route, key) => {
          console.log(layout + route.path)
          return (
            <Route
              key={key}
              exact={route.exact ? true : false}
              path={layout + route.path}
              render={(props) => (
                <route.component
                  lang={store?.lang}
                  user={store?.user}
                  _setVal={_setVal}
                  fallback={<LogoLoader />}
                />
              )}
            />
          );
        })}
        <Redirect to={store?.user ? store?.user?.first_name ? "/dashboard" : "/dashboard/signin/info" : "/dashboard/signin"} />
      </Switch>
    </>
  );
};
export default DashboardRoutes;
