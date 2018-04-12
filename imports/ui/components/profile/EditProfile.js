import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import EditProfileInner from './EditProfileInner';
import UploadAvatar from './UploadAvatar';

class EditProfile extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    if(this.props.user){
      return (
        <div>
          <EditProfileInner user={this.props.user}/>
          <UploadAvatar />
        </div>
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

export default withTracker((props) => {
  Meteor.subscribe('getUser', props.userId);
  return {
    user: Meteor.users.findOne(props.userId),
  };
})(EditProfile);
