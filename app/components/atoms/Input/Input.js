import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ onChange }) => {
  const onChangeText = ({ target: { value } }) => {
    onChange(value);
  };

  return (
    <div className="input-container">
      <input type="text" onChange={onChangeText} />
    </div>
  );
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Input;
