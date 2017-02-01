import React, { Component } from 'react';

class FormMessage extends Component {
  render() {
    // props
    let { type, message } = this.props;

    // class name
    let className;
    switch (type) {
      case 'error':
        className = 'text-danger';
        break;
      case 'success':
        className = 'text-success';
        break;
      default:
        className = '';
    }

    return (
      <div className="messages text-center">
        <p className={className}>{message}</p>
      </div>
    );
  } // end-render
} // end-FormMessage

export default FormMessage;
