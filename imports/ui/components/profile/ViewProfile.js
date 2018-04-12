import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import SendMessage from './SendMessage.js'

class ViewProfile extends Component {
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

  static propTypes = {
    user: PropTypes.string,
  }

  render(){
    if(this.props.user){
      return (
        <div>
          User profile<br/>
          {this.props.user.profile.firstName} {this.props.user.profile.lastName}
          <SendMessage sendTo={this.props.user._id}/>
        </div>
      );
    }else{
      return (
        <div>
          User profile
          loading...
        </div>
      );
    }

  }
}

export default withTracker((props) => {
  Meteor.subscribe('getUser', props.userId);
  return {
    user: Meteor.users.findOne(props.userId),
  };
})(ViewProfile);
