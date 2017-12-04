"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var home = document.querySelector("#app");

var ToDoItem = function (_React$Component) {
  _inherits(ToDoItem, _React$Component);

  function ToDoItem(props) {
    _classCallCheck(this, ToDoItem);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      complete: false
    };
    // this.handleDelete = this.handleDelete.bind(this);
    _this.itsDone = _this.itsDone.bind(_this);
    return _this;
  }
  // handleDelete() {
  //   const { singleDelete, index, key } = this.props;
  //   singleDelete(index, key);
  // }

  ToDoItem.prototype.itsDone = function itsDone() {
    var _props = this.props;
    var updateCompleteList = _props.updateCompleteList;
    var item = _props.item;

    item.doneStatus = !item.doneStatus;
    this.setState({
      complete: !this.state.complete
    });
    updateCompleteList(item);
  };

  ToDoItem.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "card" },
      React.createElement(
        "label",
        { className: "checkbox" },
        React.createElement("input", { type: "checkbox", onClick: this.itsDone })
      ),
      React.createElement(
        "div",
        { className: "card-title" },
        React.createElement(
          "p",
          { className: this.state.complete ? "struck" : "unstruck" },
          this.props.task
        )
      ),
      React.createElement("p", null)
    );
  };

  return ToDoItem;
}(React.Component);

var DeleteButton = function DeleteButton(_ref) {
  var bigDelete = _ref.bigDelete;
  return React.createElement(
    "button",
    { type: "submit", className: "button is-danger", onClick: bigDelete },
    "Delete"
  );
};

var ToDoList = function (_React$Component2) {
  _inherits(ToDoList, _React$Component2);

  function ToDoList(props) {
    _classCallCheck(this, ToDoList);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      tasks: [],
      doneTasks: [],
      entry: ""
    };
    _this2.addItem = _this2.addItem.bind(_this2);
    _this2.updateEntry = _this2.updateEntry.bind(_this2);
    // this.singleDelete = this.singleDelete.bind(this);
    _this2.bigDelete = _this2.bigDelete.bind(_this2);
    _this2.updateCompleteList = _this2.updateCompleteList.bind(_this2);
    return _this2;
  }

  ToDoList.prototype.addItem = function addItem(event) {
    var taskArray = this.state.tasks;
    if (this.state.entry !== "") {
      taskArray.push({
        text: this.state.entry,
        key: Date.now(),
        doneStatus: false
      });
      this.setState({
        tasks: taskArray,
        entry: ""
      });
    }
    event.preventDefault();
  };

  ToDoList.prototype.updateEntry = function updateEntry(event) {
    this.setState({
      entry: event.target.value
    });
  };
  //BUG: SingleDelete is clearing doneTasks state; "doneTasks" state is empty, and remaing checked items cannot be bigDeleted. Key is undefined here.
  // singleDelete(index, key) {
  //   const doneTasksArray = [...this.state.doneTasks];
  //   this.state.tasks.splice(index, 1);
  //   const isNotDeleted = task => task.key !== key;
  //   const scrubbedArray = doneTasksArray.filter(isNotDeleted);
  //   console.log(this.state.doneTasks);
  //   this.setState(
  //     {
  //       tasks: this.state.tasks,
  //       doneTasks: scrubbedArray
  //     },
  //     console.log(this.state.doneTasks)
  //   );
  // }

  ToDoList.prototype.bigDelete = function bigDelete() {
    var _state = this.state;
    var tasks = _state.tasks;
    var doneTasks = _state.doneTasks;

    var allTasks = [].concat(tasks, doneTasks);
    var scrubber = function scrubber(task) {
      if (tasks.indexOf(task) === -1 || doneTasks.indexOf(task) === -1) {
        return task;
      }
    };
    var scrubbedArray = allTasks.filter(scrubber);
    this.setState({
      tasks: scrubbedArray,
      doneTasks: []
    }, console.log(this.state.doneTasks));
  };

  ToDoList.prototype.updateCompleteList = function updateCompleteList(item) {
    var updatedDoneTasks = this.state.doneTasks;
    if (item.doneStatus === true) {
      updatedDoneTasks.push(item);
    } else {
      updatedDoneTasks = updatedDoneTasks.filter(function (task) {
        return task !== item;
      });
    }
    this.setState({
      doneTasks: updatedDoneTasks
    }, console.log(updatedDoneTasks));
  };

  ToDoList.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(
      "div",
      { className: "todoList" },
      React.createElement(
        "p",
        { className: "task-counter" },
        "Completed tasks: ",
        this.state.doneTasks.length
      ),
      React.createElement(
        "form",
        { onSubmit: this.addItem },
        React.createElement("input", {
          type: "text",
          className: "input is-info",
          placeholder: "Enter task...",
          value: this.state.entry,
          onChange: this.updateEntry,
          maxlength: "50"
        }),
        React.createElement(
          "button",
          {
            type: "submit",
            className: "button is-info",
            onClick: this.addItem
          },
          "Add"
        ),
        React.createElement(DeleteButton, { bigDelete: this.bigDelete })
      ),
      React.createElement(
        "div",
        null,
        this.state.tasks.map(function (item, index) {
          return React.createElement(ToDoItem, {
            item: item,
            index: index,
            key: item.key,
            task: item.text,
            doneStatus: item.doneStatus,
            singleDelete: _this3.singleDelete,
            updateCompleteList: _this3.updateCompleteList
          });
        })
      )
    );
  };

  return ToDoList;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(ToDoList, null);
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), home);
