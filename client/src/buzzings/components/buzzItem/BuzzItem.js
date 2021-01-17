import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  addLike,
  removeLike,
  addComment,
  deleteBuzz,
} from '../../../store/actions/buzz';
import Input from '../../../shared/form-elements/Input';
import Button from '../../../shared/form-elements/Button';
import likeIcon from '../../../assets/like_icon.PNG';
import likedIcon from '../../../assets/liked_icon.PNG';
import commentsIcon from '../../../assets/comments_icon.PNG';
import Avatar from '../../../shared/UI/Avatar';
import {getProfileByUid} from '../../../store/actions/profile'

import './BuzzItem.css';



const BuzzItem = (props) => {
  const [isCommentsClicked, setIsCommentsClicked] = useState(false);
  const [text, setText] = useState('');
  const [isText, setIsText] = useState(false);

  const onClick = () => {
    setIsCommentsClicked(!isCommentsClicked);
  };

  const onChange = (e) => {
    if (e.target.value.length === 1) {
      setIsText(true);
    }
    if (e.target.value.length === 0) {
      setIsText(false);
    }
    setText(e.target.value);
  };

  const postClickHandler = (e) => {
    setIsText(false);
    props.addComment(props.bid, { text });
    setText('');
  };

  const deleteBuzzHandler = (bid) => {
    props.deleteBuzz(bid);
  };

  const toProfileHandler = (e)=>{
    // console.log(e.target)
    props.history.push(`/user/${e.target.alt}`)
  }
  return (
    <li className="BuzzItem">
      {/* <div className="BuzzItem__Data">
        <Avatar
          onClick={toProfileHandler}
          buzzAvatar={props.buzzAvatar}
          avatar={props.avatar}
          defaultAvatar={props.defaultAvatar}
          alt={props.user}
          width="145px"
        />

        <div className="BuzzItem__elements">
          <div className="BuzzItem__userData">
            <span className="UserName">
              {props.name
                .toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')}
            </span>
            <span className="BuzzedOn">{props.buzzedOn}</span>
            <span className="BuzzText">{props.text}</span>
          </div>
          <div className="BuzzItem__bottom">
            <div className="Like">
              <div className="Like__like-button">
                <img
                  src={likeIcon}
                  alt="likeIcon"
                  onClick={(e) => props.addLike(props.bid)}
                />
                <span>{props.length > 0 && props.length}</span>
              </div>
              <div className="Like__unlike-button">
                <img
                  src={likedIcon}
                  alt="likedIcon"
                  onClick={(e) => props.removeLike(props.bid)}
                />
              </div>
            </div>
            <div className="Comments" onClick={onClick}>
              <div className="Comments__button">
                <img src={commentsIcon} alt="likeIcon" />
                <span>
                  {props.comments.length > 0 && props.comments.length} comments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form className="Comments__comment-input">
        <Avatar
          avatar={props.profile && props.profile.avatar}
          defaultAvatar={props.defaultAvatar}
          width="35px"
          height="35px"
          borderRadius="50%"
        />
        <Input
          value={text}
          onChange={onChange}
          element="textarea"
          id="addComment"
          type="text"
          placeholder="Add a comment..."
        />
        {isText ? <Button onClick={postClickHandler}>Buzz</Button> : null}
        {!props.auth.loading && props.user === props.auth.user._id && (
          <div className="BuzzItem__Data__delete-post-button">
            <Button onClick={(e) => deleteBuzzHandler(props.bid)} type="button">
              Delete
            </Button>
          </div>
        )}
      </form>
      {isCommentsClicked ? (
        <div className="Comments__comments-item">
          <div className="Comments__comments-items">
            {props.comments.length > 0 ? (
              props.comments
                .map((comment) => (
                  <div className="Comments__comments-items__full-item">
                    <div className="Comments__comments-items__span">
                      <span className="Comments__comments-items__span__span-name">
                        {comment.name
                          .toLowerCase()
                          .split(' ')
                          .map(
                            (s) => s.charAt(0).toUpperCase() + s.substring(1)
                          )
                          .join(' ')}
                        :
                      </span>
                      <span className="Comments__comments-items__span__span-text">
                        {comment.text}
                      </span>
                    </div>
                  </div>
                ))
                .reverse()
            ) : (
              <span>no comments yet</span>
            )}
          </div>
        </div>
      ) : null} */}
    </li>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addComment,
  deleteBuzz,
  getProfileByUid
})(withRouter(BuzzItem));
