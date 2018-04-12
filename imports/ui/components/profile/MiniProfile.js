import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class MiniProfile extends Component {
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
          Name: {this.props.user.profile.firstName} {this.props.user.profile.lastName}
        </div>
      );
    }else{
      return (
        <div>Loading mini profile</div>
      )
    }
  }
}


export default withTracker((props) => {
  Meteor.subscribe('getUser', props.userId);
  return {
    user: Meteor.users.findOne(props.userId),
  };
})(MiniProfile);
