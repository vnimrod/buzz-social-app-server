import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import BuzzList from './buzzList/BuzzList';
import Spinner from '../../shared/UI/Spinner';
import { getBuzzings } from '../../store/actions/buzz';
import {authStart} from '../../store/actions/auth'

const Buzzings = ({ getBuzzings,authStart, buzzings: { buzzings, loading } }) => {
  useEffect(() => {
    getBuzzings();
    authStart();
  }, [getBuzzings, authStart]);
  
  return !buzzings && loading ? <Spinner /> : <BuzzList buzzings={buzzings} />
};

const mapStateToProps = (state) => ({
  buzzings: state.buzz,
});

export default connect(mapStateToProps, { getBuzzings, authStart })(Buzzings);
