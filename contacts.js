import React from 'react';

import SingleContact from './contact';

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

  handleSubmit(event) {
    event.preventDefault();
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
  }

  render() {
    return (
      <div className="container-fluid">
        <form onSubmit={this.handleSubmit}>
          <div className="row contacts-item-new">
            <div className="col-md-3 contacts-item-first">
              <input type="text" name="newFirst" onChange={this.handleInputChange} value={this.state.newFirst} />
            </div>
            <div className="col-md-3 contacts-item-last">
              <input type="text" name="newLast" onChange={this.handleInputChange} value={this.state.newLast} />
            </div>
            <div className="col-md-3 contacts-item-email">
              <input type="text" name="newEmail" onChange={this.handleInputChange} required value={this.state.newEmail} />
            </div>
            <div className="col-md-2 contacts-item-country">
              <input type="text" name="newCountry" onChange={this.handleInputChange} value={this.state.newCountry} />
            </div>
            <div className="col-md-1 text-right">
              <button type="submit" className="btn btn-create">Create</button>
            </div>
          </div>
        </form>
        {this.state.people.map((person) =>
          <SingleContact key={person.email} person={person} onDelete={this.handleDelete} />
        )}
      </div>
    );
  }
}
