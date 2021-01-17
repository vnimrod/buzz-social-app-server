import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../../shared/form-elements/Input';
import Button from '../../../shared/form-elements/Button';
import Avatar from '../../../shared/UI/Avatar';
import UploadAvatar from '../../../shared/form-elements/AvatarUpload';
import {
  createProfile,
  getProfile,
  updateProfile,
} from '../../../store/actions/profile';
import './MyProfile.css';

// * comments: add spineer when refresh on add/create profile page
const MyProfile = ({
  createProfile,
  getProfile,
  updateProfile,
  history,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfile();
    profile &&
      !loading &&
      setFormData({
        birthday: profile.birthday,
        relationshipStatus: profile.relationshipStatus,
        gender: profile.gender,
        highSchool: profile.highSchool,
        location: profile.location,
        mobile: profile.mobile,
        aboutMe: profile.aboutMe,
      });
  }, [loading]);

  const [formData, setFormData] = useState({
    birthday: '',
    relationshipStatus: '',
    gender: '',
    highSchool: '',
    location: '',
    mobile: '',
    aboutMe: '',
  });

  const {
    birthday,
    relationshipStatus,
    gender,
    highSchool,
    location,
    mobile,
    aboutMe,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  const onClick = (e) => {
    e.preventDefault();
    updateProfile(formData, history, true);
  };

  return (
    <form className="MyProfile" onSubmit={(e) => onSubmit(e)}>
      <span className="MyProfile__edit-span">Edit Your Profile</span>
      <div className="MyProfile__input">
        <small>Birthday</small>
        <Input
          id="birthday"
          element="input"
          type="date"
          value={birthday}
          onChange={onChange}
          placeholder="Birthday"
        />
        <small>Location</small>
        <Input
          id="location"
          element="input"
          type="text"
          value={location}
          onChange={onChange}
          placeholder="Location"
        />
        <small>Gender</small>
        <Input
          id="gender"
          element="input"
          type="text"
          value={gender}
          onChange={onChange}
          placeholder="Gender"
        />
        <small>Relationship Status</small>
        <Input
          id="relationshipStatus"
          element="input"
          type="text"
          value={relationshipStatus}
          onChange={onChange}
          placeholder="Relationship Status"
        />

        <small>High School</small>
        <Input
          id="highSchool"
          element="input"
          type="text"
          value={highSchool}
          onChange={onChange}
          placeholder="High School"
        />

        <small>Mobile</small>
        <Input
          id="mobile"
          element="input"
          type="text"
          value={mobile}
          onChange={onChange}
          placeholder="Mobile"
        />
        <small>About Me</small>
        <div className="MyProfile__input__about-me">
          <Input
            id="aboutMe"
            element="textarea"
            type="text"
            value={aboutMe}
            onChange={onChange}
            placeholder="About Me"
          />
        </div>
        <div className="MyProfile__input__upload-avatar">
          <small>Upload Profile Image:</small>
          {profile !== null ? (
            <Fragment>
              {profile.avatar === null ? (
                <UploadAvatar />
              ) : (
                <Fragment>
                  <Avatar
                    avatar={profile && profile.avatar}
                    defaultAvatar={
                      profile === null || profile.avatar === null ? true : null
                    }
                    width="150px"
                    height="150px"
                    borderRadius="50%"
                  />
                  <UploadAvatar />
                </Fragment>
              )}
            </Fragment>
          ) : (
            <span className="AvatarUpload__upload-msg">
              *Please create profile before you can upload your image
            </span>
          )}
        </div>
        <div className="MyProfile__input__bottom-buttons">
          {profile !== null ? (
            <Button type="button" onClick={onClick}>
              Update Profile
            </Button>
          ) : (
            <Button type="submit">Create Profile</Button>
          )}
          <Button button="button" to="/profile">
            Back to Profile
          </Button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProfile,
  getProfile,
  updateProfile,
})(withRouter(MyProfile));
