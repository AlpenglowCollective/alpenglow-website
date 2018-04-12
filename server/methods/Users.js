Meteor.methods({
  'signUp'(doc){
    check(doc, {
      firstName: String,
      lastName: String,
      email: String,
      password: String,
    });

    if(doc.firstName.length <= 1){
     return {state: 'error',
             error: true,
             message: {
               header: '',
               content: 'Please enter your first name',
             }
           };
   }

   if(doc.password.length <= 4){
     return {state: 'error',
             error: true,
             message: {
               header: '',
               content: 'Please make your password at least 5 characters long',
             }
           };
   }

   if(!Helpers.regex.email.test(doc.email)){
     return{
       state: 'error',
       message: {
         header: '',
         content: 'Please make sure your email is correct',
       },
     };
   }

   var existingUser = Meteor.users.findOne({ 'emails.address' : doc.email });

   if(existingUser){
     return{
       state: 'error',
       message: {
         header: '',
         content: 'That email has already been registered',
       },
     };
   }

   var userData = {
     email: doc.email,
     password: doc.password,
     profile: {
       firstName: doc.firstName,
       lastName: doc.lastName
     },
   };

   var userId = Accounts.createUser(userData);
   if(userId){

     Meteor.users.update(userId, {$set: {
       role: 'member',
     }});

     return{
       state: 'success',
       message: {
         header: '',
         content: 'Account Created',
       },
     };
   }else{
     return{
       state: 'error',
       message: {
         header: '',
         content: 'I am sorry, but we ran into a technical error',
       },
     };
   }

  },
  'editProfile'(doc){
    check(doc, {
      firstName: String,
      lastName: String,
      email: String,
      bio: String,
      homeRegion: String,
      travelRegion: Array,
      state: String,
      city: String,
      mentor: Boolean,
      mentorSkills: Array,
      mentee: Boolean,
      menteeSkills: Array,
      interests: Array,
      goals: String,
      favorites: String,
      experience: String,
      yearsClimbing: Number,
      'availability': Array,
      gear: Array,
      'social.youtube': String,
      'social.facebook': String,
      'social.twitter': String,
      'social.instagram': String,
      'social.mountainproject': String,
      'settings.mountainproject_api': Boolean,
      'settings.hide_user': Boolean,
    });

    if(!Meteor.userId()){
      return {
        state: 'error',
        message: {
          header: '',
          content: 'You must be logged in',
        }
      };
    }

    if(doc.firstName.length <= 1){
     return {state: 'error',
             error: true,
             message: {
               header: '',
               content: 'Please enter your first name',
             }
           };
   }

   if(doc.password.length <= 4){
     return {state: 'error',
             error: true,
             message: {
               header: '',
               content: 'Please make your password at least 5 characters long',
             }
           };
   }

   if(!Helpers.regex.email.test(doc.email)){
     return{
       state: 'error',
       message: {
         header: '',
         content: 'Please make sure your email is correct',
       },
     };
   }

   var existingUser = Meteor.users.findOne({ 'emails.address' : doc.email });

   if(existingUser){
     return{
       state: 'error',
       message: {
         header: '',
         content: 'That email has already being used',
       },
     };
   }

   var userData = {
     email: doc.email,
     password: doc.password,
     profile: {
       firstName: doc.firstName,
       lastName: doc.lastName,
       bio: doc.bio,
       homeRegion: doc.homeRegion,
       travelRegion: doc.travelRegion,
       state: doc.state,
       city: doc.city,
       mentor: doc.mentor,
       mentorSkills: doc.mentorSkills,
       mentee: doc.mentee,
       menteeSkills: doc.menteeSkills,
       interests: doc.interests,
       goals: doc.goals,
       favorites: doc.favorites,
       experience: doc.experience,
       yearsClimbing: doc.yearsClimbing,
       availability: doc.availability,
       gear: doc.gear,
     },



   };

   Meteor.users.update({_id: Meteor.userId()}, {$set: userData});

   return{
     state: 'success',
     message: {
       header: '',
       content: 'Saved!',
     },
   };

 },
 sendMessageTo(doc){
   check(doc, {
     sendTo: Match.OneOf(Array, String),
     subject: String,
     message: String,
   });

   if(!Meteor.userId()){
     return {
       state: 'error',
       message: {
         header: '',
         content: 'You must be logged in',
       }
     };
   }

   const fromUser = Meteor.user(),
         replyTo = fromUser.profile.firstName+' '+fromUser.profile.lastName+' <'+fromUser.emails[0].address+'>',
         from = fromUser.profile.firstName+' '+fromUser.profile.lastName+' <'+Meteor.settings.private.smtp.sendingEmail+'>',
         toUser = Meteor.users.findOne(doc.sendTo);
   Email.send({
     to: toUser.emails[0].address,
     from,
     replyTo,
     subject: doc.subject,
     text: doc.message
   });

   return {
     state: 'success',
     message: {
       header: '',
       content: 'Message sent!',
     }
   }
 },
 saveAvatar(avatar){
   if(!Meteor.userId()){
     return {
       state: 'error',
       message: {
         header: '',
         content: 'You must be logged in',
       }
     };
   }

   Meteor.users.update({_id: Meteor.userId()}, {$set: {
     'profile.avatar': avatar.path,
   }});

   return {
     state: 'success',
     message: {
       header: '',
       content: 'Avatar saved',
     }
   };

 },
 updatePassword(){

 },



});
