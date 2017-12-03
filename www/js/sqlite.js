'use strict';

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R = R;
var React = React;
var ReactDOM = ReactDOM;
var Immutable = Immutable;
var domContainerNode = document.getElementById('react-app');

var Redux = Redux;
var _ReactRedux = ReactRedux;
var Provider = _ReactRedux.Provider;

var thunkMiddleware = ReduxThunk.default;
var _ReactReduxConnectHel = ReactReduxConnectHelpers;
var connectStateValue = _ReactReduxConnectHel.connectStateValue;
var connectValue = _ReactReduxConnectHel.connectValue;
var createActionConnector = _ReactReduxConnectHel.createActionConnector;

/* Encryption Helpers */

var ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

var letterIndexes = ALPHABET.reduce(function (acc, letter, i) {
  acc[letter] = i;
  return acc;
}, {});

var isUpperCase = function isUpperCase(str) {
  return R.equals(str, R.toUpper(str));
};

var normalizeShift = function normalizeShift(shift) {
  return shift < 0 ? 26 - -shift % 26 : shift % 26;
};

var makeEncoder = function makeEncoder(shift) {
  return ALPHABET.reduce(function (acc, letter) {
    var letterIndex = letterIndexes[letter];
    var encryptedLetter = ALPHABET[(letterIndex + shift) % ALPHABET.length];
    acc[letter] = encryptedLetter;
    return acc;
  }, {});
};

var encryptMessage = function encryptMessage() {
  var shift = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var message = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var encoder = R.compose(makeEncoder, normalizeShift)(shift);
  var encryptedMessage = message.split('').map(function (char) {
    var key = R.toLower(char);
    if (encoder[key]) {
      return isUpperCase(char) ? R.toUpper(encoder[key]) : encoder[key];
    }
    return char;
  }).join('');

  return encryptedMessage;
};

var decryptMessage = function decryptMessage() {
  var shift = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var message = arguments[1];

  var inverseShift = ALPHABET.length - shift;
  return encryptMessage(inverseShift, message);
};

/* Redux */
var initialState = Immutable.fromJS({
  shift: 1,
  message: '', // 'Attack at dawn!',
  encrypted: '', // 'Buubdl bu ebxo!',
  highlighted: null
});

var actionTypes = {
  CHANGE_SHIFT: 'CHANGE_SHIFT',
  CHANGE_MESSAGE: 'CHANGE_MESSAGE',
  CHANGE_ENCRYPTED: 'CHANGE_ENCRYPTED',
  CHANGE_HIGHLIGHTED: 'CHANGE_HIGHLIGHED'
};

var actionCreators = {
  changeShift: function changeShift(shift) {
    return {
      type: actionTypes.CHANGE_SHIFT,
      payload: shift
    };
  },
  changeMessage: function changeMessage(message) {
    return {
      type: actionTypes.CHANGE_MESSAGE,
      payload: message
    };
  },
  changeEncrypted: function changeEncrypted(message) {
    return {
      type: actionTypes.CHANGE_ENCRYPTED,
      payload: message
    };
  },
  changeHighlighted: function changeHighlighted(letter) {
    return {
      type: actionTypes.CHANGE_HIGHLIGHTED,
      payload: letter
    };
  }
};

var rootReducer = function rootReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var payload = _ref.payload;

  switch (type) {
    case actionTypes.CHANGE_SHIFT:
      return state.set('shift', payload).set('encrypted', encryptMessage(payload, state.get('message')));
    case actionTypes.CHANGE_MESSAGE:
      return state.set('message', payload).set('encrypted', encryptMessage(state.get('shift'), payload));
    case actionTypes.CHANGE_ENCRYPTED:
      return state.set('encrypted', payload).set('message', decryptMessage(state.get('shift'), payload));
    case actionTypes.CHANGE_HIGHLIGHTED:
      return state.set('highlighted', payload);
    default:
      return state;
  }
};

var thunk = thunkMiddleware;
var logger = window.reduxLogger({
  collapsed: true,
  stateTransformer: function stateTransformer(state) {
    return state.toJS();
  },
  diff: true
});
var middleware = Redux.applyMiddleware(thunk, logger);

var store = Redux.createStore(rootReducer, initialState, middleware);
var connectAction = createActionConnector(actionCreators);

var TextWheel = function TextWheel(props) {
  var id = props.id;
  var shift = props.shift;
  var text = props.text;
  var textColor = props.textColor;
  var border = props.border;
  var showBorder = props.showBorder;
  var diameter = props.diameter;
  var onSpokeHover = props.onSpokeHover;

  var chars = props.text.split('');

  var spokeWidth = diameter / chars.length;
  var spokeHeight = diameter / 2;
  var spokeLeft = diameter / 2 - spokeWidth / 2;
  var spokeAngle = 360 / chars.length;

  return React.createElement(
    'div',
    {
      id: props.id,
      className: 'wheel',
      style: {
        width: diameter + 'px',
        height: diameter + 'px',
        border: border,
        borderStyle: showBorder ? 'solid' : 'hidden',
        borderRadius: '50%',
        position: 'relative',
        transform: 'rotate(' + -shift * spokeAngle + 'deg)',
        transition: '.3s ease'
      }
    },
    chars.map(function (char, i) {
      return React.createElement(
        'div',
        {
          key: i,
          className: 'spoke'
          // onHover={onSpokeHover}
          , style: {
            width: spokeWidth + 'px',
            height: spokeHeight + 'px',
            textAlign: 'center',
            position: 'absolute',
            left: spokeLeft + 'px',
            display: 'inline-block',
            transform: 'rotate(' + i * spokeAngle + 'deg)',
            transformOrigin: 'bottom center',
            fontFamily: 'inherit'
          }
        },
        char
      );
    })
  );
};

TextWheel.defaultProps = {
  shift: 0,
  text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  textColor: 'black',
  border: '5px solid #3BB0FF',
  showBorder: true,
  diameter: 260,
  onSpokeHover: function onSpokeHover(n) {
    return n;
  }
};

TextWheel.propTypes = {
  shift: React.PropTypes.number,
  text: React.PropTypes.string,
  textColor: React.PropTypes.string,
  border: React.PropTypes.string,
  showBorder: React.PropTypes.bool,
  diameter: React.PropTypes.number,
  onSpokeHover: React.PropTypes.func
};

var ShiftDisplay = function ShiftDisplay(_ref2) {
  var shift = _ref2.shift;
  return React.createElement(
    'h2',
    null,
    normalizeShift(shift)
  );
};

var ShiftButtonDisplay = function ShiftButtonDisplay(_ref3) {
  var changeShift = _ref3.changeShift;
  var shift = _ref3.shift;
  var direction = _ref3.direction;
  return React.createElement(
    'button',
    { className: 'shift-button', onClick: function onClick() {
        changeShift(shift + direction);
      } },
    direction > 0 ? '→' : '←'
  );
};

var Textarea = (_temp = _class = function (_React$Component) {
  _inherits(Textarea, _React$Component);

  function Textarea(props, context) {
    _classCallCheck(this, Textarea);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.toggleFocus = _this.toggleFocus.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.state = {
      isFocused: false,
      message: props.children || props.value
    };
    return _this;
  }

  Textarea.prototype.toggleFocus = function toggleFocus() {
    this.setState({ isFocused: !this.state.isFocused });
  };

  Textarea.prototype.handleScroll = function handleScroll(e) {
    this._textarea.scrollTop = e.target.scrollTop;
  };

  Textarea.prototype.handleChange = function handleChange(e) {
    var _this2 = this;

    var message = e.target.value;
    this.setState({ message: message }, function () {
      return _this2.props.onChange(message);
    });
  };

  Textarea.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.state.message !== nextProps.value) {
      this.setState({ message: nextProps.value });
    }
  };

  Textarea.prototype.render = function render() {
    var _this3 = this;

    var size = 'calc(100% - ' + parseInt(this.props.padding) * 2 + 'px';

    return React.createElement(
      'div',
      {
        style: { border: '5px solid #1C2025', borderRadius: '.3em', position: 'relative', width: this.props.width, height: this.props.height, margin: '0 auto', top: 0, left: 0, whiteSpace: 'inherit-wrap', wordWrap: 'break-word' }
      },
      React.createElement(
        'div',
        {
          ref: function ref(_textarea) {
            _this3._textarea = _textarea;
          },
          style: { pointerEvents: 'none', position: 'absolute', padding: this.props.padding, textAlign: 'left', whiteSpace: 'pre-wrap', width: size, height: size, overflowY: 'scroll' }
        },
        this.state.message && this.state.message.length ? this.state.message.split(this.props.highlightSelection).reduce(function (acc, curr, i, arr) {
          acc.push(curr);
          if (i < arr.length - 1) {
            acc.push(React.createElement(
              'span',
              {
                key: i,
                style: _this3.props.highlightStyle
              },
              _this3.props.highlightSelection
            ));
          }
          return acc;
        }, []) : React.createElement(
          'span',
          { style: { opacity: 0.5 } },
          this.state.isFocused ? '' : this.props.placeholder
        )
      ),
      React.createElement('textarea', {
        style: { width: size, height: size, padding: this.props.padding, margin: 0, background: 'rgba(0, 0, 0, 0)', outline: 'none', resize: 'none', positon: 'absolute', right: this.props.padding, fontSize: '1em', fontFamily: 'inherit', WebkitTextFillColor: 'transparent', textShadow: '0px 0px 0px rgba(0, 0, 0, 0)', lineHeight: 'inherit', border: 'none' },
        value: this.state.message,
        onBlur: this.toggleFocus,
        onFocus: this.toggleFocus,
        onChange: this.handleChange,
        onScroll: this.handleScroll,
        disabled: this.props.disabled,
        spellCheck: this.props.spellcheck
      })
    );
  };

  return Textarea;
}(React.Component), _class.propTypes = {
  onChange: React.PropTypes.func
}, _class.defaultProps = {
  width: '12em',
  height: '6em',
  padding: '5px',
  disabled: false,
  spellcheck: false,
  onChange: function onChange() {
    return null;
  }
}, _temp);

var OuterWheel = R.compose(connectValue('outer-wheel', 'id'), connectValue(false, 'showBorder'))(
// connectAction('changeHighlighted', 'onSpokeHover')
TextWheel);

var InnerWheel = R.compose(connectValue('inner-wheel', 'id'), connectValue(200, 'diameter'), connectStateValue('shift'))(TextWheel);

var Shift = R.compose(connectStateValue('shift'))(ShiftDisplay);

var ShiftLeftButton = R.compose(connectValue(-1, 'direction'), connectStateValue('shift'), connectAction('changeShift'))(ShiftButtonDisplay);

var ShiftRightButton = R.compose(connectValue(1, 'direction'), connectStateValue('shift'), connectAction('changeShift'))(ShiftButtonDisplay);

var Message = R.compose(connectValue('Write your message', 'placeholder'), connectStateValue('message', 'value'), connectAction('changeMessage', 'onChange'))(Textarea);

var Encrypted = R.compose(connectValue('Encrypted message', 'placeholder'), connectStateValue('encrypted', 'value'), connectAction('changeEncrypted', 'onChange'))(Textarea);

var MainDisplay = function MainDisplay(props) {
  return React.createElement(
    'main',
    null,
    React.createElement(
      'h1',
      null,
      'Caesar Cipher'
    ),
    React.createElement(
      'div',
      { className: 'wheels' },
      React.createElement(
        'div',
        { className: 'absolute-centered' },
        React.createElement(OuterWheel, null)
      ),
      React.createElement(
        'div',
        { className: 'absolute-centered' },
        React.createElement(InnerWheel, null)
      ),
      React.createElement(
        'div',
        { className: 'absolute-centered' },
        React.createElement(Shift, null)
      )
    ),
    React.createElement(
      'div',
      { className: 'controls' },
      React.createElement(ShiftLeftButton, null),
      React.createElement(ShiftRightButton, null)
    ),
    React.createElement(
      'div',
      { className: 'text-entry' },
      React.createElement(
        'h3',
        null,
        'Plaintext:'
      ),
      React.createElement(Message, null)
    ),
    React.createElement(
      'div',
      { className: 'text-entry' },
      React.createElement(
        'h3',
        null,
        'Encrypted:'
      ),
      React.createElement(Encrypted, null)
    )
  );
};

var App = function App(props) {
  return React.createElement(
    Provider,
    { store: store },
    React.createElement(MainDisplay, null)
  );
};

ReactDOM.render(React.createElement(App, null), domContainerNode);
