import React from 'react';

import busyBee from '../assets/busyBee__img.JPG';
import './UnderConstruction.css';

const NotificationPage = () => {
  return (
    <div className="UnderConstruction">
      <div className="UnderConstruction__elements">
        <img src={busyBee} />
        <div className="UnderConstruction__elements__message">
          <span className="UnderConstruction__elements__message__oops">OOPS... Busy Bee</span>
          <span>THIS PAGE IS UNDER CONSTRUCTION.</span>
          <span>Cooming soon...</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
