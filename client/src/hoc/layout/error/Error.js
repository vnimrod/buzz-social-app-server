import React from 'react';
import { connect } from 'react-redux';

import './Error.css'

const Error = ({errors}) => {
  if(errors[0]){
    return(
      errors !== null &&
      !errors[0].success &&
        errors.length > 0 &&
        errors.map((error) => <div className="Error" key={error.id}>{error.errorMsg}</div>)
    )
  }
  return null
};

const mapStateToProps = (state) => ({
  errors: state.validators,
});

export default connect(mapStateToProps)(Error);
