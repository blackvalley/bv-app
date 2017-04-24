import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { OpportunityData } from '../../providers/opportunity.provider';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-create-opp',
  templateUrl: 'create-opp.html'
})
export class CreateOppPage {
  private captureDataUrl = null
  private loader
  constructor(public navCtrl: NavController, public navParams: NavParams,
      private oppData:OpportunityData, private viewCtrl: ViewController, private camera:Camera,
      private loadingCtrl:LoadingController, private alertCtrl:AlertController) {}


  //uses opportunity provider to create an opportunity
  createOpportunity(oppName: string, oppDeadline: string,
     oppLocation: string, oppDescription: string): void {
      this.oppData.createOpportunity(oppName, oppDeadline,
        oppLocation, oppDescription, this.captureDataUrl)
      .then( () => {
          this.showSuccess()
          this.navCtrl.pop();
          }).catch((error)=>{
            this.showError(error)
            this.loader.dismiss()
          });
      }

  closeOpp(){
    this.viewCtrl.dismiss();

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
        subTitle: "You have created an opportunity",
        buttons: ['OK']
      });
      prompt.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }



}
