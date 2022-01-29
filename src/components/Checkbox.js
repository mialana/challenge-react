import React, { useEffect, useState } from "react";

export default (props) => {
  return (
    <input
      type="checkbox"
      checked={props.checked}
      onChange={(event) => props.handleChange(true)}
    ></input>
  );
};
