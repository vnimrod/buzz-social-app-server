/* THIS MODAL IS NOT DYNAMIC! */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { CSSTransition } from 'react-transition-group';

import { addBuzz } from '../../store/actions/buzz';
import Button from '../form-elements/Button';
import Input from '../form-elements/Input';
import Avatar from './Avatar';
import './Modal.css';

const ModalOverlay = ({
  close,
  auth,
  addBuzz,
  defaultAvatar,
  profile,
  avatar,
}) => {
  const [text, setText] = useState('');

  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    close();
    addBuzz({ text });
  };

  const content = (
    <div className="Modal">
      <header>
        <h1>Create Buzz</h1>
        <Button type="button" onClick={close}>
          X
        </Button>
      </header>
      <hr />
      {profile !== null ? (
        <form onSubmit={onSubmit}>
          <footer>
            <div className="Modal__userInfo">
              <Avatar
                avatar={avatar}
                defaultAvatar={defaultAvatar}
                alt="Nimrod"
                height="50px"
                width="50px"
                borderRadius="50%"
              />
              <span>
                {auth.user.name
                  .toLowerCase()
                  .split(' ')
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')}
              </span>
            </div>
            <Input
              id="buzztext"
              element="textarea"
              onChange={onChange}
              type="text"
              placeholder="Share Your thoughts..."
            />
            <Button type="submit" size="big">
              Buzz
            </Button>
          </footer>
        </form>
      ) : (
        <div className="Modal__create-profile">
          <span>*Attention* You have not yet set your profile details.</span>
          <span>Create your profile before you can add new Buzz</span>
          <div className="Modal__create-profile__create-button">
            <Button to="/my-profile" button="button">
              Create Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
  return content;
};

const Modal = (props) => (
  <CSSTransition
    in={props.show}
    mountOnEnter
    unmountOnExit
    timeout={200}
    classNames="Modal"
  >
    <ModalOverlay {...props} />
  </CSSTransition>
);

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { addBuzz })(Modal);
