import { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import AuthRoute from './shared/utils/auth-route/AuthRoute';
import Layout from './hoc/layout/Layout';
import MainPage from './pages/MainPage';
import Login from './auth/Login';
import Register from './auth/Register';
import Error from './hoc/layout/error/Error';
import Success from './hoc/layout/success/Success';
import MyProfile from './profile/components/profileFormElm/MyProfile';
import AddEducation from './profile/components/profileFormElm/AddEducation';
import Profile from './profile/components/Profile';
import StaticProfile from './profile/components/staticProfile/StaticProfile'
import LandingPage from './pages/LandingPage'
import UnderConstruction from './pages/UnderConstruction'

// helpers
import authContext from './shared/utils/helpers/authContext';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';
import { authStart } from './store/actions/auth';

if (localStorage.token) {
  authContext(localStorage.token);
}

const App = () => {
  useEffect(() => {
    //for send a token with every user request on the app and check is validity
    store.dispatch(authStart());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Error />
          <Success />
          <Layout>
            <Route exact path="/">
              <LandingPage/>
            </Route>
            <Switch>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/register" exact>
                <Register />
              </Route>
              <Route path="/user/:uid" exact>
                <StaticProfile />
              </Route>
              <AuthRoute path="/buzzings" exact component={MainPage} />
              <AuthRoute path="/profile" exact component={Profile} />
              <AuthRoute path="/my-profile" exact component={MyProfile} />
              <AuthRoute path="/add-education" exact component={AddEducation} />
              <AuthRoute path="/notifications" exact component={UnderConstruction}/>
              <AuthRoute path="/messenger" exact component={UnderConstruction}/>
              <AuthRoute path="/friendsRequests" exact component={UnderConstruction}/>
              <AuthRoute path="/events" exact component={UnderConstruction}/>
              <AuthRoute path="/friends" exact component={UnderConstruction}/>
            {/* // <Redirect to="/" /> */}
            </Switch>
          </Layout>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
