import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {getProfile} from '../../../store/actions/profile'
import {authStart} from '../../../store/actions/auth'
import Avatar from '../../../shared/UI/Avatar';
import Modal from '../../../shared/UI/Modal';
import addPhotoIcon from '../../../assets/addPhoto__icon.PNG';
import './AddNewBuzz.css';

const AddNewBuzz = (props) => {
  useEffect(() => {
    props.authStart();
    props.getProfile()
  }, [authStart, getProfile]);

  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };
  return (
    <Fragment>
      <Modal
        avatar={props.profile && props.profile.avatar}
        defaultAvatar= {props.profile === null || props.profile.avatar ===null ? true : false}
        show={showModal}
        close={closeModalHandler}
      />
      <div className="AddNewBuzz">
        <div className="AddNewBuzz__avatar">
          <Avatar
            avatar={props.profile && props.profile.avatar}
            defaultAvatar= {props.profile === null || props.profile.avatar ===null ? true : null}
            alt="Nimrod"
            height="50px"
            width="50px"
            borderRadius="50%"
          />
        </div>
        <div className="AddNewBuzz__BuzzInfo">
          <span onClick={openModalHandler}> Share your thoughts</span>
        </div>
        <div className="AddNewBuzz__BuzzUpload">
          <hr />
          <div className="AddNewBuzz__photoUpload">
            <img
              style={{ width: '50px', height: '50px' }}
              src={addPhotoIcon}
              alt="addPhotoIcon"
            />
            <span>Photo/Video</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});
export default connect(mapStateToProps,{ authStart, getProfile })(AddNewBuzz);
