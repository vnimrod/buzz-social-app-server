import React, { Fragment } from 'react';

import Spinner from '../../shared/UI/Spinner';
import './About.css';

const About = ({ profile }) => {
  return (
    <Fragment>
      {/* <div className="About__profile-intro">
        About
      </div> */}
      {profile !== null ? (
        <div className="About">
          <div></div>
          <div className="About__keys">
            <span>
              <strong>Birthday:</strong>
            </span>
            <span>
              <strong>Location:</strong>
            </span>
            <span>
              <strong>Gender:</strong>
            </span>
            <span>
              <strong>Relationship:</strong>{' '}
            </span>
            <span>
              <strong>High School:</strong>{' '}
            </span>
            <span>
              <strong>Mobile:</strong>
            </span>
            <span>
              <strong>About Me:</strong>{' '}
            </span>
          </div>
          <div className="About__values">
            <span>{profile.birthday}</span>
            <span>{profile.location}</span>
            <span>{profile.gender}</span>
            <span>{profile.relationshipStatus}</span>
            <span>{profile.highSchool}</span>
            <span>{profile.mobile}</span>
            <div className="About__values__about-me">
              <p>{profile.aboutMe}</p>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default About;
