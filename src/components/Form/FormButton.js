import React, { Component } from 'react';

// components
import Spinner from '../Spinner';

class FormButton extends Component {
  render() {
    return (
      <button type="submit" className="btn btn-default btn-block">
        {
          (this.props.spinner.spinning)
          ? <Spinner text={this.props.spinner.text} />
          : this.props.value
        }
      </button>
    );
  } // end-render
} // end-FormButton

export default FormButton;
