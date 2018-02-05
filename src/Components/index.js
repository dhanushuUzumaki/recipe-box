/* global localStorage */

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AccordionCard from './AccordionCard';
import Modal from './Modal';
import Input from './Input';
import TextArea from './TextArea';

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
    this.onIngredientsChange = value => this._onIngredientsChange(value);
    this.addRecipe = e => this._addRecipe();
    this.renderCards = () => this._renderCards();
    this.loadAndUpdateFromLocalStorage = () => this._loadAndUpdateFromLocalStorage();
    this.updateLocalStorage = () => this._updateLocalStorage();
    /* eslint-enable */
  }

  componentWillMount () {
    this.loadAndUpdateFromLocalStorage();
  }

  _loadAndUpdateFromLocalStorage () {
    let recipes = JSON.parse(localStorage.getItem('recipies'));
    if (recipes === null) {
      recipes = [{
        recipeName: 'Poached Egg',
        ingredients: 'Eggs, Water, Vinegar'
      }, {
        recipeName: 'Pancake',
        ingredients: 'Flour, Milk, Egg, Butter, etc ;)'
      }];
    }
    this.setState({
      recipes
    });
  }

  _updateLocalStorage () {
    localStorage.setItem('recipies', JSON.stringify(this.state.recipes));
  }

  _showAddRecipeModal () {
    this.setState({
      showAddRecipeModal: true
    });
  }

  _closeAddRecipeModal () {
    const currentRecipe = {
      recipeName: '',
      ingredients: ''
    };
    this.setState({
      showAddRecipeModal: false,
      currentRecipe
    });
  }

  _onRecipeNameChange (value) {
    const currentRecipe = Object.assign({}, this.state.currentRecipe, { recipeName: value });
    this.setState({
      currentRecipe
    });
  }

  _onIngredientsChange (value) {
    const currentRecipe = Object.assign({}, this.state.currentRecipe, { ingredients: value });
    this.setState({
      currentRecipe
    });
  }

  _addRecipe () {
    let newState = JSON.parse(JSON.stringify(this.state)); // eslint-disable-line prefer-const
    newState.recipes.push(newState.currentRecipe);
    this.setState(newState, () => {
      this.updateLocalStorage();
      this.closeAddRecipeModal();
    });
  }

  _renderCards () {
    const { recipes } = this.state;
    return recipes.map(recipe => (
      <AccordionCard
        header={recipe.recipeName}
      >
        {recipe.ingredients}
      </AccordionCard>
    ));
  }

  render () {
    return (
      <div>
        <Header />
        <div className="add-recipe">
          <button className="ripple" onClick={this.showAddRecipeModal}>+</button>
        </div>
        <div className="accordion-cards">
          {this.renderCards()}
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
          <TextArea
            placeholder="Ingredients (comma separated)"
            onChange={this.onIngredientsChange}
            identifier="ingredients"
            value={this.state.currentRecipe.ingredients}
          />
          <div className="footer-btns">
            <button className="btn btn-link" onClick={this.closeAddRecipeModal}>Cancel</button>
            <button className="btn btn-primary ripple" onClick={this.addRecipe}>Add</button>
          </div>
        </Modal>
        <Footer />
      </div>
    );
  }
}

export default App;
