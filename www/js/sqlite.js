"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecipeInfo = function (_React$Component) {
  _inherits(RecipeInfo, _React$Component);

  function RecipeInfo() {
    _classCallCheck(this, RecipeInfo);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      isExpanded: false
    };
    _this.toggleExpansion = _this.toggleExpansion.bind(_this);
    _this.delete = _this.delete.bind(_this);
    _this.editRecipe = _this.editRecipe.bind(_this);
    return _this;
  }

  RecipeInfo.prototype.delete = function _delete() {
    this.props.deleteFn(this.props.index);
  };

  RecipeInfo.prototype.toggleExpansion = function toggleExpansion() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  };

  RecipeInfo.prototype.editRecipe = function editRecipe() {
    this.props.editRecipe(this.props.index);
  };

  RecipeInfo.prototype.render = function render() {
    if (this.state.isExpanded === false) return React.createElement(
      "div",
      { className: "recipeTitle", onClick: this.toggleExpansion },
      this.props.recipeDetails.title
    );else return React.createElement(
      "div",
      { className: "recipeWrapper" },
      React.createElement(
        "div",
        { className: "recipeTitle", onClick: this.toggleExpansion },
        this.props.recipeDetails.title
      ),
      this.props.recipeDetails.ingredients.split(",").map(function (ingred, i) {
        return React.createElement(
          "div",
          { className: "ingredientName" },
          ingred
        );
      }),
      React.createElement(
        "div",
        { className: "buttonContainer" },
        React.createElement(
          "div",
          { className: "button-primary", onClick: this.editRecipe },
          React.createElement("i", { className: "fa fa-pencil-square-o fa-2x", "aria-hidden": "true" })
        ),
        React.createElement(
          "div",
          { className: "button-primary deleteButton", onClick: this.delete },
          React.createElement("i", { className: "fa fa-trash fa-2x", "aria-hidden": "true" })
        )
      )
    );
  };

  return RecipeInfo;
}(React.Component);

var RecipesSection = function (_React$Component2) {
  _inherits(RecipesSection, _React$Component2);

  function RecipesSection() {
    _classCallCheck(this, RecipesSection);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this));

    _this2.state = {
      recipes: typeof localStorage["thinkTankRecipes"] != "undefined" ? JSON.parse(localStorage["thinkTankRecipes"]) : [{ title: "Butter chicken", ingredients: "Butter,chicken" }, { title: "Cake", ingredients: "chocolate,MAGIC!" }],
      recipeIndex: -1,
      newRecipeTitle: "Enter title here",
      newRecipeIngredients: "Enter ingredients seperated by commas eg (butter,sugar,chocolate)"
    };
    _this2.saveRecipe = _this2.saveRecipe.bind(_this2);
    _this2.toggleMaker = _this2.toggleMaker.bind(_this2);
    _this2.sanitizeRecipe = _this2.sanitizeRecipe.bind(_this2);
    _this2.resetRecipeValues = _this2.resetRecipeValues.bind(_this2);
    _this2.deleteRecipe = _this2.deleteRecipe.bind(_this2);
    _this2.titleChanged = _this2.titleChanged.bind(_this2);
    _this2.recipeChanged = _this2.recipeChanged.bind(_this2);
    _this2.editRecipe = _this2.editRecipe.bind(_this2);
    _this2.updateLocalStorage = _this2.updateLocalStorage.bind(_this2);

    return _this2;
  }

  RecipesSection.prototype.updateLocalStorage = function updateLocalStorage() {
    localStorage.setItem("thinkTankRecipes", JSON.stringify(this.state.recipes));
  };

  RecipesSection.prototype.editRecipe = function editRecipe(index) {
    var _this3 = this;

    var title = this.state.recipes[index].title;
    var ingred = this.state.recipes[index].ingredients;
    this.setState({
      recipeIndex: index,
      newRecipeIngredients: ingred,
      newRecipeTitle: title }, function () {
      _this3.toggleMaker();
    });
  };

  RecipesSection.prototype.toggleMaker = function toggleMaker() {
    this.setState({
      makingRecipe: !this.state.makingRecipe
    });
  };

  RecipesSection.prototype.deleteRecipe = function deleteRecipe(index) {
    var _this4 = this;

    var newRecipes = this.state.recipes;
    newRecipes.splice(index, 1);
    this.setState({
      recipes: newRecipes
    }, function () {
      _this4.updateLocalStorage();
    });
  };

  RecipesSection.prototype.sanitizeRecipe = function sanitizeRecipe() {
    var trimmedIngredients = this.state.newRecipeIngredients.split(",");
    trimmedIngredients.forEach(function (val, i) {
      return trimmedIngredients[i] = val.length > 50 ? val.slice(0, 50).trim() : val.trim();
    });
    trimmedIngredients = trimmedIngredients.join(",");
    var trimmedTitle = this.state.newRecipeTitle.trim();
    return { title: trimmedTitle, ingredients: trimmedIngredients };
  };

  RecipesSection.prototype.saveRecipe = function saveRecipe() {
    var _this5 = this;

    var sanitizedRecipe = this.sanitizeRecipe();
    var existingRecipes = this.state.recipes;
    if (this.state.recipeIndex === -1 && this.state.newRecipeTitle !== "") existingRecipes.push(sanitizedRecipe);else if (this.state.newRecipeTitle !== "") existingRecipes.splice(this.state.recipeIndex, 1, sanitizedRecipe);
    this.setState({ recipes: existingRecipes,
      recipeIndex: -1 }, function () {
      _this5.resetRecipeValues();
      _this5.updateLocalStorage();
    });
  };

  RecipesSection.prototype.resetRecipeValues = function resetRecipeValues() {
    var _this6 = this;

    this.setState({
      newRecipeTitle: "Enter title here",
      newRecipeIngredients: "Enter ingredients seperated by commas eg (butter,sugar,chocolate)"
    }, function () {
      _this6.toggleMaker();
    });
  };

  RecipesSection.prototype.titleChanged = function titleChanged(e) {
    var val = e.target.value;
    this.setState({
      newRecipeTitle: val.length > 80 ? val.slice(0, 50) : val
    });
  };

  RecipesSection.prototype.recipeChanged = function recipeChanged(e) {
    var val = e.target.value;
    this.setState({
      newRecipeIngredients: val
    });
  };

  RecipesSection.prototype.render = function render() {
    var _this7 = this;

    if (this.state.makingRecipe) return React.createElement(
      "div",
      { className: "recipeMaker" },
      React.createElement(
        "div",
        { className: "textAreaWrapper" },
        React.createElement("textArea", { className: "titleEditor", onChange: this.titleChanged, value: this.state.newRecipeTitle })
      ),
      React.createElement(
        "div",
        { className: "textAreaWrapper" },
        React.createElement("textArea", { className: "ingredientEditor", onChange: this.recipeChanged, value: this.state.newRecipeIngredients })
      ),
      React.createElement(
        "div",
        { className: "buttonContainer" },
        React.createElement(
          "div",
          { className: "button-primary saveButton", onClick: this.saveRecipe },
          React.createElement("i", { className: "fa fa-floppy-o fa-2x", "aria-hidden": "true" })
        ),
        React.createElement(
          "div",
          { className: "button-primary backButton", onClick: this.resetRecipeValues },
          React.createElement("i", { className: "fa fa-arrow-left fa-2x", "aria-hidden": "true" })
        )
      )
    );else return React.createElement(
      "div",
      { className: "recipesSection" },
      React.createElement(
        "div",
        { className: "buttonContainer", onClick: this.toggleMaker },
        React.createElement("i", { className: "button-primary fa fa-plus-square fa-2x", "aria-hidden": "true" })
      ),
      this.state.recipes.map(function (recipeDetails, i) {
        return React.createElement(RecipeInfo, { key: i, recipeDetails: recipeDetails, deleteFn: _this7.deleteRecipe, index: i, editRecipe: _this7.editRecipe });
      })
    );
  };

  return RecipesSection;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "App" },
      React.createElement(
        "h1",
        null,
        "Recipe Box"
      ),
      React.createElement(RecipesSection, null),
      React.createElement(
        "div",
        { className: "signature" },
        React.createElement(
          "p",
          null,
          React.createElement("i", { className: "fa fa-heart", "aria-hidden": "true" })
        )/**/
      )
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
