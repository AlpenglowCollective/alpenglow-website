import React, { Component } from 'react';

import RegisterForm from '../modules/RegisterForm.js'
import LoginForm from '../modules/LoginForm.js'

export default class RegisterPage extends Component {

  render(){
    return <span>
      <RegisterForm/>
      <hr/>
      <LoginForm/>
    </span>;
  }
}
