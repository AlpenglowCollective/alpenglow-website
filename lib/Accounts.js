var email = AccountsTemplates.removeField('email');
var pwd = AccountsTemplates.removeField('password');

AccountsTemplates.addFields([
  {
      _id: 'firstName',
      type: 'text',
      placeholder: {
          signUp: "First Name"
      },
      required: true,
      minLength: 2,
  },
  {
      _id: 'lastName',
      type: 'text',
      placeholder: {
          signUp: "Last Name"
      },
      required: true,
      minLength: 2,
  },
  email,
  pwd
]);


Meteor.startup(() => {
  const fields = AccountsTemplates.getFields();
    for (let i = 0; i < fields.length; i++) {
    let field = fields[i];
    if (field._id === 'firstname' || field._id === 'lastname') {
      // Enable it for any other states you want
      field.visible = ['signUp', 'enrollAccount'];
    }
  }
});
