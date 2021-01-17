import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { logout } from '../../../../store/actions/auth';

import NavigationItem from './navigation-item/NavigationItem';
import BuzzLogo from '../../../buzz-logo/Logo';
import notificationsIcon from '../../../../assets/notifications__icon.PNG';
import newFriendReqIcon from '../../../../assets/friendReq__icon.PNG';
import messengerIcon from '../../../../assets/messenger__icon.PNG';
import Button from '../../../form-elements/Button'
import './NavigationItems.css';

const NavigationItems = (props) => (
  <div className="NavigationItems">
    {!props.loading && props.isAuth ?  
    
    <ul className="NavigationItems left">
      <BuzzLogo />
      <NavigationItem
        link="/notifications"
        icon={notificationsIcon}
        type="icon"
        alt="notificationsIcon"
        sideDrawer={props.sideDrawer}
      >
        Notifications
      </NavigationItem>

      <NavigationItem
        link="/messenger"
        icon={messengerIcon}
        type="icon"
        alt="messengerIcon"
        sideDrawer={props.sideDrawer}
      >
        Messenger
      </NavigationItem>

      <NavigationItem
        link="/friendsRequests"
        icon={newFriendReqIcon}
        type="icon"
        alt="newFriendReqIcon"
        sideDrawer={props.sideDrawer}
      >
        Requests
      </NavigationItem>

      {/* {props.sideDrawer ? null : <NavigationItem type="search" />} */}
    </ul> : null
  }

    <ul className="NavigationItems right">
      {!props.loading && props.isAuth ? (
        <Fragment>
          <NavigationItem link="/profile">Profile</NavigationItem>
          <Button to='/login' onClick={props.logout}>Logout</Button>
        </Fragment>
      ) : (
        <div className="NavigationItems_not-auth-user">
          <NavigationItem link="/register">Register</NavigationItem>
          <NavigationItem link="/login">Login</NavigationItem>
        </div>
      )}
    </ul>
  </div>
);

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(NavigationItems);
