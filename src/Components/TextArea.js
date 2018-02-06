import React from 'react';
import PropTypes from 'prop-types';

class TextArea extends React.Component {
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
    const { placeholder, identifier, label } = this.props;
    return (
      <div className="textarea-container">
        {label && <div className="textarea-label">{label}</div>}
        <textarea
          className="textarea"
          onChange={this.onChange}
          placeholder={placeholder}
          name={identifier}
          data-gramm_editor="false"
          value={this.state.value}
        />
      </div>
    );
  }
}

TextArea.propTypes = {
  value: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  identifier: PropTypes.string,
  label: PropTypes.string
};

export default TextArea;
