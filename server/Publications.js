Meteor.publish('tasks', function () {
  return Tasks.find();
});


Meteor.publish('getUser', function (userId) {
  var fields = Schema.Users_Public;
  if(userId === this.userId){
    fields = Schema.Users_Access;
  }
  if(userId){
    return Meteor.users.find(
      {_id: userId},
      { fields: fields }
    );
  }else{
    return Meteor.users.find(
      {_id: this.userId},
      { fields: fields }
    );
  }
});


Meteor.publish('getUsers', function (userIds) {
  return Meteor.users.find(
    {_id: {$in: userIds}},
    { fields: Schema.Users_Public }
  );
});

Meteor.publish('searchUsers', function (searchParams) {
  var searchObj = {

  };
  if(searchParams.nameSearch){
    searchObj['$text'] = {
      $search: searchParams.nameSearch,
    };
  }

  if(searchParams.mentor){
    if(typeof searchObj.profile === 'undefined'){
      searchObj.profile = {};
    }
    searchObj.profile.mentor = true;
  }

  if(searchParams.mentee){
    if(typeof searchObj.profile === 'undefined'){
      searchObj.profile = {};
    }
    searchObj.profile.mentee = true;
  }

  return Meteor.users.find(searchObj, {fields: Schema.Users_Public});
});
