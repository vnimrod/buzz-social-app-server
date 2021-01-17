import React, { useState } from 'react';
import { connect } from 'react-redux';

import { login } from '../store/actions/auth';
import Input from '../shared/form-elements/Input';
import Button from '../shared/form-elements/Button';

import './Login.css';
import { Redirect } from 'react-router-dom';
const Login = ({login, isAuth}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password)
  };

  if(isAuth){
    return <Redirect to="/profile" />
  }

  return (
    <form className="Login" onSubmit={(e) => onSubmit(e)}>
      <span className="Login__sign-in-span">Sign In</span>
      <span>Sign in to your account</span>
      <div className="Login__input">
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
          type="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
        />
      </div>
      <div className="Login__button">
        <Button type="submit">Login</Button>
      </div>
      <span className="Login__sign-up-span">
        Don't have and account?
        <Button to="/register" exact="true" link>
          Sign Up
        </Button>
      </span>
    </form>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);
