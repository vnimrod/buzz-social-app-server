import React from 'react';

import './Input.css';

const Input = (props) => {
  let elementType = null;

  switch (props.element) {
    case 'input':
      elementType = (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
        />
      );
      break;
    case 'textarea':
      elementType = (
        <textarea
          id={props.id}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          placeholder={props.placeholder}
          onFocus={props.onFocus}
        />
      );
      break;
  }

  return (
    <div className="FormElements">
      <label>{props.label}</label>
      {elementType}
    </div>
  );
};

export default Input;
