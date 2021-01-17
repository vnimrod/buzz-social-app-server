import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProfileByUid } from '../../../store/actions/profile';
import About from '../About';
import Education from '../Education';
import Spinner from '../../../shared/UI/Spinner';
import Avatar from '../../../shared/UI/Avatar';
import './StaticProfile.css';

const StaticProfile = ({ getProfileByUid, staticProfile }) => {
  const uid = useParams().uid;

  useEffect(() => {
    getProfileByUid(uid);
  }, [uid]);

  console.log(staticProfile);
  return (
    <div className="StaticProfile">
      {staticProfile.staticProfile === null ||
      staticProfile.loading === true ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="StaticProfile__avatar">
            <Avatar
              buzzAvatar={staticProfile.staticProfile.avatar}
              defaultAvatar={false}
              width="145px"
              borderRadius="50%"
            />
            <span className="StaticProfile__avatar__name">
              {staticProfile.staticProfile.user.name
                .toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')}
            </span>
          </div>
          <div className="StaticProfile__about">
            <About
              profile={staticProfile.staticProfile}
              loading={staticProfile.loading}
            />
          </div>
          <div className="StaticProfile__education">
            {staticProfile.staticProfile &&
            staticProfile.staticProfile.education ? (
              <Education
                education={staticProfile.staticProfile.education}
                deleteNull={null}
              />
            ) : null}
          </div>
        </Fragment>
      )}
      {/*  */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  staticProfile: state.profile,
});

export default connect(mapStateToProps, { getProfileByUid })(StaticProfile);
