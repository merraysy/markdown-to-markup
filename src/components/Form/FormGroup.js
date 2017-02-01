import React, { Component } from 'react';

// css
import './FormControl.css';

class FormGroup extends Component {
  render() {
    // props
    let { label, type, name, id, placeholder, error, onChange } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          className={'form-control' + (error ? ' invalid' : '')}
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={onChange} />
        {error ? <p className="text-danger">{ error }</p> : ''}
      </div>
    );
  } // end-render
} // end-FormGroup

FormGroup.propTypes = {
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  error: React.PropTypes.string,
  onChange: React.PropTypes.func,
}; // end-propTypes

export default FormGroup;
