import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AccordionCard from './AccordionCard';
import Modal from './Modal';
import Input from './Input';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showAddRecipeModal: false,
      currentRecipe: {
        recipeName: '',
        ingredients: ''
      }
    };
    /* eslint-disable */
    this.showAddRecipeModal = e => this._showAddRecipeModal();
    this.closeAddRecipeModal = e => this._closeAddRecipeModal();
    this.onRecipeNameChange = value => this._onRecipeNameChange(value);
    /* eslint-enable */
  }

  _showAddRecipeModal () {
    this.setState({
      showAddRecipeModal: true
    });
  }

  _closeAddRecipeModal () {
    this.setState({
      showAddRecipeModal: false
    });
  }

  _onRecipeNameChange (value) {
    const currentRecipe = Object.assign({}, this.state.currentRecipe, { recipeName: value });
    this.setState({
      currentRecipe
    });
  }

  render () {
    return (
      <div>
        <Header />
        <div className="add-recipe"><button onClick={this.showAddRecipeModal}>+</button></div>
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
        <Modal
          onClose={this.closeAddRecipeModal}
          header="Add Recipe"
          isVisible={this.state.showAddRecipeModal}
        >
          <Input
            type="text"
            placeholder="Recipie Name"
            onChange={this.onRecipeNameChange}
            identifier="recipeName"
            value={this.state.currentRecipe.recipeName}
          />
        </Modal>
        <Footer />
      </div>
    );
  }
}

export default App;
