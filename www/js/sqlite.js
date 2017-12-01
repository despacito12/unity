"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calculator = function (_React$Component) {
  _inherits(Calculator, _React$Component);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      display: "0",
      operator: "",
      firstNumber: "",
      waiting: "no",
      divisor: "",
      subtractor: ""
    };
    return _this;
  }

  Calculator.prototype.addNum = function addNum(num) {
    var _state = this.state;
    var display = _state.display;
    var waiting = _state.waiting;

    num = String(num);
    if (waiting === "yes") {
      this.setState({
        display: num,
        waiting: "no"
      });
    } else if (display == "0" && num == "0") {
      this.setState({
        display: display
      });
    } else if (display == "0") {
      this.setState({
        display: num
      });
    } else {
      this.setState({
        display: display + num
      });
    }
  };

  Calculator.prototype.addDecimal = function addDecimal() {
    var _state2 = this.state;
    var display = _state2.display;
    var waiting = _state2.waiting;

    if (waiting == "yes") {
      this.setState({
        display: ".",
        waiting: "no"
      });
    } else if (display.indexOf(".") == -1) this.setState({
      display: display + "."
    });
  };

  Calculator.prototype.clear = function clear() {
    this.setState({
      display: "0",
      waiting: "no",
      firstNumber: "",
      operator: ""

    });
  };

  Calculator.prototype.negative = function negative() {
    var display = this.state.display;

    var strDisplay = String(display);

    if (strDisplay[0] == "-") this.setState({
      display: strDisplay.substr(1)
    });else this.setState({
      display: "-" + strDisplay
    });
  };

  Calculator.prototype.percent = function percent() {
    var _state3 = this.state;
    var display = _state3.display;
    var operator = _state3.operator;
    var firstNumber = _state3.firstNumber;
    var waiting = _state3.waiting;

    this.setState({
      display: display / 100,
      operator: "",
      firstNumber: "",
      waiting: "no"
    });
  };

  Calculator.prototype.initializeOperator = function initializeOperator(operator) {
    var _state4 = this.state;
    var display = _state4.display;
    var waiting = _state4.waiting;

    this.setState({
      waiting: "yes",
      operator: operator,
      firstNumber: parseFloat(display)
    });
  };

  Calculator.prototype.evaluate = function evaluate() {
    var _state5 = this.state;
    var display = _state5.display;
    var firstNumber = _state5.firstNumber;
    var operator = _state5.operator;
    var divisor = _state5.divisor;
    var subtractor = _state5.subtractor;

    var current = parseFloat(display);
    var held = parseFloat(firstNumber);

    if (firstNumber && operator == "÷") {
      this.setState({
        divisor: current,
        display: held / current,
        firstNumber: ""
      });
    } else if (operator == "÷") {
      this.setState({
        display: display / divisor
      });
    } else if (firstNumber && operator == "x") {
      this.setState({
        display: current * held

      });
    } else if (firstNumber && operator == "-") {
      this.setState({
        subtractor: current,
        display: held - current,
        firstNumber: ""
      });
    } else if (operator == "-") {
      this.setState({
        display: display - subtractor
      });
    } else if (firstNumber && operator == "+") {
      this.setState({
        display: held + current
      });
    }
  };

  Calculator.prototype.render = function render() {
    var _this2 = this;

    var _state6 = this.state;
    var display = _state6.display;
    var operator = _state6.operator;
    var firstNumber = _state6.firstNumber;
    var waiting = _state6.waiting;

    //I realized this snippet shold not be in the render method because changing things while rendering is inefficient. Will refactor. Maybe this belongs in a displayLengthAdjust method.   

    if (String(display).length > 10) {
      this.setState({
        display: String(display).substr(0, 10)
      });
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Calculator"
      ),
      React.createElement(
        "div",
        { className: "calculator" },
        React.createElement(
          "div",
          { className: "display" },
          React.createElement(
            "h2",
            { className: "result" },
            display
          )
        ),
        React.createElement(
          "div",
          { className: "keypad" },
          React.createElement(
            "div",
            { className: "nonOperators" },
            React.createElement(
              "div",
              { className: "functions" },
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.clear();
                  }, className: "clear function" },
                "AC"
              ),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.negative();
                  }, className: "plus_minus function" },
                "±"
              ),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.percent();
                  }, className: "percent function" },
                "%"
              )
            ),
            React.createElement(
              "div",
              { className: "digits" },
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.addNum(1);
                  }, className: "digit-1 digit" },
                "1"
              ),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.addNum(2);
                  }, className: "digit-2 digit" },
                "2"
              ),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.addNum(3);
                  }, className: "digit-3 digit" },
                "3"
              ),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.addNum(4);
                  }, className: "digit-4 digit" },
                "4"
              ),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.addNum(5);
                  }, className: "digit-5 digit" },
                "5"
              ),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.addNum(6);
                  }, className: "digit-6 digit" },
                "6"
              ),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.addNum(7);
                  }, className: "digit-7 digit" },
                "7"
              ),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.addNum(8);
                  }, className: "digit-8 digit" },
                "8"
              ),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.addNum(9);
                  }, className: "digit-9 digit" },
                "9"
              ),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.addNum(0);
                  }, className: "digit-0 digit digit_wide" },
                "0"
              ),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this2.addDecimal();
                  }, className: "decimal digit" },
                "."
              )
            )
          ),
          React.createElement(
            "div",
            { className: "operators" },
            React.createElement(
              "button",
              { onClick: function onClick() {
                  return _this2.initializeOperator("÷");
                }, className: "divide operator" },
              "÷"
            ),
            React.createElement(
              "button",
              { onClick: function onClick() {
                  return _this2.initializeOperator("x");
                }, className: "multiply operator" },
              "x"
            ),
            React.createElement(
              "button",
              { onClick: function onClick() {
                  return _this2.initializeOperator("-");
                }, className: "subtract operator" },
              "-"
            ),
            React.createElement(
              "button",
              { onClick: function onClick() {
                  return _this2.initializeOperator("+");
                }, className: "add operator" },
              "+"
            ),
            React.createElement(
              "button",
              { onClick: function onClick() {
                  return _this2.evaluate();
                }, className: "equals operator" },
              "="
            )
          )
        )
      )
    );
  };

  return Calculator;
}(React.Component);

ReactDOM.render(React.createElement(Calculator, null), document.getElementById('root'));
