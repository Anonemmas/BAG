import React, { lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import * as ROUTES from "./constants/routes"
import {UserContextProvider} from "./context/userContext"
import useAuthListener from './hooks/use-auth-listener';
import ProtectedRoute from './helpers/protected-route';

const Dashboard = lazy(() => import ('./pages/dashboard'));
const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/signup'));
const Country = lazy(() => import ('./pages/country'));
const NotFound = lazy(() => import ('./pages/notfound'));
const ToVisit = lazy(() => import ('./pages/tovisit'));
const Visited = lazy(() => import ('./pages/visited'));

function App() {
  const {user} = useAuthListener()
  return (
    <UserContextProvider>
      <div className="App">
        <Router>
          <Suspense fallback={
            <div className="loading">
              <span>Loading...</span>
            </div>
          }>
            <Switch>
              <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                <Dashboard />
              </ProtectedRoute>

              <ProtectedRoute user={user} path={ROUTES.COUNTRY} exact>
                <Country />
              </ProtectedRoute>

              <Route path={ROUTES.LOGIN}>
                <Login />
              </Route>

              <Route path={ROUTES.SIGNUP}>
                <SignUp />
              </Route>

              <ProtectedRoute user={user} path={ROUTES.TOVISIT}>
                <ToVisit />
              </ProtectedRoute>

              <ProtectedRoute user={user} path={ROUTES.VISITED}>
                <Visited />
              </ProtectedRoute>

              <Route>
                <NotFound />
              </Route>

            </Switch>
          </Suspense>
        </Router>
      </div>
    </UserContextProvider>
  );
  
}

export default App;
