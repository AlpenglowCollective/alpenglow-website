import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import FormMessage from '../modules/FormMessage';

export default class EditProfileInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formMessage: {
        header: '',
        className: '',
        content: '',
      },
      user: this.props.user,
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget,
          firstName = form.querySelector("input[name='firstName']").value,
          lastName = form.querySelector("input[name='lastName']").value,
          userId = Meteor.userId(),
          userData = {
            userId,
            firstName,
            lastName
          };
    Meteor.call('editProfile', userData, (error, result)=>{
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
            className: result.state,
          }});
        }
      }
    });
  }

  profileTextChange = (e) => {
    const input = e.currentTarget,
          inputId = input.name;
    this.setState((prevState)=>{
      prevState.user.profile[inputId] = input.value;
      return prevState;
    });
  }



  render() {
    if(this.state.user){
      return (
        <form onSubmit={this.submitHandler}>

          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" className="form-control" onChange={this.profileTextChange} value={this.state.user.profile.firstName}/>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" className="form-control" onChange={this.profileTextChange} value={this.state.user.profile.lastName}/>
          <button type="submit" className="btn btn-primary">Save</button>
          <FormMessage header={this.state.formMessage.header} className={this.state.formMessage.className} content={this.state.formMessage.content}/>
        </form>
      );
    }else{
      return (
        <div>
          loading
        </div>
      );
    }
  }
}
