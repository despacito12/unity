"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      todo: [],
      nottodo: []
    };
    return _this;
  }

  App.prototype.todoClicked2 = function todoClicked2(todo) {
    var joined = this.state.todo.concat(todo);
    this.setState({ todo: joined });
  };

  App.prototype.nottodoClicked2 = function nottodoClicked2(nottodo) {
    var joined = this.state.nottodo.concat(nottodo);
    this.setState({ nottodo: joined });
  };

  App.prototype.deleteFromTodo = function deleteFromTodo(index) {
    this.state.todo.splice(index, 1);
    this.setState({ todo: this.state.todo });
  };

  App.prototype.deleteFromNotTodo = function deleteFromNotTodo(index) {
    this.state.nottodo.splice(index, 1);
    this.setState({ nottodo: this.state.nottodo });
  };

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(Input, { todoClicked: this.todoClicked2.bind(this), nottodoClicked: this.nottodoClicked2.bind(this) }),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(Todo, { todos: this.state.todo, deleteItem: this.deleteFromTodo.bind(this) }),
        React.createElement(NotTodo, { nottodos: this.state.nottodo, deleteItem: this.deleteFromNotTodo.bind(this) })
      )
    );
  };

  return App;
}(React.Component);

var Input = function (_React$Component2) {
  _inherits(Input, _React$Component2);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      value: ''
    };
    return _this2;
  }

  Input.prototype.typingFunc = function typingFunc(value) {
    this.setState({ value: value });
  };

  Input.prototype.todoClick = function todoClick() {
    this.props.todoClicked(this.state.value);
    this.setState({ value: "" });
  };

  Input.prototype.nottodoClick = function nottodoClick() {
    this.props.nottodoClicked(this.state.value);
    this.setState({ value: "" });
  };

  Input.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(
      "div",
      { className: "form-group" },
      React.createElement(
        "h1",
        { className: "text-center" },
        "Type the todo or not-todo:"
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement("input", { value: this.state.value, onChange: function onChange(event) {
            return _this3.typingFunc(event.target.value);
          }, type: "text", className: "form-control col-md-8 offset-md-2", id: "inp" })
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "button",
          { className: "col-md-2 offset-md-3", onClick: this.todoClick.bind(this) },
          "TODO"
        ),
        React.createElement(
          "button",
          { className: "col-md-2 offset-md-2", onClick: this.nottodoClick.bind(this) },
          "NOT-TODO"
        )
      )
    );
  };

  return Input;
}(React.Component);

var Todo = function (_React$Component3) {
  _inherits(Todo, _React$Component3);

  function Todo(props) {
    _classCallCheck(this, Todo);

    return _possibleConstructorReturn(this, _React$Component3.call(this, props));
  }

  Todo.prototype.render = function render() {
    var _this5 = this;

    return React.createElement(
      "div",
      { className: "col-md-4 offset-md-1", id: "todo" },
      React.createElement(
        "h3",
        { className: "text-center" },
        "DO IT!"
      ),
      this.props.todos.map(function (todo, index) {
        return React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "h4",
            { className: "animated bounceInLeft col-md-8" },
            todo
          ),
          React.createElement(
            "h5",
            { className: "col-md-4 animated bounceInLeft", onClick: function onClick() {
                return _this5.props.deleteItem(index);
              } },
            "x"
          )
        );
      })
    );
  };

  return Todo;
}(React.Component);

var NotTodo = function (_React$Component4) {
  _inherits(NotTodo, _React$Component4);

  function NotTodo(props) {
    _classCallCheck(this, NotTodo);

    return _possibleConstructorReturn(this, _React$Component4.call(this, props));
  }

  NotTodo.prototype.render = function render() {
    var _this7 = this;

    return React.createElement(
      "div",
      { className: "col-md-4 offset-md-2", id: "nottodo" },
      React.createElement(
        "h3",
        { className: "text-center" },
        "DON'T DO IT!"
      ),
      this.props.nottodos.map(function (nottodo, index) {
        return React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "h4",
            { className: "animated bounceInRight col-md-8" },
            nottodo
          ),
          React.createElement(
            "h5",
            { className: "col-md-4 animated bounceInRight", onClick: function onClick() {
                return _this7.props.deleteItem(index);
              } },
            "x"
          )
        );
      })
    );
  };

  return NotTodo;
}(React.Component);

var RemoveTodo = function (_React$Component5) {
  _inherits(RemoveTodo, _React$Component5);

  function RemoveTodo() {
    _classCallCheck(this, RemoveTodo);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  return RemoveTodo;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
