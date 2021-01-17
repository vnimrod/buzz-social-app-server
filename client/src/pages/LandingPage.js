import React from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';

import buzzLanding from '../assets/Buzz__landing.JPG';
import Button from '../shared/form-elements/Button'
import './LandingPage.css';

const LandingPage = ({isAuth}) => {

  if(isAuth) {
    return <Redirect to='/buzzings'/>
  }
  return (
    <div className="LandingPage">
      <div className="LandingPage__intro">
        <div className="LandingPage__intro__about">
          <span className="LandingPage__intro__about__opening-sentence">
            "By waving wings, a bee produces a buzz.
          </span>
          <span className="LandingPage__intro__about__opening-sentence">
            Dozens of bees are already capable of making noise..."
          </span>
          <div className="LandingPage__intro__about__title">
            <span className="LandingPage__intro__about__title__welcome">
              Welcome To Buzz
            </span>
            <span className="LandingPage__intro__about__title__welcome-footer">A social network where you can share your's buzz</span>
          </div>
          <div className="LandingPage__intro__about__join-button">
            <span>Join Buzz Today!</span>
            <Button button="button" to="/register">Register</Button>
            <Button button="button" to="/login">Login</Button>
          </div>
        </div>
        <div className="LandingPage__buzz-landing">
          <img src={buzzLanding} />
        </div>
      </div>
      <footer>This site was created by Nimrod Weinstein</footer>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(LandingPage);
