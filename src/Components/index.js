import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AccordionCard from './AccordionCard';
import Modal from './Modal';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.showModal = e => this._showModal(); // eslint-disable-line no-unused-vars
    this.closeModal = e => this._closeModal(); // eslint-disable-line no-unused-vars
  }

  _showModal () {
    this.setState({
      showModal: true
    });
  }

  _closeModal () {
    this.setState({
      showModal: false
    });
  }

  render () {
    return (
      <div>
        <Modal onClose={this.closeModal} header="Add Recipe" isVisible={this.state.showModal} />
        <Header />
        <div className="add-recipe"><button onClick={this.showModal}>+</button></div>
        <div className="accordion-cards">
          <AccordionCard />
          <AccordionCard />
          <AccordionCard />
          <AccordionCard />
          <AccordionCard />
          <AccordionCard />
          <AccordionCard />
          <AccordionCard />
          <AccordionCard />
          <AccordionCard />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
