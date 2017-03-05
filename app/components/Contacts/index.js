import React from 'react';

import SingleContact from '../SingleContact';
import Notification from '../Notification';
import countriesList from '../../util/country-list-select';
import isEmailValid from '../../util/is-email-valid';

import './Contacts.css';

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      newFirst: '',
      newLast: '',
      newEmail: '',
      newCountry: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.populateFromLocalStorage();
  }

  populateFromLocalStorage() {
    Object.keys(localStorage).forEach((key) => {
      const value = localStorage[key];
      let valueJson = {};
      try {
        valueJson = JSON.parse(value);
      } catch (err) {
        return;
      }
      this.setState((prevState) => ({
        people: prevState.people.concat(valueJson),
      }));
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  sanitizeNewUser() {
    this.setState((prevState) => ({
      newFirst: prevState.newFirst.trim(),
      newLast: prevState.newLast.trim(),
      newEmail: prevState.newEmail.trim(),
    }));
  }

  isNewUserValid() {
    let valid = true;

    // length validation
    const newPersonStrings = {
      'first name': this.state.newFirst,
      'last name': this.state.newLast,
      'email': this.state.newEmail,
    };
    Object.keys(newPersonStrings).forEach((name) => {
      if (newPersonStrings[name].length > 50) {
        this.notif.show(`Input for ${name} is too long.`, 'error');
        valid = false;
      }
    });

    // email validation
    if (!isEmailValid(this.state.newEmail)) {
      this.notif.show(`Email ${this.state.newEmail} is invalid.`, 'error');
      valid = false;
    }

    return valid;
  }

  handleSubmit(event) {
    event.preventDefault();

    this.sanitizeNewUser();
    if (!this.isNewUserValid()) {
      return;
    }

    const newPerson = {
      first: this.state.newFirst,
      last: this.state.newLast,
      email: this.state.newEmail,
      country: this.state.newCountry,
    };
    this.setState((prevState) => ({
      people: [newPerson].concat(prevState.people),
      newFirst: '',
      newLast: '',
      newEmail: '',
      newCountry: '',
    }));
    this.updateLocalStorage(newPerson);
  }

  handleDelete(email) {
    localStorage.removeItem(email);

    for (let i = 0; i < this.state.people.length; i++) {
      if (this.state.people[i].email === email) {
        this.setState((prevState) => {
          const newPeople = prevState.people.slice();
          newPeople.splice(i, 1);
          return {
            people: newPeople,
          };
        });
      }
    }
  }

  updateLocalStorage(newPerson) {
    localStorage.setItem(newPerson.email, JSON.stringify(newPerson));
    this.notif.show(`Contact ${newPerson.email} saved`);
  }

  render() {
    return (
      <div className="container-fluid">
        <Notification ref={(notifInstance) => { this.notif = notifInstance; }} />
        <form onSubmit={this.handleSubmit}>
          <div className="row Contacts_item-new">
            <div className="col-md-3 Contacts_item-first">
              <input type="text"
                required
                placeholder="first name"
                name="newFirst"
                onChange={this.handleInputChange}
                value={this.state.newFirst} />
            </div>
            <div className="col-md-3 Contacts_item-last">
              <input type="text"
                required
                placeholder="last name"
                name="newLast"
                onChange={this.handleInputChange}
                value={this.state.newLast} />
            </div>
            <div className="col-md-3 Contacts_item-email">
              <input type="text"
                required
                placeholder="email"
                name="newEmail"
                onChange={this.handleInputChange}
                value={this.state.newEmail} />
            </div>
            <div className="col-md-2 Contacts_item-country">
              <select name="newCountry"
                required
                value={this.state.newCountry}
                onChange={this.handleInputChange}
                className="Contacts_select">
                {countriesList()}
              </select>
            </div>
            <div className="col-md-1 text-right">
              <button type="submit" className="btn btn-create">Create</button>
            </div>
          </div>
        </form>
        {this.state.people.map((person) =>
          <SingleContact key={person.email}
            person={person}
            notif={this.notif}
            onDelete={this.handleDelete} />
        )}
      </div>
    );
  }
}
