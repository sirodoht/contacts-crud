import React from 'react';

import SuccessIcon from 'babel-loader!svg-react-loader!./assets/check.svg?name=SuccessIcon';
import FailIcon from 'babel-loader!svg-react-loader!./assets/times.svg?name=FailIcon';
import DeleteIcon from 'babel-loader!svg-react-loader!./assets/trash-o.svg?name=TrashIcon';

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

  handleSubmit(event) {
    event.preventDefault();

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
      <div className="row contacts-item" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        {
          !this.state.deleted &&
          <form onSubmit={this.handleSubmit}>
            <div className="col-md-3 contacts-item-first">
              <input type="text" name="first"
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyPress}
                value={this.state.first} />
            </div>
            <div className="col-md-3 contacts-item-last">
              <input type="text" name="last"
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyPress}
                value={this.state.last} />
            </div>
            <div className="col-md-3 contacts-item-email">
              <input type="text" name="email"
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyPress}
                value={this.state.email} />
            </div>
            <div className="col-md-2 contacts-item-country">
              <input type="text" name="country"
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyPress}
                value={this.state.country} />
            </div>
            <div className="col-md-1 text-right">
              {
                this.state.possibleUpdate &&
                <div className="controls">
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
};
