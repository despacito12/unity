"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    _this5.state = { notes: [{ id: 1, text: 'DemoNote', color: 'coral' }, { id: 2, text: 'Meet sir Rufo', color: 'aliceblue' }, { id: 3, text: 'Go to the gym', color: 'gold' }, { id: 4, text: 'Try to find Nemo', color: 'lightpink' }, { id: 5, text: 'Eat Big Saging', color: '#C9A39C' }] };
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
