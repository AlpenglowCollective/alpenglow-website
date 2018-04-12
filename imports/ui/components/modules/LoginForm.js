import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import FormMessage from './FormMessage';


export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formMessage: {
        header: '',
        className: '',
        content: '',
      }
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget,
          email = form.querySelector("input[name='email']").value,
          password = form.querySelector("input[name='password']").value;
    Meteor.loginWithPassword(email, password, function(error){
      if(error){
        console.log(error);
        this.setState({formMessage:{
          className: 'error',
          content: error,
        }})
      }else{
        FlowRouter.go('/profile');
      }
    });
  }


  render(){
    return <span ref="container">
      <form id="login" onSubmit={this.submitHandler}>
        <h3>Login</h3>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className="form-control" placeholder="Email" />
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" name="password" placeholder="Password" />

        <button type="submit" className="btn btn-primary">Login</button>
        <FormMessage header={this.state.formMessage.header} className={this.state.formMessage.className} content={this.state.formMessage.content}/>
      </form>
    </span>;
  }
};
