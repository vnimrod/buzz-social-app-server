import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
    
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false,
      };
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.LOGOUT:
    case  actionTypes.DELETE_PROFILE:
      if (localStorage.token) {
        localStorage.removeItem('token');
      }
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload, //user data returned with the helper authContext
      };
    case actionTypes.AUTH_FAIL:
      if (localStorage.token) {
        localStorage.removeItem('token');
      }
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default auth;
