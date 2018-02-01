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
    console.log(props);
    const { value } = props;
    return {
      value
    };
  }

  render () {
    return (
      <input
        type={this.props.type}
        value={this.state.value}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
        name={this.props.identifier}
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.oneOf('text', 'number'),
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  identifier: PropTypes.string
};

export default Input;
