import { v4 as uuid } from 'uuid';
import * as actionTypes from './actionTypes';

export const setErrorAlert = (errorMsg = null, success = false) => {
  return async (dispatch) => {
    const id = uuid();
    dispatch({
      type: actionTypes.VALIDATOR_TYPE_REQUIRE,
      payload: { errorMsg, id, success },
    });

    setTimeout(
      () => dispatch({ type: actionTypes.VALIDATOR_TYPE_REMOVE, payload: id }),
      5000
    );
  };
};

export const setSuccessAlert = (successMsg, success = true) => {
  return async (dispatch) => {
    const id = uuid();
    dispatch({
      type: actionTypes.VALIDATOR_TYPE_SUCCESS,
      payload: { successMsg, id, success},
    });

    setTimeout(
      () => dispatch({ type: actionTypes.VALIDATOR_TYPE_REMOVE, payload: id }),
      5000
    );
  };
}
