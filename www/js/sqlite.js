"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cardheader = function (_React$Component) {
  _inherits(Cardheader, _React$Component);

  function Cardheader() {
    _classCallCheck(this, Cardheader);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Cardheader.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "header" },
      React.createElement(
        "h1",
        { className: "heading" },
        this.props.text
      )
    );
  };

  return Cardheader;
}(React.Component);

var Listitem = function (_React$Component2) {
  _inherits(Listitem, _React$Component2);

  function Listitem(props) {
    _classCallCheck(this, Listitem);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    var localStorageObject = JSON.parse(localStorage.getItem(_this2.props.item));
    _this2.state = localStorageObject || { class: "", text: "", checked: false, edit: false, color: 'white' };
    return _this2;
  }

  Listitem.prototype.componentDidUpdate = function componentDidUpdate() {
    localStorage.setItem(this.props.item, JSON.stringify({
      class: this.state.class,
      text: "",
      checked: this.state.checked,
      edit: false,
      color: this.state.color
    }));
  };

  Listitem.prototype.toggleItem = function toggleItem(e) {
    this.setState({ checked: e.target.checked });
    var newClass = e.target.checked === true ? "checked" : "";
    this.setState({ class: newClass });
  };

  Listitem.prototype.toggleEdit = function toggleEdit(e) {
    if (this.state.edit) {
      this.props.onEdit(this.props.item, this.state.text);
    }
    this.setState({ edit: !this.state.edit, text: this.props.item });
    e.target.innerText = e.target.innerText == "Edit" ? "Done" : "Edit";
  };

  Listitem.prototype.handleChange = function handleChange(e) {
    this.setState({ text: e.target.value });
  };

  Listitem.prototype.handleDelete = function handleDelete(e) {
    this.props.onDelete(this.props.id);
  };

  Listitem.prototype.finishEdit = function finishEdit(e) {
    if (e.keyCode == 13) {
      this.setState({ edit: !this.state.edit });
      this.props.onEdit(this.props.item, this.state.text);
    }
  };

  Listitem.prototype.changeColor = function changeColor(e) {
    var colors = ['white', '#02ff67', '#ff0000', '#ffa202', '#02d8ff', '#ab3cc4'];
    var newColor = colors[colors.indexOf(this.state.color) + 1] || colors[0];
    this.setState({ color: newColor });
  };

  Listitem.prototype.render = function render() {
    var text = React.createElement(
      "label",
      { className: this.state.class },
      this.props.item
    );
    if (this.state.edit) {
      text = React.createElement("input", { type: "textbox", className: "item_input",
        value: this.state.text, onChange: this.handleChange.bind(this),
        onKeyDown: this.finishEdit.bind(this) });
    }
    return React.createElement(
      "li",
      { className: "list_item", style: { background: this.state.color } },
      React.createElement("input", { onChange: this.toggleItem.bind(this), checked: this.state.checked,
        type: "checkbox", style: { display: this.state.edit ? 'none' : 'block' } }),
      text,
      React.createElement("button", { className: "color_btn btn", onClick: this.changeColor.bind(this),
        style: { background: this.state.color } }),
      React.createElement(
        "button",
        { className: "edit_btn btn", onClick: this.toggleEdit.bind(this) },
        "Edit"
      ),
      React.createElement(
        "button",
        { className: "delete_btn btn", onClick: this.handleDelete.bind(this) },
        "Delete"
      )
    );
  };

  return Listitem;
}(React.Component);

var Cardmain = function (_React$Component3) {
  _inherits(Cardmain, _React$Component3);

  function Cardmain() {
    _classCallCheck(this, Cardmain);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Cardmain.prototype.render = function render() {
    var _this4 = this;

    var list = this.props.items.map(function (item, i) {
      return React.createElement(Listitem, { item: item, id: i, key: item, onDelete: _this4.props.onDelete, onEdit: _this4.props.onEdit });
    });
    return React.createElement(
      "div",
      { className: "main" },
      React.createElement(
        "ul",
        null,
        list
      )
    );
  };

  return Cardmain;
}(React.Component);

var Cardfooter = function (_React$Component4) {
  _inherits(Cardfooter, _React$Component4);

  function Cardfooter() {
    _classCallCheck(this, Cardfooter);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Cardfooter.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "footer" },
      React.createElement(
        "form",
        null,
        React.createElement("input", { className: "footer_input", type: "text", onChange: this.props.onChange, value: this.props.value }),
        React.createElement(
          "button",
          { className: "add_btn btn", type: "submit", onClick: this.props.onClick },
          "Add"
        )
      )
    );
  };

  return Cardfooter;
}(React.Component);

var Extrafeatures = function (_React$Component5) {
  _inherits(Extrafeatures, _React$Component5);

  function Extrafeatures() {
    _classCallCheck(this, Extrafeatures);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  Extrafeatures.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "extra_features" },
      React.createElement(
        "button",
        { className: "export_btn btn", onClick: this.props.onExport },
        "Export"
      ),
      React.createElement("input", { type: "file", className: "import_btn btn", onChange: this.props.onImport })
    );
  };

  return Extrafeatures;
}(React.Component);

var Card = function (_React$Component6) {
  _inherits(Card, _React$Component6);

  function Card(props) {
    _classCallCheck(this, Card);

    var _this7 = _possibleConstructorReturn(this, _React$Component6.call(this, props));

    _this7.state = { text: '', items: localStorage.getItem('items') ? localStorage.getItem('items').split(',') : ['item'] };
    return _this7;
  }

  Card.prototype.addItem = function addItem(e) {
    e.preventDefault();
    //no duplicate items in list.
    if (this.state.items.indexOf(this.state.text) == -1 && this.state.text != '') {
      //concat returns new array vs push which alters original
      this.setState({ items: this.state.items.concat(this.state.text),
        text: '' });
    } else {
      this.setState({ text: '' });
    }
  };

  Card.prototype.componentDidUpdate = function componentDidUpdate() {
    localStorage.setItem('items', this.state.items);
  };

  Card.prototype.detectChange = function detectChange(e) {
    this.setState({ text: e.target.value });
  };

  Card.prototype.handleDelete = function handleDelete(item_id) {
    if (this.state.items[item_id]) {
      localStorage.removeItem(this.state.items[item_id]);
      var temp_items = [].concat(this.state.items);
      temp_items.splice([item_id], 1);
      this.setState({ items: temp_items });
    }
  };

  Card.prototype.handleEdit = function handleEdit(item, newItem) {
    //Make sure the edit creates no duplicates in list.
    if (this.state.items.indexOf(newItem) == -1 && newItem != '') {
      localStorage.removeItem(this.state.items[this.state.items.indexOf(item)]);
      this.state.items[this.state.items.indexOf(item)] = newItem;
      this.setState({ items: this.state.items });
    }
  };

  Card.prototype.export = function _export() {
    var items = [].concat(this.state.items);
    var list = items.reduce(function (obj, item) {
      obj[item] = localStorage.getItem(item);
      return obj;
    }, {});
    var blob = new Blob([JSON.stringify(list)], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'exportedList.txt');
  };

  Card.prototype.import = function _import(e) {
    console.log("Coming soon");
  };

  Card.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "card" },
      React.createElement(Cardheader, { text: "My ToDo App" }),
      React.createElement(Cardmain, { items: this.state.items, onDelete: this.handleDelete.bind(this), onEdit: this.handleEdit.bind(this) }),
      React.createElement(Cardfooter, { onClick: this.addItem.bind(this), value: this.state.text, onChange: this.detectChange.bind(this) }),
      React.createElement(Extrafeatures, { onExport: this.export.bind(this), onImport: this.import.bind(this) })
    );
  };

  return Card;
}(React.Component);

ReactDOM.render(React.createElement(Card, null), document.querySelector(".container"));
