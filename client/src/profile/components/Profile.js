import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Avatar from '../../shared/UI/Avatar';
import Button from '../../shared/form-elements/Button';
import Spinner from '../../shared/UI/Spinner';
import About from './About';
import Education from './Education';

import { getProfile, deleteProfile } from '../../store/actions/profile';

import './Profile.css';

const Profile = ({
  getProfile,
  deleteProfile,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfile();
  }, []);

  // Wating for the profile data to be loaded from the server with spinner
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="Profile">
      <div className="Profile__head">
        <Avatar
          avatar={profile && profile.avatar}
          defaultAvatar= {profile === null || profile.avatar ===null ? true : null}
          width="100px"
          height="100px"
          borderRadius="50%"
        />
        <span className="Profile__user-name">
          {auth.user &&
            auth.user.name //capitalize each first letter
              .toLowerCase()
              .split(' ')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')}{' '}
        </span>
      </div>

      {profile !== null ? (
        <div className="Profile__intro">
          <div className="Profile__profile-intro">
            <div className="Profile__profile-intro__about">
              <div className="Profile__profile-intro__about__head">
                <div className="About__profile-intro">About</div>
                <Button button="button" to="/my-profile" exact>
                  Edit Profile{' '}
                </Button>
              </div>
              <About profile={profile} />
            </div>

            <div className="Profile__profile-intro__about">
              <div className="Profile__profile-intro__about__head">
                <div className="About__profile-intro">Education</div>
                <Button button="button" to="/add-education" exact>
                  Add Education
                </Button>
              </div>
              {
                profile.education.length > 0 ? <Education education={profile.education} /> : <span style={{color:"red", fontWeight:"bold"}}>*You have not set your education yet</span>
              }
              
            </div>
            <div className="Profile__profile-intro__delete-my-account">
              <Button onClick={deleteProfile} type="button">
                Delete My Account
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="Profile__create-profile-button">
              <Button button="button" to="/my-profile" exact>
                Create Profile
              </Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile, deleteProfile })(Profile);
