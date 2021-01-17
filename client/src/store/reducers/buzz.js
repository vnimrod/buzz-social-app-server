import * as actionTypes from '../actions/actionTypes';

const initialState = {
  buzzings: [],
  loading: true,
  error: {},
};

const buzz = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_BUZZINGS:
      return {
        ...state,
        buzzings: payload,
        loading: false,
      };
    case actionTypes.ADD_BUZZ:
      return {
        ...state,
        buzzings: [...state.buzzings, payload],
        loading: false,
      };
    case actionTypes.DELETE_BUZZ:
      return {
        ...state,
        buzzings: state.buzzings.filter((buzz) => buzz._id !== payload),
      };
    case actionTypes.BUZZING_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case actionTypes.BUZZINGS_LIKES:
      return {
        ...state,
        buzzings: state.buzzings.map((buzz) =>
          buzz._id === payload.bid ? { ...buzz, likes: payload.likes } : buzz
        ),
        loading: false,
      };
    case actionTypes.ADD_COMMENT:
      return {
        ...state,
        buzzings: state.buzzings.map((buzz) =>
          buzz._id === payload.bid
            ? { ...buzz, comments: payload.comments }
            : buzz
        ),
        loading: false,
      };
    case actionTypes.DELETE_COMMENT:
      return {
        ...state,
        buzzings: state.buzzings.map((buzz) => buzz._id === payload.bid ? {...buzz.comments.filter((comment => comment._id !== payload.cid))}: buzz)
      };
    case actionTypes.CHANGED_AVATAR_UPDATE:
      
      return{
        ...state,
        buzzings: state.buzzings.map((buzz) => buzz.user === payload.uid ? {...buzz, avatar: payload.avatar} : buzz)
      }
    default:
      return state;
  }
};

export default buzz;
