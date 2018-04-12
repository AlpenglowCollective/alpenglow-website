
process.env.MAIL_URL = 'smtp://'+Meteor.settings.private.smtp.login+':'+Meteor.settings.private.smtp.password+'@'+Meteor.settings.private.smtp.server+':'+Meteor.settings.private.smtp.port;
