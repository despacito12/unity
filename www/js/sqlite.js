'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var todoItems = [{
    name: 'Kiss Argel',
    completed: true
}, {
    name: 'Pass the Exam',
    completed: false
}, {
    name: 'Present to sir Rufo',
    completed: false
}];

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = { todoItems: todoItems };
        return _this;
    }

    App.prototype.render = function render() {
        var _this2 = this;

        var items = this.state.todoItems;
        items = items.map(function (item, index) {
            return React.createElement(TodoItem, { item: item, key: index, onDelete: _this2.onDelete.bind(_this2), onSave: _this2.onSave.bind(_this2), toggleComplete: _this2.toggleComplete.bind(_this2) });
        });
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                { className: 'header' },
                ' My to do List '
            ),
            React.createElement(AddItem, { onAdd: this.onAdd.bind(this), items: this.state.todoItems }),
            React.createElement(
                'ul',
                { className: 'todo-list' },
                items
            )
        );
    };

    App.prototype.onDelete = function onDelete(item) {
        var updatedItems = this.state.todoItems;
        updatedItems = updatedItems.filter(function (value, index) {
            return item !== value;
        });
        this.setState({
            todoItems: updatedItems
        });
    };

    App.prototype.onAdd = function onAdd(newTaskName) {
        var updatedItems = this.state.todoItems;
        updatedItems.push({
            name: newTaskName,
            completed: false
        });
        this.setState({
            todoItems: updatedItems
        });
    };

    App.prototype.onSave = function onSave(oldItem, newName) {
        var thisItem = this.state.todoItems.filter(function (item) {
            return item === oldItem;
        })[0];
        thisItem.name = newName;
        this.setState({
            todoItems: this.state.todoItems
        });
    };

    App.prototype.toggleComplete = function toggleComplete(clickedItem) {
        var thisItem = this.state.todoItems.filter(function (item) {
            return item === clickedItem;
        })[0];
        thisItem.completed = !thisItem.completed;
        this.setState({
            todoItems: this.state.todoItems
        });
    };

    return App;
}(React.Component);

var AddItem = function (_React$Component2) {
    _inherits(AddItem, _React$Component2);

    function AddItem(props) {
        _classCallCheck(this, AddItem);

        var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this3.state = {
            infoMessage: ''
        };
        return _this3;
    }

    AddItem.prototype.render = function render() {
        return React.createElement(
            'form',
            { className: 'add-item-form', onSubmit: this.handleSubmit.bind(this) },
            React.createElement('input', { className: 'add-item-input', type: 'text', placeholder: 'a new task to do...', ref: 'newItem' }),
            React.createElement('input', { className: 'add-item-button', type: 'submit', value: 'add' }),
            React.createElement(
                'p',
                { className: 'add-item-info' },
                ' ',
                this.state.infoMessage,
                ' '
            )
        );
    };

    AddItem.prototype.handleSubmit = function handleSubmit(e) {
        e.preventDefault();
        var value = this.refs.newItem.value;
        var isInList = this.props.items.filter(function (item) {
            return item.name.toUpperCase() == value.toUpperCase();
        }).length;
        console.log(isInList);

        if (!value) {
            this.setState({
                infoMessage: 'you want to add an empty task?'
            });
        } else if (isInList) {
            this.setState({
                infoMessage: 'this task already exists!'
            });
        } else {
            this.props.onAdd(value);
            this.refs.newItem.value = '';
            this.setState({
                infoMessage: ''
            });
        }
    };

    return AddItem;
}(React.Component);

var TodoItem = function (_React$Component3) {
    _inherits(TodoItem, _React$Component3);

    function TodoItem(props) {
        _classCallCheck(this, TodoItem);

        var _this4 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

        _this4.state = {
            editing: false
        };
        return _this4;
    }

    TodoItem.prototype.render = function render() {
        return React.createElement(
            'li',
            { className: 'todo-item' },
            this.renderTodoItem()
        );
    };

    TodoItem.prototype.renderTodoItem = function renderTodoItem() {
        var isCompleted = this.props.item.completed;

        if (this.state.editing) {
            return React.createElement(
                'form',
                { className: 'todo-item-wrapper', onSubmit: this.handleSave.bind(this) },
                React.createElement('input', { className: 'editing-form-input', type: 'text', ref: 'editingItem', defaultValue: this.props.item.name, onFocus: this.handleFocus.bind(this), autoFocus: true }),
                this.renderButtons()
            );
        }

        return React.createElement(
            'div',
            { className: 'todo-item-wrapper' },
            React.createElement(
                'p',
                { className: isCompleted ? 'todo-item-name--completed' : 'todo-item-name', onClick: this.props.toggleComplete.bind(this, this.props.item) },
                this.props.item.name
            ),
            this.renderButtons()
        );
    };

    TodoItem.prototype.renderButtons = function renderButtons() {
        if (this.state.editing) {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { className: 'button', type: 'button', onClick: this.handleSave.bind(this) },
                    ' save '
                ),
                React.createElement(
                    'button',
                    { className: 'button', type: 'button', onClick: this.onCancel.bind(this) },
                    ' cancel '
                )
            );
        }
        return React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                { className: 'button', type: 'button', onClick: this.onEdit.bind(this) },
                ' edit '
            ),
            React.createElement(
                'button',
                { className: 'button', type: 'button', onClick: this.props.onDelete.bind(this, this.props.item) },
                ' delete '
            )
        );
    };

    TodoItem.prototype.onEdit = function onEdit() {
        this.setState({
            editing: true
        });
    };

    TodoItem.prototype.onCancel = function onCancel() {
        this.setState({
            editing: false
        });
    };

    TodoItem.prototype.handleSave = function handleSave(e) {
        e.preventDefault();
        this.setState({
            editing: false
        });
        this.props.onSave(this.props.item, this.refs.editingItem.value);
    };

    TodoItem.prototype.handleFocus = function handleFocus(e) {
        e.target.select();
    };

    return TodoItem;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
