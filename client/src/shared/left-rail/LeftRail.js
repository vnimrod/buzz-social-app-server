import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Avatar from '../UI/Avatar';
import NavigationItem from '../navigation/components/navigation-items/navigation-item/NavigationItem';
import {getProfile} from '../../store/actions/profile'
import './LeftRail.css';

const LeftRail = ({ profile, getProfile }) => {

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <aside className="LeftRail">
      <div className="LeftRail__userMenu">
        <Avatar
          avatar={profile && profile.avatar}
          defaultAvatar={
            profile === null || profile.avatar === null ? true : null
          }
          alt="Nimrod"
          height="100px"
          width="100px"
          borderRadius="30%"
        />
        <div className="LeftRail__userMenu__navigation">

        <NavigationItem link="/profile">
          <span style={{ fontSize: '25px' }} exact>
            {profile && profile.user.name.toLowerCase()
              .split(' ')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')}
          </span>
        </NavigationItem>
        <NavigationItem link="/messages" exact>
          Messages
        </NavigationItem>
        <NavigationItem link="/events">Events</NavigationItem>
        <NavigationItem link="/friends">Friends</NavigationItem>
        </div>
      </div>
    </aside>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps, {getProfile})(LeftRail);
