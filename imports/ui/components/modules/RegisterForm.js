import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import FormMessage from './FormMessage';
import Recaptcha from 'react-recaptcha';


export default class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      togglePasswordText: 'Show Password',
      recaptchaVerified: false,
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
          firstName = form.querySelector("input[name='firstName']").value,
          lastName = form.querySelector("input[name='lastName']").value,
          email = form.querySelector("input[name='email']").value,
          password = form.querySelector("input[name='password']").value;

    if(this.state.recaptchaVerified){
      Meteor.call('signUp', {firstName, lastName, email, password}, (error, result)=>{
        if(error){
          this.state.formMessage = {
            header: '500 Server Error',
            className: 'error',
          };

        }else{
          if(result.message){
            this.setState({formMessage: {
              header: result.message.header,
              content: result.message.content,
              className: 'error',
            }});
          }

          if(result.state !== 'error'){
            Meteor.loginWithPassword(email, password, function(){
              FlowRouter.go('/profile');
            });
          }

        }
      });
    }else{
      this.setState({formMessage: {
        header: '',
        content: 'Please verify that you are not a robot',
        className: 'error',
      }});
    }

  }

  togglePassword = (e) => {
    e.preventDefault();
    if(this.state.showPassword){
      this.setState({showPassword: false});
      this.setState({togglePasswordText: 'Show Password'});
    }else{
      this.setState({showPassword: true});
      this.setState({togglePasswordText: 'Hide Password'});
    }
  }

  verifyRecaptcha = (e) => {
    this.setState({recaptchaVerified: true});
  }

  expiredRecaptcha = () => {
    this.setState({recaptchaVerified: false});
  }

  render(){
    const recaptchaKey = Meteor.settings.public.apiKeys.recaptcha;
    var passwordField = <input type="password" className="form-control" name="password" placeholder="Password" />;
    if(this.state.showPassword){
      passwordField = <input type="text" className="form-control" name="password" placeholder="Password" />;
    }
    return  <form id="signup" onSubmit={this.submitHandler}>
              <h3>Signup</h3>
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" className="form-control" placeholder="First Name" />
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" className="form-control" placeholder="Last Name" />
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className="form-control" placeholder="Email" />
              <label htmlFor="password">Password</label>
              {passwordField}
              <div className="show-password" onClick={this.togglePassword}>{this.state.togglePasswordText}</div>

              <Recaptcha sitekey={recaptchaKey} verifyCallback={this.verifyRecaptcha} expiredCallback={this.expiredRecaptcha}/>

              <button type="submit" className="btn btn-primary">Signup</button>
              <FormMessage header={this.state.formMessage.header} className={this.state.formMessage.className} content={this.state.formMessage.content}/>
            </form>;
  }
};
