/* global document */
import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor (props) {
    super(props);
    this.hideModal = () => this._hideModal();
    this.handleEsc = e => this._handleEsc(e);
  }

  componentDidMount () {
    document.addEventListener('keyup', this.handleEsc);
  }

  componentWillUnmount () {
    document.removeEventListener('keyup');
  }

  _handleEsc (e) {
    if (e.keyCode === 27) {
      this.hideModal();
    }
  }

  _hideModal () {
    this.props.onClose();
  }

  render () {
    const showOrHide = this.props.isVisible ? 'show' : 'hide';
    return (
      <div className={`modal ${showOrHide}`} >
        <div className="modal-overlay" onClick={this.hideModal} role="presentation" />
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <h4>{this.props.header}</h4>
              <hr />
              <span
                onClick={this.hideModal}
                className="modal-close-button"
                role="button"
                tabIndex="-1"
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              {this.props.children}
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
  isVisible: PropTypes.bool,
  children: PropTypes.node
};


export default Modal;
