import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ text, href, isSaved, index, style, className, onClick, onPreview }) => (
  <div style={style} className={className}>
    <button type="button" className="preview" onClick={onPreview}>
      <span className="material-icons">pageview</span>
    </button>
    <div className="row-content">
      <div>{text}</div>
      <div>{href}</div>
    </div>
    {onClick ? (
      <button type="button" className="bookmark" onClick={() => onClick(index, isSaved)}>
        <span className="material-icons">
          {isSaved ? 'bookmark' : 'bookmark_border'}
        </span>
      </button>
    ) : null}
  </div>
);

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
  onPreview: PropTypes.func.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Row;
