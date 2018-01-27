import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render () {
    const showOrHide = this.props.isVisible ? 'show' : 'hide';
    return (
      <div className={`modal ${showOrHide}`}>
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-header-content">
                  {this.props.header}
                </div>
                <div
                  tabIndex="-1"
                  className="modal-close-button"
                  role="button"
                  onClick={this.props.onClose}
                  onKeyPress={this.props.onClose}
                >
                  X
                </div>
              </div>
              <div className="modal-body">
                body
              </div>
              <div className="modal-footer">
                Footer
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  header: PropTypes.string,
  isVisible: PropTypes.bool
};

export default Modal;
