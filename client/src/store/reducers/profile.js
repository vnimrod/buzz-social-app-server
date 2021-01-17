import * as actionTypes from '../actions/actionTypes';

const initialState = {
  profile: null,
  loading: true,
  requestErrors: {},
  staticProfile: null,
  avatar: null
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case actionTypes.GET_PROFILE:
      return {
        ...state,
        profile: payload, // Any logged in user profile
        loading: false,
      };
      case actionTypes.GET_STATIC_PROFILE:
        return{
          ...state,
          staticProfile: payload,
          loading: false
        }
      case actionTypes.UPLOAD_AVATAR:
        return {
          ...state,
          profile: {...state.profile, avatar: payload.avatar},
          isAuth: true,
          loading: false,
        } 
      case actionTypes.GET_AVATAR:
        return{
          ...state,
          avatar: payload,
          loading: false,
        } 
    case actionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case actionTypes.CLEAR_LOGOUT_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default profile;
