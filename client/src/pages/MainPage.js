import React from "react";

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

export default MainPage;
