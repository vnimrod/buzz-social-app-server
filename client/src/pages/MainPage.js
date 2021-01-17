import React, { useEffect } from "react";
import {connect} from 'react-redux';

import Buzzings from '../buzzings/components/Buzzings'
import LeftRail from "../shared/left-rail/LeftRail"
import "./MainPage.css";

const MainPage = () => {
  return (

  <div className="MainPage">
    <LeftRail />
    <Buzzings />
  </div>
  )
};

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(MainPage);
