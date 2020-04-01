import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ text, href, isSaved, index, style, className, onClick }) => {
  const onClickRow = (...props) => {
    if (onClick) {
      onClick(...props);
    }
  };

  return (
    <div style={style} className={className}>
      <div>{text}</div>
      <div>{href}</div>
      <button type="button" className="bookmark" onClick={() => onClickRow(index, isSaved)}>
        <span className="material-icons">
          {isSaved ? 'bookmark' : 'bookmark_border'}
        </span>
      </button>
    </div>
  );
};

Row.defaultProps = {
  style: {},
  className: '',
  onClick: null
};

Row.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Row;
