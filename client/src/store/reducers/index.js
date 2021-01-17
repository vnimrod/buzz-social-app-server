import { combineReducers } from 'redux';

import auth from './auth'
import validators from './validators'
import profile from './profile'
import buzz from './buzz'
export default combineReducers({
  auth,
  validators,
  profile,
  buzz
});