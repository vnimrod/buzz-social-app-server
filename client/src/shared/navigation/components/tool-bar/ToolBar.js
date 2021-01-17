import React, { Fragment, useState } from "react";

import NavigationItems from "../navigation-items/NavigationItems"
import SideDrawer from "../side-drawer/SideDrawer";

import "./ToolBar.css";

const ToolBar = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  return (
    <Fragment>
        <SideDrawer show={drawerIsOpen} clicked={closeDrawerHandler}>
          <nav className="Toolbar_drawer-nav">
            <NavigationItems sideDrawer={true}/>
          </nav>
        </SideDrawer>
        <header className="Toolbar">
          <button className="Toolbar__drawer-btn"
            onClick={openDrawerHandler}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className="Toolbar__header-nav"> 
            <NavigationItems />
          </nav>
      </header>
    </Fragment>
  );
};

export default ToolBar;
