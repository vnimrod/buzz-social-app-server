import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import Button from './Button';
import Input from './Input';
import { uploadAvatar } from '../../store/actions/profile';
import './AvatarUpload.css';

const AvatarUpload = ({ uploadAvatar, profile }) => {
  const [avatar, setAvatar] = useState(null);

  const fileSelectorHandler = (e) => {
    setAvatar(e.target.files[0]);
  };

  const fileUploadHandler = (e) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    uploadAvatar(formData);
    // changedAvatarUpdate(profile.user._id) // need to create updateMany route for buzzings database
  };

  return (
    <div className="AvatarUpload">
      <div className="AvatarUpload__file">
        <label id="avatar">
          Browse
          <Input
            id="avatar"
            element="input"
            type="file"
            onChange={fileSelectorHandler}
          />
        </label>
      </div>
        <Button type="button" onClick={fileUploadHandler}>
          Upload
        </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile.profile
})
export default connect(mapStateToProps, { uploadAvatar })(AvatarUpload);
