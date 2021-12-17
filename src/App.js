import React, { lazy, Suspense, useEffect} from 'react';
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

  useEffect(() => {
    if(localStorage.getItem('Theme') === 'light_Mode'){
        document.body.classList.add('light_Mode')
    }
    else if(localStorage.getItem('Theme') === 'dark_Mode'){
        document.body.classList.add('dark_Mode')
    }
}, [])
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

              <Route path={ROUTES.COUNTRY} exact>
                <Country />
              </Route>

              <Route path={ROUTES.LOGIN}>
                <Login />
              </Route>

              <Route path={ROUTES.SIGNUP}>
                <SignUp />
              </Route>

              <Route path={ROUTES.TOVISIT}>
                <ToVisit />
              </Route>

              <Route path={ROUTES.VISITED}>
                <Visited />
              </Route>

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
