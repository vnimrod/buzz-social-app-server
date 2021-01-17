import React, { Component, Fragment } from "react";

import ToolBar from "../../shared/navigation/components/tool-bar/ToolBar"
import "./Layout.css";

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <ToolBar/>
        <main className="Content">{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout
