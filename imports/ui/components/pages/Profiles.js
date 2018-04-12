import React, { Component } from 'react';

import ListProfiles from '../profile/ListProfiles.js'

export default class ProfilesPage extends Component {
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


  render(){
    return (
      <div>
        <ListProfiles searchParams={this.state.searchParams} />
      </div>
    );
  }
}
