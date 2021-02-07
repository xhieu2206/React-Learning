import React from 'react';

const settingsProfileButton = props => (
  <button className="btn btn-sm btn-outline-secondary action-btn" onClick={props.clicked}>
    <i className="ion-gear-a"></i>&nbsp;Edit Profile Settings
  </button>
)

export default settingsProfileButton;
