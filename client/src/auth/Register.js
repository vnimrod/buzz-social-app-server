import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../store/actions/auth';
import { setErrorAlert } from '../store/actions/validators';

import Input from '../shared/form-elements/Input';
import Button from '../shared/form-elements/Button';

import './Register.css';

const Register = ({ register, setErrorAlert, history, isAuth }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setErrorAlert('Please check you passwords: They dont match');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <form className="Register" onSubmit={(e) => onSubmit(e)}>
      <span className="Register__sign-up-span">Sign Up</span>
      <span>Create your account</span>
      <div className="Register__input">
        <Input
          id="name"
          element="input"
          type="text"
          value={name}
          onChange={onChange}
          placeholder="Full Name"
        />
        <Input
          id="email"
          element="input"
          type="text"
          value={email}
          onChange={onChange}
          placeholder="Email Address"
        />
        <Input
          id="password"
          element="input"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <Input
          id="password2"
          element="input"
          value={password2}
          onChange={onChange}
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <div className="Register__button">
        <Button type="submit">Sign Up</Button>
      </div>
      <span className="Register__sign-in-span">
        Already have and account?{' '}
        <Button to="/login" exact="true" link>
          Sign In
        </Button>
      </span>
    </form>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { register, setErrorAlert })(Register);
