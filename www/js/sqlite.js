"use strict";

var Parent = React.createClass({
  displayName: "Parent",

  getInitialState: function getInitialState() {
    return { signup: false, login: true };
  },
  switch: function _switch(word) {
    var signup, login;
    if (word == "signup") {
      signup = true;login = false;
    } else {
      login = true;signup = false;
    }
    return this.setState({ login: login, signup: signup });
  },
  render: function render() {

    var self = this;
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { id: "buttons" },
        React.createElement(
          "p",
          { id: "signupButton", onClick: self.switch.bind(null, "signup"), className: self.state.signup ? "yellow" : "blue" },
          "Sign In"
        ),
        React.createElement(
          "p",
          { id: "loginButton", onClick: self.switch.bind(null, "login"), className: self.state.login ? "yellow" : "blue" },
          " Login"
        )
      ),
      self.state.signup ? React.createElement(Signup, null) : null,
      self.state.login ? React.createElement(Login, null) : null
    );
  }
});

var Signup = React.createClass({
  displayName: "Signup",

  render: function render() {

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { id: "signup" },
        React.createElement("input", { type: "text", id: "first", placeholder: "First Name" }),
        React.createElement("input", { type: "text", id: "last", placeholder: "Last Name" }),
        React.createElement("input", { type: "email", id: "email", placeholder: "Email" }),
        React.createElement("input", { type: "password", id: "password", placeholder: "Password" }),
        React.createElement("input", { type: "password", id: "confirm", placeholder: "Confirm Password" }),
        React.createElement(
          "button",
          { id: "send" },
          "Send"
        )
      )
    );
  }
});

var Login = React.createClass({
  displayName: "Login",

  render: function render() {

    return React.createElement(
      "div",
      null,
      React.createElement(
        "root",
        { id: "login" },
        React.createElement("input", { type: "email", id: "email", placeholder: "Email" }),
        React.createElement("input", { type: "password", id: "password", placeholder: "Password" }),
        React.createElement(
          "button",
          { id: "send" },
          "Send"
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(Parent, null), document.getElementById("space"));
