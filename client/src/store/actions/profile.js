import axios from 'axios';
import { setErrorAlert, setSuccessAlert } from './validators';
import * as actionTypes from './actionTypes';

// Any logged in user profile
export const getProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/profile/me');

      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data, //save user profile to our state
      });
    } catch (err) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const getProfileByUid = (uid) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/profile/user/${uid}`);

      dispatch({
        type: actionTypes.GET_STATIC_PROFILE,
        payload: res.data, 
      });
    } catch (err) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: { msg: err.response, status: err.response },
      });
    }
  };
};

export const createProfile = (formData, history, success = false) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/profile', formData, config);

      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data,
      });

      dispatch(setSuccessAlert('Profile Created'));

      if (success) {
        history.push('/profile');
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setErrorAlert(err.msg)));
      }
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const updateProfile = (formData, history, success = false) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.patch('/profile/me', formData, config);

      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data,
      });

      dispatch(setSuccessAlert('Profile Updated'));

      if (success) {
        history.push('/profile');
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setErrorAlert(err.msg)));
      }
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const uploadAvatar = (image) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post('/profile/me/avatar', image, config);
    try {
      dispatch({
        type: actionTypes.UPLOAD_AVATAR,
        payload: res.data, //base64 converted image
      });
    } catch (err) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const getAvatar = (uid) => {
  return async (dispatch) => {
    try {
      const avatar = await axios.get(`/profile/${uid}/avatar`);
      
      dispatch({
        type: actionTypes.GET_AVATAR,
        payload: avatar,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const addEducation = (formData, history, success = false) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put('/profile/education', formData, config);
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data,
      });

      dispatch(setSuccessAlert('Education Added'));

      if (success) {
        history.push('/profile');
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setErrorAlert(err.msg)));
      }
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const deleteEducation = (eid) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/profile/education/${eid}`);

      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data,
      });

      dispatch(setSuccessAlert('Education Deleted'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setErrorAlert(err.msg)));
      }
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const deleteProfile = () => async (dispatch) => {
  if (
    window.confirm('**WARNING** Are you sure? THIS ACTION CAN NOT BE UNDONE!')
  ) {
    try {
      await axios.delete('/profile/me');

      dispatch({
        type: actionTypes.CLEAR_LOGOUT_PROFILE,
      });

      dispatch({
        type: actionTypes.DELETE_PROFILE,
      });

      dispatch(setErrorAlert('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
