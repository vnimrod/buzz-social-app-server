import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import BuzzList from './buzzList/BuzzList';
import Spinner from '../../shared/UI/Spinner';
import { getBuzzings } from '../../store/actions/buzz';

const Buzzings = ({ getBuzzings, buzzings: { buzzings, loading } }) => {
  useEffect(() => {
    getBuzzings();
  }, [getBuzzings]);
  
  return loading ? <Spinner /> : <BuzzList buzzings={buzzings} />
};

const mapStateToProps = (state) => ({
  buzzings: state.buzz,
});

export default connect(mapStateToProps, { getBuzzings })(Buzzings);
