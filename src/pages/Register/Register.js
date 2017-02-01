import { Link } from 'react-router';
import React, { Component } from 'react';

// components
import { FormButton, FormGroup, FormMessage } from '../../components/Form';

// utils
import { getFieldError } from '../../utils';

class Register extends Component {
  constructor(props) {
    super(props);

    // bind `this`
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  } // end-constructor

  handleFieldChange(e) {
    let { name, value } = e.target;
    this.props.changeForm('register', { fieldName: name, value });
  } // end-handleFieldChange

  submitForm(e) {
    e.preventDefault();
    this.props.submitForm('register');
  } // end-submitForm

  render() {
    return (
      <div>
        <h1 className="text-center">Register</h1>

        <form className="form well" noValidate onSubmit={this.submitForm}>
          <FormMessage
            type={this.props.formData.formMessage.type}
            message={this.props.formData.formMessage.value} />

          <FormGroup
            label="Full name"
            type="text"
            name="fullName"
            id="register-full-name"
            placeholder="Full name"
            error={getFieldError('fullName', this.props.formData.formErrors)}
            onChange={this.handleFieldChange} />

          <FormGroup
            label="Username"
            type="text"
            name="username"
            id="register-username"
            placeholder="Username"
            error={getFieldError('username', this.props.formData.formErrors)}
            onChange={this.handleFieldChange} />

          <FormGroup
            label="Email"
            type="email"
            name="email"
            id="register-email"
            placeholder="Email"
            error={getFieldError('email', this.props.formData.formErrors)}
            onChange={this.handleFieldChange} />

          <FormGroup
            label="Password"
            type="password"
            name="password"
            id="register-password"
            placeholder="Password"
            error={getFieldError('password', this.props.formData.formErrors)}
            onChange={this.handleFieldChange} />

          <FormGroup
            label="Confirm password"
            type="password"
            name="confirmPassword"
            id="register-confirm-password"
            placeholder="Confirm password"
            error={getFieldError('confirmPassword', this.props.formData.formErrors)}
            onChange={this.handleFieldChange} />

          <FormButton value="REGISTER" spinner={this.props.spinner} />
        </form>

        <div className="well text-center">
          <Link to="/auth/login">Already have an account? click here.</Link>
        </div>
      </div>
    );
  } // end-render
} // end-Register

export default Register;
