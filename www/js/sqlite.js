"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Note = function (_React$Component) {
  _inherits(Note, _React$Component);

  function Note() {
    _classCallCheck(this, Note);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Note.prototype.render = function render() {
    var style = {
      backgroundColor: this.props.color
    };
    return React.createElement(
      "div",
      { className: "note", style: style },
      this.props.children,
      React.createElement(
        "span",
        { className: "note-delete", onClick: this.props.onDelete },
        "x"
      )
    );
  };

  return Note;
}(React.Component);

var NoteEditor = function (_React$Component2) {
  _inherits(NoteEditor, _React$Component2);

  function NoteEditor(props) {
    _classCallCheck(this, NoteEditor);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.color = 'ff6680';
    _this2.state = { text: '', color: _this2.color };
    return _this2;
  }

  NoteEditor.prototype.handleChange = function handleChange(e) {
    this.setState({ text: e.target.value });
  };

  NoteEditor.prototype.handleChangeColor = function handleChangeColor(e) {
    this.setState({ color: e.target.value });
  };

  NoteEditor.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(
      "div",
      { className: "note-editor" },
      React.createElement(
        "textarea",
        { placeholder: "Enter your note here...", onChange: this.handleChange.bind(this) },
        this.state.text
      ),
      React.createElement("input", { className: "jscolor", value: this.state.color, onBlur: this.handleChangeColor.bind(this) }),
      React.createElement(
        "button",
        { onClick: function onClick() {
            return _this3.props.onNoteAdd(_this3.state.text, _this3.state.color);
          } },
        "Add"
      )
    );
  };

  return NoteEditor;
}(React.Component);

var NotesGrid = function (_React$Component3) {
  _inherits(NotesGrid, _React$Component3);

  function NotesGrid() {
    _classCallCheck(this, NotesGrid);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  NotesGrid.prototype.componentDidMount = function componentDidMount() {
    var grid = this.refs.grid;
    this.msnry = new Masonry(grid, {
      // options
      itemSelector: '.note',
      columnWidth: 200,
      gutter: 10
    });
  };

  NotesGrid.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.notes.length != prevProps.notes.length) {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
  };

  NotesGrid.prototype.render = function render() {
    var onNoteDelete = this.props.onNoteDelete;
    return React.createElement(
      "div",
      { className: "notes-grid", ref: "grid" },
      this.props.notes.map(function (note) {
        return React.createElement(
          Note,
          {
            key: note.id,
            color: note.color,
            onDelete: onNoteDelete.bind(null, note) },
          note.text
        );
      })
    );
  };

  return NotesGrid;
}(React.Component);

var NotesApp = function (_React$Component4) {
  _inherits(NotesApp, _React$Component4);

  function NotesApp(props) {
    _classCallCheck(this, NotesApp);

    var _this5 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this5.state = { notes: [{ id: 1, text: 'DemoNote', color: 'coral' }, { id: 2, text: 'You can use Masonry with vanilla JS', color: 'aliceblue' }, { id: 3, text: 'You can initialize Masonry in HTML, without writing any JavaScript', color: 'gold' }, { id: 4, text: 'HTML initialization was previously done with a class of js-masonry and setting options in data-masonry-options in Masonry v3. Masonry v4 is backwards compatible with this code.', color: 'lightpink' }, { id: 5, text: 'Masonry v4 is backwards compatible with this code.', color: '#C9A39C' }] };
    return _this5;
  }

  NotesApp.prototype.componentDidMount = function componentDidMount() {
    var localNotes = JSON.parse(localStorage.getItem('notes'));
    if (localNotes) {
      this.setState({ notes: localNotes });
    }
  };

  NotesApp.prototype.updateLocalStorage = function updateLocalStorage() {
    var notes = JSON.stringify(this.state.notes);
    localStorage.setItem('notes', notes);
    console.log('update ls');
  };

  NotesApp.prototype.onNoteAdd = function onNoteAdd(noteText, noteColor) {
    var notesNew = this.state.notes.slice();
    notesNew.unshift({ id: Date.now(), text: noteText, color: '#' + noteColor });
    this.setState({ notes: notesNew });
  };

  NotesApp.prototype.onNoteDelete = function onNoteDelete(note) {
    var notesNew = this.state.notes.filter(function (_note) {
      return _note.id != note.id;
    });
    this.setState({ notes: notesNew });
  };

  NotesApp.prototype.componentDidUpdate = function componentDidUpdate() {
    this.updateLocalStorage();
  };

  NotesApp.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "notes-app" },
      React.createElement(NoteEditor, { onNoteAdd: this.onNoteAdd.bind(this) }),
      React.createElement(NotesGrid, { notes: this.state.notes, onNoteDelete: this.onNoteDelete.bind(this) })
    );
  };

  return NotesApp;
}(React.Component);

ReactDOM.render(React.createElement(NotesApp, null), document.getElementById('root'));
