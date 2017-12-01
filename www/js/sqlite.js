'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Redux = Redux;
var createStore = _Redux.createStore;
var combineReducers = _Redux.combineReducers;
var _ReactRedux = ReactRedux;
var connect = _ReactRedux.connect;
var Provider = _ReactRedux.Provider;

var index = -1;

function AddTodo(text) {
  return {
    type: 'ADD_TODO',
    text: text
  };
}

function RemoveTodo(index) {
  return {
    type: 'REMOVE_TODO',
    index: index
  };
}

function ToggleTodo(index) {
  return {
    type: 'TOGGLE_TODO',
    index: index
  };
}

function EditTodo(index) {
  return {
    type: 'EDIT_TODO',
    index: index
  };
}

function ChangeTodo(index, text) {
  return {
    type: 'CHANGE_TODO',
    index: index,
    text: text
  };
}

function SetVisibilityFilter(filter) {
  return {
    type: 'SET_VISIBILTY_FILTER',
    filter: filter
  };
}

function visibilityReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'SET_VISIBILTY_FILTER':
      return action.filter;
      break;
  }

  return state;
}

function todoApp() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_TODO':
      index += 1;
      return [].concat(state, [{
        index: index,
        text: action.text,
        isCompleted: false,
        isEditing: false
      }]);
      break;
    case 'TOGGLE_TODO':
      return state.map(function (t) {
        if (t.index === action.index) {
          t.isCompleted = !t.isCompleted;
        }

        return t;
      });
      break;
    case 'REMOVE_TODO':
      return state.filter(function (t) {
        return t.index !== action.index;
      });
      break;
    case 'EDIT_TODO':
      return state.map(function (t) {
        if (t.index === action.index) {
          t.isEditing = !t.isEditing;
        }

        return t;
      });
      break;
    case 'CHANGE_TODO':
      return state.map(function (t) {
        if (t.index === action.index) {
          t.text = action.text;
        }

        return t;
      });
      break;
  }

  return state;
}

var store = createStore(combineReducers({
  todos: todoApp,
  visibility: visibilityReducer
}));

store.dispatch(AddTodo('Go to school'));
store.dispatch(AddTodo('Meet sir Ruffo'));
store.dispatch(AddTodo('Review for the exam'));
store.dispatch(ToggleTodo(1));


var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(s) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, s));

    _this.state = {
      openSidebar: false
    };

    _this.getTodos = _this.getTodos.bind(_this);
    _this.toggleSidebar = _this.toggleSidebar.bind(_this);
    return _this;
  }

  App.prototype.getTodos = function getTodos() {
    switch (this.props.visibility) {
      case 'all':
        return this.props.todos;
        break;

      case 'completed':
        return this.props.todos.filter(function (t) {
          return t.isCompleted === true;
        });
        break;

      case 'active':
        return this.props.todos.filter(function (t) {
          return t.isCompleted === false;
        });
        break;
    }
  };

  App.prototype.toggleSidebar = function toggleSidebar() {
    this.setState({
      openSidebar: !this.state.openSidebar
    });
  };

  App.prototype.render = function render() {
    var _this2 = this;

    var todos = this.getTodos();

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: this.state.openSidebar ? 'sidebar open' : 'sidebar' },
        React.createElement(
          'ul',
          null,
          React.createElement(
            'li',
            { onClick: function onClick() {
                _this2.props.setVisibility('all');
                _this2.toggleSidebar();
              }, className: this.props.visibility === 'all' ? 'active' : '' },
            React.createElement(
              'span',
              null,
              'All'
            )
          ),
          React.createElement(
            'li',
            { onClick: function onClick() {
                _this2.props.setVisibility('completed');
                _this2.toggleSidebar();
              }, className: this.props.visibility === 'completed' ? 'active' : '' },
            React.createElement(
              'span',
              null,
              'Completed'
            )
          ),
          React.createElement(
            'li',
            { onClick: function onClick() {
                _this2.props.setVisibility('active');
                _this2.toggleSidebar();
              }, className: this.props.visibility === 'active' ? 'active' : '' },
            React.createElement(
              'span',
              null,
              'Active'
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'head' },
        React.createElement(
          'div',
          { className: 'sidebarButton', onClick: this.toggleSidebar },
          React.createElement('span', null),
          React.createElement('span', null),
          React.createElement('span', null)
        ),
        React.createElement(
          'h1',
          null,
          'To Do'
        )
      ),
      React.createElement(AddTodoC, { handleAddTodo: this.props.onAddTodo }),
      React.createElement(TodoList, { todoList: todos, handleToggleClick: this.props.onToggleTodo, handleEditClick: this.props.onEditTodo, handleRemoveClick: this.props.onRemoveTodo, handleChange: this.props.onChangeTodo })
    );
  };

  return App;
}(React.Component);

function mapDispatchToProps(dispatch) {
  return {
    onToggleTodo: function onToggleTodo(index) {
      dispatch(ToggleTodo(index));
    },
    onEditTodo: function onEditTodo(index) {
      dispatch(EditTodo(index));
    },
    onRemoveTodo: function onRemoveTodo(index) {
      dispatch(RemoveTodo(index));
    },
    onAddTodo: function onAddTodo(text) {
      dispatch(AddTodo(text));
    },
    setVisibility: function setVisibility(filter) {
      dispatch(SetVisibilityFilter(filter));
    },
    onChangeTodo: function onChangeTodo(index, text) {
      dispatch(ChangeTodo(index, text));
    }
  };
}

function mapStateToPros(state) {
  return {
    todos: state.todos,
    visibility: state.visibility
  };
}

var AddTodoC = function AddTodoC(_ref) {
  var handleAddTodo = _ref.handleAddTodo;
  return React.createElement(
    'div',
    { className: 'addTodo' },
    React.createElement(
      'p',
      null,
      'Add Todo:'
    ),
    React.createElement('input', { type: 'text', onKeyPress: function onKeyPress(e) {
        if (e.key === 'Enter') {
          handleAddTodo(e.target.value);
          e.target.value = '';
        }
      } })
  );
};

var TodoList = function TodoList(_ref2) {
  var todoList = _ref2.todoList;
  var handleToggleClick = _ref2.handleToggleClick;
  var handleEditClick = _ref2.handleEditClick;
  var handleRemoveClick = _ref2.handleRemoveClick;
  var handleChange = _ref2.handleChange;
  return React.createElement(
    'div',
    { className: 'todos' },
    todoList.map(function (t) {
      return React.createElement(Todo, _extends({ key: t.index }, t, { handleToggleClick: handleToggleClick, handleEditClick: handleEditClick, handleRemoveClick: handleRemoveClick, handleChange: handleChange }));
    })
  );
};

var Todo = function Todo(_ref3) {
  var text = _ref3.text;
  var isCompleted = _ref3.isCompleted;
  var index = _ref3.index;
  var isEditing = _ref3.isEditing;
  var handleToggleClick = _ref3.handleToggleClick;
  var handleEditClick = _ref3.handleEditClick;
  var handleRemoveClick = _ref3.handleRemoveClick;
  var handleChange = _ref3.handleChange;
  return React.createElement(
    'div',
    { className: isCompleted ? 'todo finished' : 'todo' },
    React.createElement(
      'div',
      { className: 'text' },
      isEditing === true ? React.createElement('input', { type: 'text', defaultValue: text, onKeyPress: function onKeyPress(e) {
          if (e.key === 'Enter') {
            handleChange(index, e.target.value);
            handleEditClick(index);
          }
        } }) : React.createElement(
        'p',
        null,
        text
      )
    ),
    React.createElement('span', { className: 'btn-complete', onClick: function onClick() {
        return handleToggleClick(index);
      } }),
    React.createElement('span', { className: isEditing ? 'btn-editing' : 'btn-edit', onClick: function onClick() {
        return handleEditClick(index);
      } }),
    React.createElement('span', { className: 'btn-remove', onClick: function onClick() {
        return handleRemoveClick(index);
      } })
  );
};

App = connect(mapStateToPros, mapDispatchToProps)(App);

ReactDOM.render(React.createElement(
  Provider,
  { store: store },
  React.createElement(App, null)
), document.getElementById('app'));
