import React, { Component } from 'react';
import FormMessage from '../modules/FormMessage';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


export default class UploadAvatar extends Component {
  constructor(props) {
    super(props);
    this.cropperRef = React.createRef();
    this.state = {
      originalImage: null,
      uploading: false,
      formMessage: {
        header: '',
        className: '',
        content: '',
      }
    }
  }

  newImage = () => {
    const file = this.avatarUpload.files[0],
          fr = new FileReader();
    fr.addEventListener('load',  () =>{
      this.setState({originalImage: fr.result});
    }, false);

    if (file) {
      fr.readAsDataURL(file);
    }
  }


  submitHandler = (e) => {
    e.preventDefault();
    const parentThis = this;

    this.cropperRef.getCroppedCanvas().toBlob((croppedBlob)=>{
      const upload = Avatars.insert({
               file:  new File([croppedBlob], 'avatar.png'),
               streams: 'dynamic',
               chunkSize: 'dynamic',
             }, false);
      upload.on('start', function () {
        parentThis.setState({uploading: this});
      });

      upload.on('end', (error) => {
        this.setState({uploading: false});
        if (error) {
          this.setState({formMessage:{
            'className': 'error',
            content: 'Error during upload: ' + error
          }});
        } else {
          this.setState({originalImage: false});
          /*Meteor.call('saveAvatar', fileObj, (error, result){
            if(error){
              this.setState({formMessage:{
                'className': 'error',
                content: 'Error saving: ' + error
              }});
            }else{
              this.setState({formMessage:{
                'className': 'success',
                content: 'Avatar Uploaded'
              }});
            }
          });*/
        }
      });

      upload.start();
    });


  }

  _crop(){
    // image in dataUrl
    //console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  render(){
    var cropper;
    if(this.state.originalImage){
      cropper = <Cropper
        ref={(ref)=>this.cropperRef=ref}
        src={this.state.originalImage}
        style={{height: 400, width: '50%'}}
        // Cropper.js options
        aspectRatio={1 / 1}
        guides={true}
        crop={this._crop.bind(this)} />;
    }

    return (
      <form onSubmit={this.submitHandler}>

        <input type="file" onChange={this.newImage} ref={(avatarUpload => this.avatarUpload = avatarUpload)} name="avatar-upload" />
        {this.state.originalImage?<button type="submit" className="btn btn-primary">Upload</button>:'' }
        {this.state.uploading?<div>Uploading...</div>:''}
        {cropper}

        <FormMessage header={this.state.formMessage.header} className={this.state.formMessage.className} content={this.state.formMessage.content}/>
      </form>
    );
  }
}
