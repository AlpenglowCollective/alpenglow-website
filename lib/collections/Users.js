import SimpleSchema from 'simpl-schema';

if(typeof Schema === 'undefined'){
  Schema = {};
}
Schema.Users_Public = {
  _id: 1,
  profile: 1,
  settings: 1,
};

Schema.Users_Access = _.defaults({
  emails: 1,
  role: 1,
}, Schema.Users_Public);


var profileSchema = new SimpleSchema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  title: {
    type: String,
    optional: true,
  },
  avatar: {
    type: String,
    optional: true,
  },
  bio: {
    type: String,
    optional: true,
  },
  homeRegion: {
    type: String,
    optional: true,
  },
  travelRegion: {
    type: Array,
    optional: true,
  },
    'travelRegion.$': {
      type: String,
      optional: true,
    },
  state: {
    type: String,
    optional: true,
  },
  city: {
    type: String,
    optional: true,
  },
  mentor: {
    type: Boolean,
    optional: true,
  },
  mentorSkills: {
    type: Array,
    optional: true,
  },
    'mentorSkills.$': {
      type: String,
      optional: true,
    },
  mentee: {
    type: String,
    optional: true,
  },
  menteeSkills: {
    type: Array,
    optional: true,
  },
    'menteeSkills.$': {
      type: String,
      optional: true,
    },
  interests: {
    type: Array,
    optional: true,
  },
    'interests.$': {
      type: String,
      optional: true,
    },
  goals: {
    type: String,
    optional: true,
  },
  favorites: {
    type: String,
    optional: true,
  },
  experience: {
    type: String,
    optional: true,
  },
  yearsClimbing: {
    type: Number,
    optional: true,
  },
  availability: {
    type: Array,
    optional: true,
  },
    'availability.$': {
      type: Object,
      optional: true,
    },
    'availability.$.day': {
      type: String,
      optional: true,
    },
    'availability.$.time': {
      type: String,
      optional: true,
    },
  gear: {
    type: Array,
    optional: true,
  },
    'gear.$': {
      type: String,
      optional: true,
    },
  social: {
    type: Object,
    optional: true,
  },
    'social.youtube': {
      type: String,
      optional: true,
    },
    'social.facebook': {
      type: String,
      optional: true,
    },
    'social.twitter': {
      type: String,
      optional: true,
    },
    'social.instagram': {
      type: String,
      optional: true,
    },
    'social.mountainproject': {
      type: String,
      optional: true,
    },
});


/// --- User --- ///
Schema.Users = new SimpleSchema({
    emails: {
        type: Array
    },
    'emails.$': {
        type: Object
    },
    'emails.$.address': {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    'emails.$.verified': {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    role: {
      type: String,
      optional: true,
    },
    settings: {
      type: Object,
      optional: true,
    },
      'settings.mountainproject_api': {
        type: Boolean,
        optional: true,
      },
      'settings.show_events': {
        type: Boolean,
        optional: true,
      },
      'settings.hide_user': {
        type: Boolean,
        optional: true,
      },
    profile: {
        type: profileSchema,
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
});

Meteor.users.attachSchema(Schema.Users);

// Helpers
Meteor.users.helpers({
  getAvatar(){
    if(this.profile.avatar){
      const avatarObj = Avatars.findOne(this.profile.avatar);
      const link = `https://s3-${Meteor.settings.private.s3.region}.amazonaws.com/${Meteor.settings.private.s3.bucket}/${avatarObj.currentFile.path}`;
      return link;
    }
  }
});

if (Meteor.isServer) {

    Meteor.users._ensureIndex(
        {
          'profile.firstName': 'text',
          'profile.lastName': 'text',
        }
    );

}
