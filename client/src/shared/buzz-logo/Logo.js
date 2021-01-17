import React from 'react';

import BuzzLogo from "../../assets/Logo.PNG"

import { NavLink } from "react-router-dom";
import "./Logo.css";

const logo = (props) => (
  <NavLink to="/buzzings" style={{background:"none", border: "none"}} className="Logo">
    <img src={BuzzLogo} alt="BuzzLogo"/>
  </NavLink>
)

export default logo;