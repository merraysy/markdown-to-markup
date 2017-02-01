import { Link } from 'react-router';
import React, { Component } from 'react';

// components
import { FormButton, FormGroup, FormMessage } from '../../components/Form';

// utils
import { getFieldError } from '../../utils';

class Login extends Component {
  constructor(props) {
    super(props);

    // bind `this`
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  } // end-constructor

  handleFieldChange(e) {
    let { name, value } = e.target;
    this.props.changeForm('login', { fieldName: name, value });
  } // end-handleFieldChange

  submitForm(e) {
    e.preventDefault();
    this.props.submitForm('login');
  } // end-submitForm

  render() {
    return (
      <div>
        <h1 className="text-center">Login</h1>

        <form className="form well" onSubmit={this.submitForm}>
          <FormMessage
            type={this.props.formData.formMessage.type}
            message={this.props.formData.formMessage.value} />

          <FormGroup
            label="Username"
            type="text"
            name="username"
            id="register-username"
            placeholder="Username"
            error={getFieldError('username', this.props.formData.formErrors)}
            onChange={this.handleFieldChange} />

          <FormGroup
            label="Password"
            type="password"
            name="password"
            id="register-password"
            placeholder="Password"
            error={getFieldError('password', this.props.formData.formErrors)}
            onChange={this.handleFieldChange} />

          <FormButton value="LOGIN" spinner={this.props.spinner} />
        </form>

        <div className="well text-center">
          <Link to="/auth/register">You don't have an account? click here.</Link>
        </div>
      </div>
    );
  } // end-render
} // end-Login

export default Login;
