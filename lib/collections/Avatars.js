import { Random } from 'meteor/random';
import { FilesCollection } from 'meteor/ostrio:files';
import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';

Avatars = new FilesCollection({
  collectionName: 'avatars',
  allowClientCode: false,
  debug: false,
  storagePath: 'assets/app/uploads/avatars',
  onBeforeUpload: (fileRef) => {
    if (!(fileRef.size <= 10485760 && /png|jpg|jpeg/i.test(fileRef.extension))) {
      return 'Please upload image, with size equal or less than 10MB';
    }

    if(!Meteor.userId()){
      return 'You must be logged in';
    }
    return true;
  }
});

if(Meteor.isServer){
  const s3Conf = Meteor.settings.private.s3 || {};
  const bound  = Meteor.bindEnvironment((callback) => {
    return callback();
  });
  Avatars.onAfterUpload = (fileRef) => {

    if (s3Conf && s3Conf.key && s3Conf.secret && s3Conf.bucket && s3Conf.region) {
      const s3 = new S3({
        secretAccessKey: s3Conf.secret,
        accessKeyId: s3Conf.key,
        region: s3Conf.region,
        // sslEnabled: true, // optional
        httpOptions: {
          timeout: 6000,
          agent: false
        }
      });

      _.each(fileRef.versions, (vRef, version) => {
        // We use Random.id() instead of real file's _id
        // to secure files from reverse engineering on the AWS client
        const filePath = 'uploads/avatars/' + (Random.id()) + '-' + version + '.' + fileRef.extension;

        s3.putObject({
          StorageClass: 'STANDARD',
          Bucket: s3Conf.bucket,
          Key: filePath,
          Body: fs.createReadStream(vRef.path),
          ContentType: vRef.type,
        }, (error) => {
          bound(() => {
            if (error) {
              //console.error('PutObject error: ', error);
            } else {
              // Update FilesCollection with link to the file at AWS
              const upd = { $set: {} };
              upd['$set']['versions.' + version + '.meta.pipePath'] = filePath;
              upd['$set']['path'] = filePath;
              Avatars.collection.update({
                _id: fileRef._id
              }, upd, (updError) => {
                if (updError) {
                  //console.log(updError);
                } else {
                  // Unlink original files from FS after successful upload to AWS:S3
                  const avatar = Avatars.collection.findOne(fileRef._id);
                  Meteor.users.update({_id: fileRef.userId }, {
                    $set: {
                      'profile.avatar': avatar._id
                    }
                  });
                  Avatars.unlink(avatar, version);
                }
              });
            }
          });
        });
      });

    }

  }
}
