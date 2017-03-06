import React from 'react';
import cloneDeep from 'lodash.clonedeep';

import './Notification.css';

/**
 * Notification component.
 */
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

  /**
   * Show the notification div.
   * @param {string} message The text message to be as notification content.
   * @param {string=} type The type of the message. Default value is success.
   */
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

  /**
   * Handle the entering of mouse on the notification div.
   */
  handleMouseEnter() {
    this.setState((prevState) => {
      const state = cloneDeep(prevState);
      state.style.opacity = 0.5;
      return state;
    });
  }

  /**
   * Handle the event when the mouse leaves the notification div.
   */
  handleMouseLeave() {
    this.setState((prevState) => {
      const state = cloneDeep(prevState);
      state.style.opacity = 1;
      return state;
    });
  }

  /**
   * Handle click on the notification div.
   */
  handleClick() {
    this.setState({
      style: {
        display: 'none',
      }
    });
  }

  /**
   * Render Notification component.
   */
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
