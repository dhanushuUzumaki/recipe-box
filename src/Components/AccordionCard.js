import React from 'react';

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
          <button onClick={this.toggleCard} className="accordion-header">News</button>
        </div>
        <div className={`accordion-body ${showOrHide}`}>
          Content
        </div>
      </div>
    );
  }
}

export default AccordionCard;
