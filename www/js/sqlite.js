"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function Button(props) {
  var classes = props.buttonType + " " + props.buttonDetail;
  return React.createElement(
    "button",
    { value: props.value, onClick: props.onClick, className: classes },
    props.value
  );
};

var ButtonBox = function ButtonBox(props) {
  return React.createElement(
    "div",
    { className: "button-box" },
    React.createElement(Button, { onClick: props.clearHandler, buttonType: "clear-btn", buttonDetail: "clearall", value: "CE" }),
    React.createElement(Button, { onClick: props.clearHandler, buttonType: "clear-btn", buttonDetail: "clear", value: "C" }),
    React.createElement(Button, { onClick: props.length < 10 ? props.numberHandler : null, buttonType: "number-btn", buttonDetail: "number", value: "7" }),
    React.createElement(Button, { onClick: props.length < 10 ? props.numberHandler : null, buttonType: "number-btn", buttonDetail: "number", value: "8" }),
    React.createElement(Button, { onClick: props.length < 10 ? props.numberHandler : null, buttonType: "number-btn", buttonDetail: "number", value: "9" }),
    React.createElement(Button, { onClick: props.operatorHandler, buttonType: "number-btn", buttonDetail: "operator", value: "÷" }),
    React.createElement(Button, { onClick: props.length < 10 ? props.numberHandler : null, buttonType: "number-btn", buttonDetail: "number", value: "4" }),
    React.createElement(Button, { onClick: props.length < 10 ? props.numberHandler : null, buttonType: "number-btn", buttonDetail: "number", value: "5" }),
    React.createElement(Button, { onClick: props.length < 10 ? props.numberHandler : null, buttonType: "number-btn", buttonDetail: "number", value: "6" }),
    React.createElement(Button, { onClick: props.operatorHandler, buttonType: "number-btn", buttonDetail: "operator", value: "×" }),
    React.createElement(Button, { onClick: props.length < 10 ? props.numberHandler : null, buttonType: "number-btn", buttonDetail: "number", value: "1" }),
    React.createElement(Button, { onClick: props.length < 10 ? props.numberHandler : null, buttonType: "number-btn", buttonDetail: "number", value: "2" }),
    React.createElement(Button, { onClick: props.length < 10 ? props.numberHandler : null, buttonType: "number-btn", buttonDetail: "number", value: "3" }),
    React.createElement(Button, { onClick: props.operatorHandler, buttonType: "number-btn", buttonDetail: "operator", value: "-" }),
    React.createElement(Button, { onClick: props.equalHandler, buttonType: "number-btn", buttonDetail: "equal", value: "=" }),
    React.createElement(Button, { onClick: props.length < 10 ? props.numberHandler : null, buttonType: "number-btn", buttonDetail: "number", value: "0" }),
    React.createElement(Button, { onClick: props.pointHandler, buttonType: "number-btn", buttonDetail: "point", value: "." }),
    React.createElement(Button, { onClick: props.operatorHandler, buttonType: "number-btn", buttonDetail: "operator", value: "+" })
  );
};

var Calculator = function (_React$Component) {
  _inherits(Calculator, _React$Component);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      number: "",
      sequenceArray: [],
      currentIndex: 0,
      oldNumber: "",
      result: "",
      operator: "",
      equalized: false,
      chainOps: false,
      pointCheck: false
    };
    return _this;
  }

  Calculator.prototype.execute = function execute() {
    var result = "";
    switch (this.state.operator) {
      case "+":
        result = (parseFloat(this.state.oldNumber) + parseFloat(this.state.number)).toString();
        break;
      case "-":
        result = (parseFloat(this.state.oldNumber) - parseFloat(this.state.number)).toString();
        break;
      case "÷":
        result = (parseFloat(this.state.oldNumber) / parseFloat(this.state.number)).toString();
        break;
      case "×":
        result = (parseFloat(this.state.oldNumber) * parseFloat(this.state.number)).toString();
        break;
    }
    if (result.indexOf(".") && result.length > 10) {
      var beforePoint = Math.round(parseFloat(result)).toString().length;
      if (beforePoint < 10) {
        var zeroes = "1";
        for (var i = 10 - beforePoint; i > 0; i--) {
          zeroes += "0";
        }
        result = (Math.round(result * zeroes) / zeroes).toString();
      } else {
        result = "ERROR";
      }
    } else if (result.length > 10) {
      result = "ERROR";
    }
    if (result === "ERROR") {
      this.setState({
        pointCheck: false,
        equalized: true,
        oldNumber: "",
        number: "",
        operator: ""
      });
    }
    return result;
  };

  Calculator.prototype.clearHandler = function clearHandler(event) {
    var sequenceArray = this.state.sequenceArray.slice();
    if (event.target.value !== "CE") {
      sequenceArray[this.state.currentIndex] = "";
    }
    this.setState({
      // numberSequence: event.target.value === "CE" ?
      //   "" :
      //   this.state.numberSequence.substr(0, this.state.numberSequence.length - this.state.number.length),
      sequenceArray: event.target.value !== "CE" ? sequenceArray : [],
      currentIndex: event.target.value !== "CE" ? this.state.currentIndex : 0,
      pointCheck: false,
      number: "",
      result: "",
      operator: event.target.value !== "CE" ? this.state.operator : "",
      equalized: false,
      chainOps: false,
      error: false
    });
  };

  Calculator.prototype.numberHandler = function numberHandler(event) {
    var currentIndex = this.state.currentIndex !== 0 ? this.state.currentIndex : 0;
    var number = "" + (this.state.number !== "0" && !this.state.equalized && !this.state.chainOps ? this.state.number : "") + event.target.value;
    var sequenceArray = !this.state.equalized ? this.state.sequenceArray.slice() : [];
    sequenceArray[currentIndex] = number;
    this.setState({
      result: "",
      number: number,
      sequenceArray: sequenceArray,
      // numberSequence:
      //   `${
      //   this.state.numberSequence !== "0" && !this.state.equalized ?
      //   this.state.numberSequence :
      //   ""
      // }${event.target.value}`,
      equalized: false,
      chainOps: false,
      currentIndex: currentIndex
    });
  };

  Calculator.prototype.operatorHandler = function operatorHandler(event) {
    var sequenceArray = this.state.sequenceArray.slice();
    sequenceArray.push(event.target.value);
    if (this.state.number !== "") {
      var result = "";
      if (this.state.operator !== "") {
        result = this.execute();
      }
      this.setState({
        pointCheck: false,
        operator: event.target.value,
        result: result,
        oldNumber: this.state.operator === "" ? this.state.number : result !== "" ? result : this.state.number,
        number: this.state.operator === "" ? "" : this.state.number,
        // numberSequence: `${this.state.numberSequence}${event.target.value}`,
        chainOps: this.state.operator !== "",
        currentIndex: this.state.currentIndex += 2,
        sequenceArray: sequenceArray
      });
    }
  };

  Calculator.prototype.equalHandler = function equalHandler() {
    if (this.state.number !== "" && this.state.oldNumber !== "" && !isNaN(this.state.sequenceArray[this.state.currentIndex])) {
      var result = "";
      result = this.execute();
      this.setState({
        result: result,
        pointCheck: false,
        equalized: true,
        oldNumber: "",
        number: "",
        operator: ""
      });
    }
  };

  Calculator.prototype.pointHandler = function pointHandler() {
    var number = this.state.number !== "" ? this.state.number + "." : "0.";
    var sequenceArray = this.state.sequenceArray.slice();
    sequenceArray[this.state.currentIndex] = number;
    if (!this.state.pointCheck) {
      this.setState({
        number: number,
        // numberSequence: this.state.numberSequence !== "" ?
        //   `${this.state.numberSequence}.` :
        //   `0.`,
        pointCheck: true,
        sequenceArray: sequenceArray
      });
    }
  };

  Calculator.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "container", id: "main-view" },
      React.createElement(
        "div",
        { className: "calculator-ext" },
        React.createElement(
          "div",
          { className: "calculator-top-div" },
          React.createElement(
            "h4",
            null,
            "jessica's REACT Calculator"
          )
        ),
        React.createElement(
          "div",
          { className: "calculator-int" },
          React.createElement(
            "div",
            { className: "text-box" },
            React.createElement(
              "div",
              { type: "text", name: "upper-display", className: "display-up" },
              this.state.equalized || this.state.chainOps ? this.state.result : this.state.number !== "" ? this.state.number : 0
            ),
            React.createElement(
              "div",
              { type: "text", name: "lower-display", className: "display-down" },
              /*{this.state.numberSequence !== "" ? this.state.numberSequence : 0}*/
              this.state.sequenceArray.join("") !== "" ? this.state.sequenceArray.join("") : 0
            )
          ),
          React.createElement(ButtonBox, {
            numberHandler: this.numberHandler.bind(this),
            operatorHandler: this.operatorHandler.bind(this),
            clearHandler: this.clearHandler.bind(this),
            pointHandler: this.pointHandler.bind(this),
            equalHandler: this.equalHandler.bind(this),
            length: this.state.number.length
          })
        )
      )
    );
  };

  return Calculator;
}(React.Component);

ReactDOM.render(React.createElement(Calculator, null), document.getElementById('root'));
