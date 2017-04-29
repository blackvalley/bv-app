import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController,
          ActionSheetController, Platform} from 'ionic-angular';
import { ChatProvider } from '../../providers/chat.provider';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CreateChatPage } from '../create-chat/create-chat';
import { GroupchatPage } from '../groupchat/groupchat'

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
  private me
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,
                private loadingCtrl:LoadingController, private alertCtrl:AlertController,
                private chatData:ChatProvider, private camera:Camera,
                private actionSheetCtrl:ActionSheetController, private platform:Platform) {}

  ionViewDidLoad() {
    this.members=this.navParams.get('members')
    this.me = this.navParams.get('me')
    console.log('ionViewDidLoad CreateMessagePage');

  }

  createGroupChat(message:string,topic?:string){
      this.members.push(this.me)
      this.chatData.createChat(this.members,message,this.me,topic)
      .then( () => {
        this.showSuccess()
        this.navCtrl.popToRoot()
      }).catch((error)=>{
        this.showError(error)
        this.loader.dismiss()
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

      cameraOptions(){
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Get Photo from ...',
          cssClass: 'share-action-sheet',
          enableBackdropDismiss: true,
          buttons: [
            {
              text: 'Camera',
              role: 'destructive',
              icon: !this.platform.is('ios') ? 'camera' : null,
              handler: () => {
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
            },
            {
              text: 'Photo Library',
              icon: !this.platform.is('ios') ? 'images' : null,
              handler: () => {
                const options: CameraOptions = {
                  quality : 95,
                  destinationType : this.camera.DestinationType.DATA_URL,
                  sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
                  allowEdit : true,
                  encodingType: this.camera.EncodingType.PNG,
                  targetWidth: 500,
                  targetHeight: 500,
                  }
                  this.camera.getPicture(options).then(imageData => {
                    this.captureDataUrl = imageData;
                    console.log(this.captureDataUrl)
                  }, error => {
                  console.log("ERROR -> " + JSON.stringify(error));
                  });
              }
            },
            {
              text: 'Cancel',
              role: 'cancel', // will always sort to be on the bottom
              icon: !this.platform.is('ios') ? 'close' : null,
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();
      }




}
