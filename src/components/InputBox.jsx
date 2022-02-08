import React from "react";

import "../styles/InputBox.css";

export const InputBox = ({ placeholder, setValue, dataCy }) => {
  return (
    <input
      type="text"
      className="input-box"
      onInput={e => {
        setValue(e.target.value);
      }}
      data-cy={dataCy}
      placeholder={placeholder}
    />
  );
};
