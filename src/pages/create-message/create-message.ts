import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat.provider'
import { Camera, CameraOptions } from '@ionic-native/camera'

/*
  Generated class for the CreateMessage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-message',
  templateUrl: 'create-message.html'
})
export class CreateMessagePage {
  private members:any[]
  private loader
  private captureDataUrl
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,
                private loadingCtrl:LoadingController, private alertCtrl:AlertController,
                private chatData:ChatProvider, private camera:Camera) {}

  ionViewDidLoad() {
    this.members=this.navParams.get('members')
    console.log('ionViewDidLoad CreateMessagePage');

  }

  createGroupChat(message:string,topic?:string){

      this.chatData.createChat(this.members,message,topic)
      .then( () => {
        this.showSuccess()
        this.navCtrl.pop();
      }).catch((error)=>{
        this.showError(error)
        this.loader.dismiss()
      });
  }

  takePicture(){
    const options: CameraOptions = {
      quality : 95,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }
    this.camera.getPicture(options).then(imageData => {

      this.captureDataUrl = imageData;
      console.log(this.captureDataUrl)
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

      showLoading() {
        this.loader = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loader.present();
      }

      showError(text) {
        setTimeout(() => {
          this.loader.dismiss();
        });

        let prompt = this.alertCtrl.create({
          title: 'Fail',
          subTitle: text,
          buttons: ['OK']
        });
        prompt.present();
        }
    showSuccess() {
          let prompt = this.alertCtrl.create({
            title: 'Success!',
            subTitle: "Message Sent.",
            buttons: ['OK']
          });
          prompt.present();

      }

    cancelMessage() {
        this.viewCtrl.dismiss();
      }

  

}
