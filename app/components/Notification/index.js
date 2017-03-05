import React from 'react';
import cloneDeep from 'lodash.clonedeep';

import './Notification.css';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      style: {
        display: 'none',
      },
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  show(message, type) {
    let style = {
      display: 'inline-block',
      background: '#26C281',
    };
    if (type === 'error') {
      style.background = '#D64541';
    }

    this.setState({
      message,
      style,
    });

    setTimeout(() => {
      this.setState({
        style: {
          display: 'none',
        }
      });
    }, 1500);
  }

  handleMouseEnter() {
    this.setState((prevState) => {
      const state = cloneDeep(prevState);
      state.style.opacity = 0.5;
      return state;
    });
  }

  handleMouseLeave() {
    this.setState((prevState) => {
      const state = cloneDeep(prevState);
      state.style.opacity = 1;
      return state;
    });
  }

  handleClick() {
    this.setState({
      style: {
        display: 'none',
      }
    });
  }

  render() {
    return (
      <div className="Notification"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        style={this.state.style}>
        {this.state.message}
      </div>
    );
  }
}
