import React from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

const Modal = ({ onClose, children }) => (
  <div className="overlay">
    <div className="modal-content">
      <button type="button" onClick={onClose}>
        <span className="material-icons">close</span>
      </button>
      {children}
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
