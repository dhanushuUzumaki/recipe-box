import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor (props) {
    super(props);
    this.state = this.extractStateFromProps(props);
    this.onChange = e => props.onChange(e.target.value);
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this.extractStateFromProps(nextProps));
  }

  extractStateFromProps (props) {
    return {
      value: props.value
    };
  }

  render () {
    const { type, placeholder, identifier, label } = this.props;
    return (
      <div className="input-container">
        {label && <div className="input-label">{label}</div>}
        <input
          className="input"
          type={type}
          value={this.state.value}
          onChange={this.onChange}
          placeholder={placeholder}
          name={identifier}
        />
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.oneOf('text', 'number'),
  value: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  identifier: PropTypes.string,
  label: PropTypes.string
};

export default Input;
