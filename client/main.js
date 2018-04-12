import React from 'react';
import { Meteor } from 'meteor/meteor';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';


import App from '../imports/ui/App';
import RegisterPage from '../imports/ui/components/pages/Register';
import Home from '../imports/ui/components/pages/Home';
import ProfilesPage from '../imports/ui/components/pages/Profiles';

import ViewProfile from '../imports/ui/components/profile/ViewProfile';
import EditProfile from '../imports/ui/components/profile/EditProfile';

Meteor.startup(() => {
  //render(<App />, document.getElementById('render-target'));



});


FlowRouter.route('/register', {
  action() {
    mount(App, {
      main: <RegisterPage/>,
    });
  },
});

FlowRouter.route('/', {
  action() {
    mount(App, {
      main: <Home/>,
    });
  },
});

FlowRouter.route('/profile/', {
  action() {
    mount(App, {
      main: <ViewProfile userId={Meteor.userId()}/>,
    });
  },
});

FlowRouter.route('/profile/edit', {
  action() {
    mount(App, {
      main: <EditProfile userId={Meteor.userId()}/>,
    });
  },
});


FlowRouter.route('/profile/find', {
  action() {
    mount(App, {
      main: <ProfilesPage/>,
    });
  },
});

FlowRouter.route('/profile/:userId', {
  action(params) {
    mount(App, {
      main: <ViewProfile userId={params.userId}/>,
    });
  },
});
