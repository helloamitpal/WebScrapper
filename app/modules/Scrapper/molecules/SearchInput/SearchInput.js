import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../components/atoms/Input';
import translate from '../../../../locale';

import './SearchInput.scss';

const SearchInput = ({ onSearch, className, ...restProps }) => {
  const URL_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&=]*)/;
  const [text, setText] = useState();

  const onChangeSearch = (val) => {
    setText(val);
  };

  const validateInput = (val) => (!val || (val && val.match(URL_REGEX)));

  return (
    <div className={`search-input-container ${className}`}>
      <Input
        {...restProps}
        validate={validateInput}
        onChange={onChangeSearch}
        placeholder={translate('common.URL')}
      />
      <button type="button" onClick={() => onSearch(text)}>
        <span className="material-icons">search</span>
      </button>
    </div>
  );
};

SearchInput.defaultProps = {
  className: ''
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default SearchInput;
