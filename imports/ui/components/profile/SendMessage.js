import React, { Component } from 'react';
import FormMessage from '../modules/FormMessage';
import Recaptcha from 'react-recaptcha';
import PropTypes from 'prop-types';

export default class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recaptchaVerified: false,
      formMessage: {
        header: '',
        className: '',
        content: '',
      }
    }
  }

  static propTypes = {
    sendTo: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  }

  submitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget,
          subject = form.querySelector('input[name="subject"]').value,
          message = form.querySelector('textarea[name="message"]').value,
          sendTo = this.props.sendTo;
    if(this.state.recaptchaVerified){
      Meteor.call('sendMessageTo', {subject, message, sendTo}, (error, result)=>{
        if(error){
          this.setState({
            formMessage: {
              header: '500 Server Error',
              className: 'error',
            }
          });

        }else{
          if(result.message){
            this.setState({formMessage: {
              header: result.message.header,
              content: result.message.content,
              className: 'error',
            }});

            form.querySelector('input[name="subject"]').value = '';
            form.querySelector('textarea[name="message"]').value = '';
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

  verifyRecaptcha = () => {
    this.setState({recaptchaVerified: true});
  }

  expiredRecaptcha = () => {
    this.setState({recaptchaVerified: false});
  }

  render(){
    const recaptchaKey = Meteor.settings.public.apiKeys.recaptcha;
    return (
      <form onSubmit={this.submitHandler}>
        <label htmlFor="subject">Subject</label>
        <input type="text" name="subject" className="form-control" placeholder="Subject" />
        <textarea className="form-control" name="message" placeholder="Your message..."></textarea>
        <Recaptcha sitekey={recaptchaKey} verifyCallback={this.verifyRecaptcha} expiredCallback={this.expiredRecaptcha}/>
        <button type="submit" className="btn btn-primary">Send</button>
        <FormMessage header={this.state.formMessage.header} className={this.state.formMessage.className} content={this.state.formMessage.content}/>
      </form>
    );
  }
}
