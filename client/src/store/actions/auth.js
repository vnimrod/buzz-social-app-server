import axios from 'axios';

import * as actionTypes from './actionTypes';
import { setErrorAlert } from './validators';
import authContext from '../../shared/utils/helpers/authContext';

export const authStart = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      authContext(localStorage.token);
    }
    try {
      const res = await axios.get('/users/me');

      dispatch({
        type: actionTypes.AUTH_START,
        payload: res.data, //the user
      });
    } catch (err) {
      dispatch({
        type: actionTypes.AUTH_FAIL,
      });
    }
  };
};

export const register = ({ name, email, password }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('/users/signup', body, config);

      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        payload: res.data, //data - the token got back
      });

      dispatch(authStart());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setErrorAlert(err.msg)));
      }

      dispatch({
        type: actionTypes.REGISTER_FAIL,
      });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('/users/login', body, config);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: res.data, //data - the token got back
      });

      dispatch(authStart());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setErrorAlert(err.msg)));
      }

      dispatch({
        type: actionTypes.LOGIN_FAIL,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_LOGOUT_PROFILE,
    });
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };
};
