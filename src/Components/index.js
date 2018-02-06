/* global localStorage alert */

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
      showEditRecipeModal: false,
      currentRecipe: {
        recipeName: '',
        ingredients: ''
      },
      currentRecipeId: -1
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
    this.renderAddRecipeModal = () => this._renderAddRecipeModal();
    this.renderEditRecipeModal = () => this._renderEditRecipeModal();
    this.deleteRecipe = index => this._deleteRecipe(index);
    this.updateRecipe = () => this._updateRecipe();
    this.showEditRecipeModal = index => this._showEditRecipeModal(index);
    this.closeEditRecipeModal = e => this._closeEditRecipeModal();
    /* eslint-enable */
  }

  componentWillMount () {
    this.loadAndUpdateFromLocalStorage();
  }

  _loadAndUpdateFromLocalStorage () {
    let recipes = JSON.parse(localStorage.getItem('recipies'));
    if (recipes === null || recipes.length < 1) {
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

  _showEditRecipeModal (index) {
    this.setState((prevState) => {
      const currentRecipe = prevState.recipes[index];
      return {
        showEditRecipeModal: true,
        currentRecipeId: index,
        currentRecipe
      };
    });
  }

  _closeEditRecipeModal () {
    const currentRecipe = {
      recipeName: '',
      ingredients: ''
    };
    this.setState({
      showEditRecipeModal: false,
      currentRecipe,
      currentRecipeId: -1
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
    const { recipeName, ingredients } = newState.currentRecipe;
    if (recipeName !== '' && ingredients !== '') {
      newState.recipes.push(newState.currentRecipe);
      this.setState(newState, () => {
        this.updateLocalStorage();
        this.closeAddRecipeModal();
      });
    } else {
      setTimeout(() => alert('Enter Recipe to add.'), 500); // eslint-disable-line no-alert
    }
  }

  _deleteRecipe (index) {
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.recipes.splice(index, 1);
    this.setState(newState, this.updateLocalStorage);
  }

  _updateRecipe () {
    const newState = JSON.parse(JSON.stringify(this.state));

    const { recipeName, ingredients } = newState.currentRecipe;
    if (recipeName !== '' && ingredients !== '') {
      newState.recipes[this.state.currentRecipeId] = newState.currentRecipe;
      this.setState(newState, () => {
        this.updateLocalStorage();
        this.closeEditRecipeModal();
      });
    } else {
      setTimeout(() => alert('Can\'t save empty recipe.'), 500); // eslint-disable-line no-alert
    }
  }

  _renderCards () {
    const { recipes } = this.state;
    let content;
    if (recipes.length > 0) {
      content = recipes.map((recipe, index) => (
        <AccordionCard
          header={recipe.recipeName}
        >
          <span className="side-heading">Ingredients</span>: {recipe.ingredients}
          <div>
            <button
              className="btn btn-primary ripple"
              onClick={() => this.showEditRecipeModal(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-delete ripple"
              onClick={() => this.deleteRecipe(index)}
            >
              Delete
            </button>
          </div>
        </AccordionCard>
      ));
    } else {
      content = <h5>Add Recipies and cook your way to the top ;)</h5>;
    }

    return content;
  }

  _renderAddRecipeModal () {
    return (
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
    );
  }

  _renderEditRecipeModal () {
    return (
      <Modal
        onClose={this.closeEditRecipeModal}
        header="Add Recipe"
        isVisible={this.state.showEditRecipeModal}
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
          <button className="btn btn-link" onClick={this.closeEditRecipeModal}>Cancel</button>
          <button
            className="btn btn-primary ripple"
            onClick={this.updateRecipe}
          >
            Save
          </button>
        </div>
      </Modal>
    );
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
        {this.renderAddRecipeModal()}
        {this.renderEditRecipeModal()}
        <Footer />
      </div>
    );
  }
}

export default App;
