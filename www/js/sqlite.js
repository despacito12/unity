'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var toDoItems = [{
  name: 'Click "Create" to create new task',
  completed: false
}, {
  name: 'Click "Edit" to edit task',
  completetd: false
}, {
  name: 'Click "Delete" to remove task',
  completed: false
}, {
  name: "Click on task to mark as complete",
  completed: false
}];

var CreateItem = function (_React$Component) {
  _inherits(CreateItem, _React$Component);

  function CreateItem() {
    _classCallCheck(this, CreateItem);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  CreateItem.prototype.handleCreate = function handleCreate(e) {
    e.preventDefault();

    if (!this.refs.newItemInput.value) {
      alert('Please enter a task name.');
      return;
    } else if (this.props.toDoItems.map(function (element) {
      return element.name;
    }).indexOf(this.refs.newItemInput.value) != -1) {
      alert('This task already exists.');
      this.refs.newItemInput.value = '';
      return;
    }

    this.props.createItem(this.refs.newItemInput.value);
    this.refs.newItemInput.value = '';
  };

  CreateItem.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'create-new' },
      React.createElement(
        'form',
        { onSubmit: this.handleCreate.bind(this) },
        React.createElement('input', { type: 'text', placeholder: 'New Task', ref: 'newItemInput' }),
        React.createElement(
          'button',
          null,
          'Create'
        )
      )
    );
  };

  return CreateItem;
}(React.Component);

var ToDoListItem = function (_React$Component2) {
  _inherits(ToDoListItem, _React$Component2);

  function ToDoListItem(props) {
    _classCallCheck(this, ToDoListItem);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      editing: false
    };
    return _this2;
  }

  ToDoListItem.prototype.renderName = function renderName() {
    var itemStyle = {
      'text-decoration': this.props.completed ? 'line-through' : 'none',
      cursor: 'pointer'
    };

    if (this.state.editing) {
      return React.createElement(
        'form',
        { onSubmit: this.onSaveClick.bind(this) },
        React.createElement('input', { type: 'text', ref: 'editInput', defaultValue: this.props.name })
      );
    }

    return React.createElement(
      'span',
      { style: itemStyle, onClick: this.props.toggleComplete.bind(this, this.props.name) },
      this.props.name
    );
  };

  ToDoListItem.prototype.renderButtons = function renderButtons() {
    if (this.state.editing) {
      return React.createElement(
        'span',
        null,
        React.createElement(
          'button',
          { onClick: this.onSaveClick.bind(this) },
          'Save'
        ),
        React.createElement(
          'button',
          { onClick: this.onCancelClick.bind(this) },
          'Cancel'
        )
      );
    }

    return React.createElement(
      'span',
      null,
      React.createElement(
        'button',
        { onClick: this.onEditClick.bind(this) },
        'Edit'
      ),
      React.createElement(
        'button',
        { onClick: this.props.deleteItem.bind(this, this.props.name) },
        'Delete'
      )
    );
  };

  ToDoListItem.prototype.onEditClick = function onEditClick() {
    this.setState({ editing: true });
  };

  ToDoListItem.prototype.onCancelClick = function onCancelClick() {
    this.setState({ editing: false });
  };

  ToDoListItem.prototype.onSaveClick = function onSaveClick(e) {
    e.preventDefault();
    this.props.saveItem(this.props.name, this.refs.editInput.value);
    this.setState({ editing: false });
  };

  ToDoListItem.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'to-do-item' },
      React.createElement(
        'span',
        { className: 'name' },
        this.renderName()
      ),
      React.createElement(
        'span',
        { className: 'actions' },
        this.renderButtons()
      )
    );
  };

  return ToDoListItem;
}(React.Component);

var ToDoList = function (_React$Component3) {
  _inherits(ToDoList, _React$Component3);

  function ToDoList() {
    _classCallCheck(this, ToDoList);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  ToDoList.prototype.renderItems = function renderItems() {
    var _this4 = this;

    return this.props.toDoItems.map(function (item, index) {
      return React.createElement(ToDoListItem, _extends({ key: index }, item, _this4.props));
    });
  };

  ToDoList.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'items-list' },
      this.renderItems()
    );
  };

  return ToDoList;
}(React.Component);

var App = function (_React$Component4) {
  _inherits(App, _React$Component4);

  function App(props) {
    _classCallCheck(this, App);

    var _this5 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this5.state = {
      toDoItems: toDoItems
    };
    return _this5;
  }

  App.prototype.createItem = function createItem(item) {
    this.state.toDoItems.unshift({
      name: item,
      completed: false
    });
    this.setState({
      toDoItems: this.state.toDoItems
    });
  };

  App.prototype.findItem = function findItem(item) {
    return this.state.toDoItems.filter(function (element) {
      return element.name === item;
    })[0];
  };

  App.prototype.toggleComplete = function toggleComplete(item) {
    var selectedItem = this.findItem(item);
    selectedItem.completed = !selectedItem.completed;
    this.setState({ toDoItems: this.state.toDoItems });
  };

  App.prototype.saveItem = function saveItem(oldItem, newItem) {
    var selectedItem = this.findItem(oldItem);
    selectedItem.name = newItem;
    this.setState({ toDoItems: this.state.toDoItems });
  };

  App.prototype.deleteItem = function deleteItem(item) {
    var index = this.state.toDoItems.map(function (element) {
      return element.name;
    }).indexOf(item);
    this.state.toDoItems.splice(index, 1);
    this.setState({ toDoItems: this.state.toDoItems });
  };

  App.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'to-do-app' },
      React.createElement(
        'div',
        { className: 'header' },
        React.createElement(
          'h1',
          null,
          'ToDo List'
        )
      ),
      React.createElement(CreateItem, { toDoItems: this.state.toDoItems, createItem: this.createItem.bind(this) }),
      React.createElement(ToDoList, { toDoItems: this.state.toDoItems, deleteItem: this.deleteItem.bind(this), saveItem: this.saveItem.bind(this), toggleComplete: this.toggleComplete.bind(this) })
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
