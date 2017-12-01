/*
Components
*/
var ContactItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
  },
  render: function() {
    return (
      React.createElement('li', {
          className: 'ContactItem'
        },
        React.createElement('h2', {
          className: 'ContactItem-name'
        }, this.props.name),
        React.createElement('a', {
            className: 'ContactItem-email',
            href: 'mailto:' + this.props.email
          },
          this.props.email
        ),
        React.createElement('p', {
          className: 'ContactItem-description'
        }, this.props.description)
      )
    );
  },
});

var ContactForm = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    contact: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  },
  onNameInput: function(e) {
    this.props.onChange(Object.assign({}, this.props.contact, { name: e.target.value }));
  },
  onEmailInput: function(e) {
    this.props.onChange(Object.assign({}, this.props.contact, { email: e.target.value }));
  },
  onDescriptionInput: function(e) {
    this.props.onChange(Object.assign({}, this.props.contact, { description: e.target.value }));
  },
  onSubmitForm: function(e) {
    e.preventDefault();
    this.props.onSubmit();
  },
  render: function() {
    var errors = this.props.contact.errors || {};
    return (
      React.createElement('form', {
          onSubmit: this.onSubmitForm,
          className: "ContactForm",
          noValidate: true,
        },
        React.createElement('input', {
          type: 'text',
          value: this.props.contact.name,
          className: errors.name && "ContactForm-error",
          placeholder: 'Name (required)',
          onChange: this.onNameInput,
        }),
        React.createElement('input', {
          type: 'email',
          value: this.props.contact.email,
          className: errors.email && "ContactForm-error",
          placeholder: 'Email',
          onChange: this.onEmailInput,
        }),
        React.createElement('textarea', {
          value: this.props.contact.description,
          placeholder: 'Description',
          onChange: this.onDescriptionInput,
        }),
        React.createElement('button', {
          type: 'submit'
        }, 'Add Contact')
      )
    );
  }
});

var ContactView = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired,
    onNewContactChange: React.PropTypes.func.isRequired,
    onNewContactSubmit: React.PropTypes.func.isRequired,
  },

  render: function() {
    var contactItemElements = this.props.contacts
      .filter(function(contact) {
        return contact.email;
      })
      .map(function(contact) {
        return React.createElement(ContactItem, contact);
      });
    return (
      React.createElement('div', {},
        React.createElement('h1', {
          className: "ContactView-title"
        }, "Contacts"),
        React.createElement('ul', {
          className: "ContactView-list"
        }, contactItemElements),
        React.createElement(ContactForm, {
          contacts: this.props.contacts,
          contact: this.props.newContact,
          onChange: this.props.onNewContactChange,
          onSubmit: this.props.onNewContactSubmit,
        })
      )
    );
  }
});

/*
Actions
*/

function updateNewContact(contact) {
  setState({
    newContact: contact
  });
}

function submitNewContact() {
  var contact = Object.assign({}, state.newContact, {key: state.contacts.length + 1, errors: {}});
  
  if (!contact.name) {
    contact.errors.name = ["Please enter a name"];
  }
  if(! /.+@.+\..+/.test(contact.email)) {
    contact.errors.email = ["Please enter a valid email address."];
  }
  setState(
    Object.keys(contact.errors).length === 0 
    ? {
      newContact: Object.assign({}, CONTACT_TEMPLATE),
      contacts: state.contacts.slice(0).concat(contact),
    } : {
      newContact: contact,
    } 
  );
}

/*
Constants
*/

var CONTACT_TEMPLATE = { name: "", email: "", description: "", errors: null };

/*
Model
*/

var state = {};

function setState(changes) {
  Object.assign(state, changes);

  ReactDOM.render(
    React.createElement(ContactView, Object.assign({}, state, {
      onNewContactChange: updateNewContact,
      onNewContactSubmit: submitNewContact,
    })),
    document.getElementById('react-app')
  );
}

/*
Setting initial data
*/

setState({
  contacts: [
    {
      key: 1,
      name: "Waka waka",
      email: "waka@flaka.com",
      description: "Front-end Developer"
    }, {
      key: 2,
      name: "SizzleBacon",
      email: "bacon@shizzle.com"
    }, {
      key: 3,
      name: "FriedBacon"
    },
  ],
  newContact: Object.assign({}, CONTACT_TEMPLATE),
});
