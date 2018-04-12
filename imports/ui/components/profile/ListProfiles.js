import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import MiniProfile from './MiniProfile';

class ListProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: {
        nameSearch: '',
        mentor: false,
        mentee: false,
      }
    }
  }

  static propTypes = {
    users: PropTypes.array,
  }


  render(){
    if(this.props.users){
      return (
        <div>
          {this.props.users.map((user)=>{
            return <MiniProfile userId={user._id} key={user._id} />;
          })}
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
  Meteor.subscribe('searchUsers', props.searchParams);
  return {
    users: Meteor.users.find().fetch(),
  };
})(ListProfiles);
