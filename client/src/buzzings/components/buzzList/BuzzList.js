import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import BuzzItem from '../buzzItem/BuzzItem';
import AddNewBuzz from '../addNewBuzz/AddNewBuzz';
import {getProfile} from '../../../store/actions/profile'
import {getBuzzings} from '../../../store/actions/buzz'
import {authStart} from '../../../store/actions/auth'
import './BuzzList.css';

const BuzzList = ({ buzzings, profile, getProfile, getBuzzings, authStart }) => {
  useEffect(() => {
    getProfile();
    getBuzzings();
    authStart();
  }, [authStart]);

  return (
    <ul className="BuzzList">
      <AddNewBuzz buzzings={buzzings}/>
      {buzzings.map((buzz) => {
        return (
          <BuzzItem
            key={buzz._id}
            bid={buzz._id}
            user={buzz.user}
            name={buzz.name}
            avatar={profile && profile.avatar}
            buzzAvatar={buzz.avatar}
            defaultAvatar= {profile === null || profile.avatar ===null ? true : false}
            buzzedOn={buzz.createdAt}
            likes={buzz.likes}
            comments={buzz.comments}
            text={buzz.text}
            length={buzz.likes.length}
          />
        );
      }).reverse()}
    </ul>
  );
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
})
export default connect(mapStateToProps, {getProfile, getBuzzings, authStart})(BuzzList)
