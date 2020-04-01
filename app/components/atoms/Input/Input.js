import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const Input = ({ onChange, validate, placeholder }) => {
  const [error, setError] = useState(false);

  const onChangeText = ({ target: { value } }) => {
    const trimmedVal = value.trim();
    const valid = validate && validate.call(null, trimmedVal);

    setError(!valid);
    onChange(trimmedVal);
  };

  return (
    <div className={`input-container ${error ? 'error' : ''}`}>
      <input type="text" onChange={onChangeText} placeholder={placeholder} />
    </div>
  );
};

Input.defaultProps = {
  validate: null,
  placeholder: ''
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  validate: PropTypes.func,
  placeholder: PropTypes.string
};

export default Input;
