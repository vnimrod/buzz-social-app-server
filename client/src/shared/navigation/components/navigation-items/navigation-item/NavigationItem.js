import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItem.css"

const navigationItem = (props) => {

  let type = null;

  switch(props.type){
    case ("icon"):
      props.sideDrawer?
      type = props.children :
      type = <img src={props.icon} alt={props.alt}></img> 
      break;
    case ("search"):
      return <input type="text" placeholder="Search on Buzz"/>
    default:
     type = props.children 
    }
    return(
      <li className="NavigationItem">
      <NavLink to={props.link} exact={props.exact}>
        {type}
      </NavLink>
    </li>
    )
};

export default navigationItem;
