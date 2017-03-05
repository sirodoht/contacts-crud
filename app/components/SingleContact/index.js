import React from 'react';

import SuccessIcon from 'babel-loader!svg-react-loader!../../../assets/check.svg?name=SuccessIcon';
import FailIcon from 'babel-loader!svg-react-loader!../../../assets/times.svg?name=FailIcon';
import DeleteIcon from 'babel-loader!svg-react-loader!../../../assets/trash-o.svg?name=TrashIcon';
import countryListSelect from '../../util/country-list-select';
import isEmailValid from '../../util/is-email-valid';

import './SingleContact.css';

export default class SingleContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: props.person.first,
      last: props.person.last,
      email: props.person.email,
      country: props.person.country,
      possibleUpdate: false,
      oldPerson: null,
      hover: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.delete = this.delete.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const newState = {
      [name]: value,
    };

    if (!this.state.oldPerson) {
      const oldPerson = {
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        country: this.state.country,
      };
      newState.oldPerson = oldPerson;
      newState.possibleUpdate = true;
      newState.hover = true;
    }

    this.setState(newState);
  }

  sanitizeUpdatedUser() {
    this.setState((prevState) => ({
      first: prevState.first.trim(),
      last: prevState.last.trim(),
      email: prevState.email.trim(),
    }));
  }

  isUpdatedUserValid() {
    let valid = true;

    // length validation
    const updatedPersonStrings = {
      'first name': this.state.first,
      'last name': this.state.last,
      'email': this.state.email,
    };
    Object.keys(updatedPersonStrings).forEach((name) => {
      if (updatedPersonStrings[name].length > 50) {
        this.props.notif.show(`Input for ${name} is too long.`, 'error');
        valid = false;
      }
    });

    // email validation
    if (!isEmailValid(this.state.email)) {
      this.props.notif.show(`Email ${this.state.email} is invalid.`, 'error');
      valid = false;
    }

    return valid;
  }

  handleSubmit(event) {
    event.preventDefault();

    this.sanitizeUpdatedUser();
    if (!this.isUpdatedUserValid()) {
      return;
    }

    // in case of email change, delete the record
    if (this.state.email !== this.state.oldPerson.email) {
      localStorage.removeItem(this.state.oldPerson.email);
    }

    const updatedPerson = {
      first: this.state.first,
      last: this.state.last,
      email: this.state.email,
      country: this.state.country,
    };
    localStorage.setItem(this.state.email, JSON.stringify(updatedPerson));

    this.setState({
      oldPerson: null,
      possibleUpdate: false,
      hover: false,
    });
  }

  cancelUpdate() {
    if (this.state.oldPerson) {
      this.setState((prevState) => ({
        first: prevState.oldPerson.first,
        last: prevState.oldPerson.last,
        email: prevState.oldPerson.email,
        country: prevState.oldPerson.country,
        oldPerson: null,
        possibleUpdate: false,
        hover: false,
      }));
    } else {
      this.setState({
        oldPerson: null,
        possibleUpdate: false,
        hover: false,
      });
    }
  }

  delete() {
    this.props.onDelete(this.state.email);
  }

  handleKeyPress(event) {
    const keyCode = event.keyCode;
    if (keyCode === 27) {
      this.cancelUpdate();
    }
  }

  handleMouseEnter() {
    this.setState({
      hover: true,
    });
  }

  handleMouseLeave() {
    if (this.state.possibleUpdate) {
      return;
    }
    this.setState({
      hover: false,
    });
  }

  render() {
    return (
      <div className="row SingleContact_item" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        {
          !this.state.deleted &&
          <form onSubmit={this.handleSubmit}>
            <div className="col-md-3 SingleContact_item-first">
              <input type="text" name="first"
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyPress}
                value={this.state.first} />
            </div>
            <div className="col-md-3 SingleContact_item-last">
              <input type="text" name="last"
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyPress}
                value={this.state.last} />
            </div>
            <div className="col-md-3 SingleContact_item-email">
              <input type="text" name="email"
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyPress}
                value={this.state.email} />
            </div>
            <div className="col-md-2 SingleContact_item-country">
              <select name="country"
                required
                value={this.state.country}
                onChange={this.handleInputChange}
                className="SingleContacts_select">
                {countryListSelect()}
              </select>
            </div>
            <div className="col-md-1 text-right">
              {
                this.state.possibleUpdate &&
                <div className="SingleContact_controls">
                  <button type="submit" className="btn btn-transparent"><SuccessIcon /></button>
                  <button type="button" onClick={this.cancelUpdate} className="btn btn-transparent"><FailIcon /></button>
                </div>
              }
              {
                this.state.hover &&
                <button type="button" onClick={this.delete} className="btn btn-transparent"><DeleteIcon /></button>
              }
            </div>
          </form>
        }
      </div>
    );
  }
}

SingleContact.propTypes = {
  person: React.PropTypes.object,
  onDelete: React.PropTypes.func,
  notif: React.PropTypes.object,
};
