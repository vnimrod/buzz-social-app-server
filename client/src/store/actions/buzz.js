import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getBuzzings = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/buzzings');
      dispatch({
        type: actionTypes.GET_BUZZINGS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.BUZZING_ERROR,
        payload: { msg: err.response, status: err.response},
      });
    }
  };
};

export const addBuzz = (formData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/buzzings', formData, config);

      dispatch({
        type: actionTypes.ADD_BUZZ,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.BUZZING_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const deleteBuzz = (bid) => {
  return async dispatch => {
    if (
      window.confirm('This action will delete this buzz. are you sure?')
    ){
    try {
      const res = await axios.delete(`/buzzings/${bid}`);

      dispatch({
        type: actionTypes.DELETE_BUZZ,
        payload: bid
      })
    } catch (err) {
      dispatch({
        type: actionTypes.BUZZING_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
  }
}

export const addLike = (bid) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/buzzings/like/${bid}`);
      dispatch({
        type: actionTypes.BUZZINGS_LIKES,
        payload: { bid, likes: res.data },
      });
    } catch (err) {
      dispatch({
        type: actionTypes.BUZZING_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const changedAvatarUpdate = (uid) => {
  return async dispatch => {
    try {
      const avatar = await axios.get(`/profile/${uid}/avatar`)
      
      dispatch({
        type: actionTypes.CHANGED_AVATAR_UPDATE,
        payload: {uid, avatar: avatar.data}
      })
    } catch (err) {
      dispatch({
        type: actionTypes.BUZZING_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
}

export const removeLike = (bid) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/buzzings/unlike/${bid}`);
      dispatch({
        type: actionTypes.BUZZINGS_LIKES,
        payload: { bid, likes: res.data },
      });
    } catch (err) {
      dispatch({
        type: actionTypes.BUZZING_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const addComment = (bid, formData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `/buzzings/comment/${bid}`,
        formData,
        config
      );

      dispatch({
        type: actionTypes.ADD_COMMENT,
        payload: {bid, comments: res.data}
      });

    } catch (err) {
      dispatch({
        type: actionTypes.BUZZING_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const deleteComment = (bid, cid) => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/buzzings/comment/${bid}/${cid}`)
      dispatch({
        type: actionTypes.DELETE_COMMENT,
        payload: {bid, cid}
      })
    } catch (err) {
      
      dispatch({
        type: actionTypes.BUZZING_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
}