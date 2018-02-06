import React from 'react';
import PropTypes from 'prop-types';

class AccordionCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showCard: false
    };
    this.toggleCard = e => this._toggleCard(e);
  }

  _toggleCard (e) { // eslint-disable-line no-unused-vars
    this.setState((prevState) => {
      const showCard = !prevState.showCard;
      return {
        showCard
      };
    });
  }

  render () {
    const showOrHide = this.state.showCard ? 'show' : 'hide';
    return (
      <div className="accordion-card">
        <div>
          <button
            onClick={this.toggleCard}
            className="accordion-header"
          >
            {this.props.header}
          </button>
        </div>
        <div className={`accordion-body ${showOrHide}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

AccordionCard.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node
};

export default AccordionCard;
