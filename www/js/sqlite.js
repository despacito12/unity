"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var temporary = "";
var curring = "";
var currrep;
var first = true;
var opened = false;
var toast = new rep("Toast", ["Bread", "Heat"]);
var cheesecake = new rep("Cheese-Cake", ["Cheese", "Graham Cracker"]);
var cereal = new rep("Cereal", ["Cereal", "Milk", "Banana"]);
var pizza = new rep("Pizza", ["Cheese", "Dough", "Pepperoni"]);
var cake = new rep("Cake", ["Flour", "Sugar", "Frosting"]);
var masterarray = [toast, cheesecake, cereal, pizza, cake];

var retrievedObject = JSON.parse(localStorage.getItem("fcckey"));

if (retrievedObject == null) {
  localStorage.setItem("fcckey", JSON.stringify(masterarray));
  var retrievedObject = JSON.parse(localStorage.getItem("fcckey"));
}

$("document").ready(function () {
  setTimeout(function () {
    dropdown();
  }, 600);
}); //end of doc ready

function clicker(did) {
  var temp = JSON.parse(localStorage.getItem("fcckey"));
  var ingre = "";
  var bool = false;
  if ($("#" + did + "ing").css("display") == "block") {
    bool = true;
  }
  for (var i = 0; i < temp.length; i++) {

    $("#" + temp[i].name + "ing").css("display", "none");
    $("#" + temp[i].name + "ing").removeClass("show");
    $("#" + temp[i].name + "ing").html("");

    if (did === temp[i].name) {
      ingre = temp[i].ingredients;
      curring = ingre;
      currrep = did;
    }
  }
  if (bool) {
    $("#" + did + "ing").css("display", "none");
  } else {
    React.render(React.createElement(Ingredients, null), document.getElementById(did + "ing"));
    $("#" + did + "ing").addClass("show");
    $("#" + did + "ing").css("display", "block");
  }
} //end of clicker

function editor(did) {
  React.render(React.createElement(Popup, null), document.getElementById("hiddenpop"));
  $("#popup").css("-webkit-animation-name", "move-down");
  $("#canceladd").css("display", "block");
  $("#inputname").val("");
  $("#inputing").val("");
  $("#hiddenpop").css("display", "block");
  $("#content").css("z-index", "-1");
  var temp = JSON.parse(localStorage.getItem("fcckey"));
  if (did !== undefined) {
    var num = 0;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].name == did) {
        num = i;
      }
    }
    remove(did);
    $("#inputname").val(temp[num].name);
    $("#inputing").val(temp[num].ingredients);
    $("#canceladd").css("display", "none");
  } // end of did !undefined
} // end of editor

//remove an item from box
function remove(did) {
  var temp = JSON.parse(localStorage.getItem("fcckey"));
  for (var i = 0; i < temp.length; i++) {
    if (temp[i].name == did) {

      temp.splice(i, 1);
      localStorage.setItem("fcckey", JSON.stringify(temp));
    }
  }
  open();
} //end of remove

//function to open and close recipe box
function dropdown() {
  if (!opened) {

    setTimeout(function () {
      $("#chev").removeClass("fa-chevron-down");
      $("#chev").addClass("fa-chevron-up");
    }, 600);

    open();
    $("#info").css("-webkit-animation-name", "move-down");
    opened = true;
  } else {

    setTimeout(function () {
      $("#chev").removeClass("fa-chevron-up");
      $("#chev").addClass("fa-chevron-down");
    }, 600);

    $("#info").css("-webkit-animation-name", "move-up");
    setTimeout(function () {
      $("#info").html("");
    }, 600);

    opened = false;
  }
} //end of dropdown

function open() {
  $("#info").html("");
  React.render(React.createElement(Open, null), document.getElementById("info"));
}

//function to create recipe objects
function rep(a, b) {
  this.name = a;
  this.ingredients = b;
}

//create the react class that will add html to DOM

var Loader = function (_React$Component) {
  _inherits(Loader, _React$Component);

  //constructor with states

  function Loader(props) {
    _classCallCheck(this, Loader);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      edited: false,
      ingre: "",
      rep: "",
      items: JSON.parse(localStorage.getItem("fcckey")),
      holder: "",
      contain: ""
    };
    return _this;
  } //end of constuctor

  Loader.prototype.drop = function drop() {
    dropdown();
  };

  Loader.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "container-fluid" },
        React.createElement("div", { id: "hiddenpop" }),
        React.createElement(
          "div",
          { id: "content" },
          React.createElement(
            "h1",
            { id: "welcome", className: "tii" },
            "Recipe Box",
            " ",
            React.createElement("i", {
              onClick: this.drop.bind(this),
              className: "fa fa-chevron-down",
              id: "chev"
            })
          ),
          React.createElement("div", { id: "info" })
        )
      )
    );
  };

  return Loader;
}(React.Component);

//create the react class that will add html to DOM

var Open = function (_Loader) {
  _inherits(Open, _Loader);

  //constructor with states

  function Open(props) {
    _classCallCheck(this, Open);

    var _this2 = _possibleConstructorReturn(this, _Loader.call(this, props));

    _this2.state.items = JSON.parse(localStorage.getItem("fcckey"));
    return _this2;
  } //end of constructor

  Open.prototype.list = function list(a) {
    if (a.length == 0) {
      temporary = "";
    } else {
      for (var i = 0; i < a.length; i++) {
        var temp = a[i];
        var name = temp.name;
        var ing = temp.ingredients;

        if (i == 0) {
          temporary = "<div  id='" + name + "'>" + name + "</div><span style='display: none' id='" + name + "ing'>" + ing + "</span>";
        } else {
          temporary += "<div  id='" + name + "'>" + name + "</div><span style='display: none' id='" + name + "ing'>" + ing + "</span>";
        }
      }
    }

    return temporary;
  };

  Open.prototype.click = function click(e) {
    var did = e.target.id;
    clicker(did);
  };

  Open.prototype.addrep = function addrep() {
    editor();
  };

  Open.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { id: "display" },
          React.createElement("div", {
            id: "recipe",
            onClick: this.click,
            dangerouslySetInnerHTML: { __html: this.list(this.state.items) }
          }),
          React.createElement(
            "div",
            { id: "adder" },
            React.createElement(
              "button",
              { className: "btn btn-success", onClick: this.addrep },
              "Add"
            )
          )
        )
      )
    );
  };

  return Open;
}(Loader);

var Ingredients = function (_Open) {
  _inherits(Ingredients, _Open);

  function Ingredients(props) {
    _classCallCheck(this, Ingredients);

    var _this3 = _possibleConstructorReturn(this, _Open.call(this, props));

    _this3.state.ingre = curring;
    _this3.state.rep = currrep;
    return _this3;
  }

  Ingredients.prototype.ingremove = function ingremove(e) {
    var did = e.target.id;
    remove(did);
  };

  Ingredients.prototype.edit = function edit(e) {
    var did = e.target.id;
    editor(did);
  };

  Ingredients.prototype.render = function render() {
    return React.createElement(
      "span",
      null,
      React.createElement(
        "span",
        null,
        this.state.ingre
      ),
      React.createElement(
        "span",
        { id: "edit" },
        React.createElement(
          "button",
          {
            className: "btn btn-danger",
            id: this.state.rep,
            onClick: this.ingremove
          },
          "Remove"
        ),
        React.createElement(
          "button",
          {
            className: "btn btn-default",
            id: this.state.rep,
            onClick: this.edit
          },
          "Edit"
        )
      )
    );
  };

  return Ingredients;
}(Open);

var Popup = function (_Open2) {
  _inherits(Popup, _Open2);

  function Popup(props) {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, _Open2.call(this, props));
  } //end of constructor

  Popup.prototype.submit = function submit() {
    $("#popup").css("-webkit-animation-name", "move-up");
    setTimeout(function () {
      $("#hiddenpop").css("display", "none");
      $("#content").css("z-index", "1");
    }, 500);

    masterarray = JSON.parse(localStorage.getItem("fcckey"));
    var tempname = $("#inputname").val();
    var temping = $("#inputing").val();
    var temparr = temping.split(",");
    var temprec = new rep(tempname, temparr);

    if (tempname !== "") {
      masterarray.push(temprec);
      // Put the object into storage
      localStorage.setItem("fcckey", JSON.stringify(masterarray));

      setTimeout(function () {
        open();
      }, 300);
    }
  };

  Popup.prototype.cancel = function cancel() {
    $("#popup").css("-webkit-animation-name", "move-up");
    setTimeout(function () {
      $("#hiddenpop").css("display", "none");
      $("#content").css("z-index", "1");
    }, 500);
  };

  Popup.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { id: "smooth" },
        React.createElement(
          "div",
          { id: "popup" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "strong",
              null,
              "Name: ",
              React.createElement("br", null)
            ),
            React.createElement("input", { id: "inputname" })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "strong",
              null,
              React.createElement("br", null),
              "Ingredients: "
            ),
            React.createElement("textarea", { id: "inputing" })
          ),
          React.createElement(
            "div",
            { id: "edits" },
            React.createElement(
              "button",
              {
                id: "add",
                className: "btn btn-success",
                onClick: this.submit.bind(this)
              },
              "Submit"
            ),
            React.createElement(
              "button",
              {
                id: "canceladd",
                className: "btn btn-danger",
                onClick: this.cancel
              },
              "Cancel"
            )
          )
        )
      )
    );
  };

  return Popup;
}(Open);

//input the rendered html to the DOM

React.render(React.createElement(Loader, null), document.getElementById("main"));
