import React from 'react';
import { connect } from 'react-redux';

import './Success.css'

const Success = ({successes}) => {
  if(successes[0]){
    return(
      successes !== null &&
      successes[0].success &&
      successes.length > 0 &&
      successes.map((success) => <div className="Success" key={success.id}>{success.successMsg}</div>)
    )
  }
  return null
};

const mapStateToProps = (state) => ({
  successes: state.validators,
});

export default connect(mapStateToProps)(Success);
