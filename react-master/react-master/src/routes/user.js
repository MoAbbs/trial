import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { map } from "lodash";
import { WebsiteRoutes } from "./routes";
import LogoLoader from "components/Loader/LogoLoader";

const UserdRoutes = ({ layout, store, _setVal }) => {
    return (
        <Switch>
            {map(WebsiteRoutes, (route, key) => {
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
        </Switch>
    );
};
export default UserdRoutes;
