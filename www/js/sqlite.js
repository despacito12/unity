"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContactRow = function (_React$Component) {
  _inherits(ContactRow, _React$Component);

  function ContactRow() {
    _classCallCheck(this, ContactRow);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ContactRow.prototype.render = function render() {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        this.props.contact.name
      ),
      React.createElement(
        "td",
        null,
        this.props.contact.phone
      ),
      React.createElement(
        "td",
        null,
        this.props.contact.email
      )
    );
  };

  return ContactRow;
}(React.Component);

var ContactTable = function (_React$Component2) {
  _inherits(ContactTable, _React$Component2);

  function ContactTable() {
    _classCallCheck(this, ContactTable);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  ContactTable.prototype.render = function render() {
    var _this3 = this;

    var rows = [];
    this.props.contacts.forEach(function (contact) {
      if (contact.name.indexOf(_this3.props.filterText) === -1) {
        return;
      }
      rows.push(React.createElement(ContactRow, { key: contact.key, contact: contact }));
    });
    return React.createElement(
      "table",
      { className: "table table-hover" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            React.createElement("i", { className: "fa fa-fw fa-user" }),
            "Name"
          ),
          React.createElement(
            "th",
            null,
            React.createElement("i", { className: "fa fa-fw fa-phone" }),
            "Phone"
          ),
          React.createElement(
            "th",
            null,
            React.createElement("i", { className: "fa fa-fw fa-envelope" }),
            "Email"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        rows
      )
    );
  };

  return ContactTable;
}(React.Component);

var SearchBar = function (_React$Component3) {
  _inherits(SearchBar, _React$Component3);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this4 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this4.handleFilterTextInputChange = _this4.handleFilterTextInputChange.bind(_this4);
    return _this4;
  }

  SearchBar.prototype.handleFilterTextInputChange = function handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  };

  SearchBar.prototype.render = function render() {
    return React.createElement(
      "form",
      null,
      React.createElement("input", {
        className: "form-control",
        type: "text",
        placeholder: "Search...",
        value: this.props.filterText,
        onChange: this.handleFilterTextInputChange
      })
    );
  };

  return SearchBar;
}(React.Component);

var FilterableContactTable = function (_React$Component4) {
  _inherits(FilterableContactTable, _React$Component4);

  function FilterableContactTable(props) {
    _classCallCheck(this, FilterableContactTable);

    // FilterableContactTable is the owner of the state as the filterText is needed in both nodes (searchbar and table) that are below in the hierarchy tree.

    var _this5 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this5.state = {
      filterText: '',
      contacts: [{ key: 1, name: 'Tom bong', phone: '555-444-333', email: 'tom@gmail.com' },
       { key: 2, name: 'Jaja colin', phone: '555-777-888', email: 'jcol@gmail.com' },
        { key: 3, name: 'Lolo Degong', phone: '555-222-111', email: 'gong.com' }
         ]
    };
    _this5.handleFilterTextInput = _this5.handleFilterTextInput.bind(_this5);
    _this5.addContact = _this5.addContact.bind(_this5);
    return _this5;
  }

  FilterableContactTable.prototype.addContact = function addContact(contact) {
    var timestamp = new Date().getTime();
    contact['key'] = timestamp;
    console.log('BEFORE: this.state.contacts: ' + this.state.contacts.length);
    // update the state object
    this.state.contacts.push(contact);
    // set the state
    this.setState({ contacts: this.state.contacts });
  };

  FilterableContactTable.prototype.handleFilterTextInput = function handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    this.setState({
      filterText: filterText
    });
    //React knows the state has changed, and calls render() method again to learn what should be on the screen
  };

  FilterableContactTable.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "React Contacts List App"
      ),
      React.createElement(SearchBar, {
        filterText: this.state.filterText,
        onFilterTextInput: this.handleFilterTextInput
      }),
      React.createElement(NewContactRow, { addContact: this.addContact }),
      React.createElement(ContactTable, {
        contacts: this.state.contacts,
        filterText: this.state.filterText
      })
    );
  };

  return FilterableContactTable;
}(React.Component);

var NewContactRow = function (_React$Component5) {
  _inherits(NewContactRow, _React$Component5);

  function NewContactRow(props) {
    _classCallCheck(this, NewContactRow);

    var _this6 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

    _this6.handleSubmit = _this6.handleSubmit.bind(_this6);
    return _this6;
  }

  NewContactRow.prototype.handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    var target = event.target;
    var name = target.name.value;
    var phone = target.phone.value;
    var email = target.email.value;

    var contact = {
      name: name,
      phone: phone,
      email: email
    };
    this.props.addContact(contact);
  };

  NewContactRow.prototype.render = function render() {
    return React.createElement(
      "form",
      { className: "form-inline", onSubmit: this.handleSubmit },
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "div",
          { className: "col-md-3" },
          React.createElement("input", { type: "text", name: "name", className: "form-control", id: "nameInput", placeholder: "Name" })
        ),
        React.createElement(
          "div",
          { className: "col-md-3" },
          React.createElement("input", { type: "text", name: "phone", className: "form-control", id: "phoneInput", placeholder: "Phone" })
        ),
        React.createElement(
          "div",
          { className: "col-md-3" },
          React.createElement("input", { type: "email", name: "email", className: "form-control", id: "emailInput", placeholder: "Email" })
        ),
        React.createElement(
          "div",
          { className: "col-md-3" },
          React.createElement(
            "button",
            { type: "submit", className: "btn btn-primary" },
            React.createElement("i", { className: "fa fa-fw fa-plus" }),
            "Add"
          )
        )
      )
    );
  };

  return NewContactRow;
}(React.Component);

var CONTACTS = [{ key: 1, name: 'Tom bong', phone: '555-444-333', email: 'tom@gmail.com' }, { key: 2, name: 'Jaja colin', phone: '555-777-888', email: 'jcol@gmail.com' }, { key: 3, name: 'Lolo Degong', phone: '555-222-111', email: 'gong@gmail.com' }];

ReactDOM.render(React.createElement(FilterableContactTable, { contacts: CONTACTS }), document.getElementById('container'));
