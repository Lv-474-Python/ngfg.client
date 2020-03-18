import React from "react";
import Popup from "reactjs-popup";
import CreateField from './CreateField'

export default () => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <CreateField/>
  </Popup>
);