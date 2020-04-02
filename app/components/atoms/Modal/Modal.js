/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

const Modal = ({ onClose, content }) => (
  <div className="overlay modal-container">
    <div className="modal-content">
      <button type="button" className="close-btn" onClick={onClose}>
        <span className="material-icons">close</span>
      </button>
      <div className="modal-body" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  </div>
);

Modal.propTypes = {
  content: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
