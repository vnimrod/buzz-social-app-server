import React from "react";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css"

const sideDrawer = (props) => (
  <CSSTransition
    in={props.show}
    timeout={200}
    classNames="slide-in-left"
    mountOnEnter
    unmountOnExit
  >
    <aside className="side-drawer" onClick={props.clicked}>
      {props.children}
    </aside>
  </CSSTransition>
);

export default sideDrawer;
