import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const validators = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.VALIDATOR_TYPE_REQUIRE:
      return [
        ...state,
        payload, // payload = errorMsg, msgType
      ];
    case actionTypes.VALIDATOR_TYPE_SUCCESS:
      return [
        ...state,
        payload
      ]
    case actionTypes.VALIDATOR_TYPE_REMOVE:
      return state.filter((error) => error.id !== payload)
    default:
      return state;
  }
};

export default validators