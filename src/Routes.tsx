import * as React from "react";
import { BrowserRouter as Router, Route, Redirect, RouteComponentProps, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Header from "./Header";
import ProductsPage from "./ProductsPage";
import ProductPage from "./ProductPage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";

// semua component di dalam project react akan dirender atau diload
// secara otomatis ketika user mengakses aplikasi atau project ini
// fungsi React.lazy digunakan untuk melakukan render atau load 
// sesuai keinginan user
// dibantu dengan class Suspense untuk menampilkan tampilan ketika loading
const AdminPage = React.lazy(() => import('./AdminPage'));

// atribute exact digunakan untuk hanya menggunakan hanya 
// tidak menampilkan component saat system mengakses child route
const Routes: React.SFC<RouteComponentProps> = props => {
  const [loggedIn, setLoggedIn] = React.useState(true);
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={props.location.key}
            timeout={500}
            classNames="animate" >
              <Switch>
                <Redirect exact={true} from="/" to="/products" />
                <Route path="/login" component={LoginPage} />
                <Route path="/admin">
                  {
                    loggedIn ? 
                      <React.Suspense fallback={<div className="page-container">Loading...</div>}>
                        <AdminPage /> 
                      </React.Suspense>
                      : 
                      <Redirect to="/login" />
                    }
                </Route>

                <Route exact={true} path="/products" component={ProductsPage} />
                <Route path="/products/:id" component={ProductPage} />
                <Route path="/admin" component={AdminPage} />
                <Route component={NotFoundPage} />
              </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
};

const RoutesWrap: React.SFC = () => {
    return (
      <Router>
        <Route component={Routes} />
      </Router>
    );
 };
  
  export default RoutesWrap;