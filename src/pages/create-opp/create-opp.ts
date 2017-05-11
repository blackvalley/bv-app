import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController,
          ActionSheetController, Platform} from 'ionic-angular';
import { OpportunityData } from '../../providers/opportunity.provider';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-create-opp',
  templateUrl: 'create-opp.html'
})
export class CreateOppPage {
  private createForm
  private captureDataUrl: string
  private loader
  constructor(public navCtrl: NavController, public navParams: NavParams,
      private oppData:OpportunityData, private viewCtrl: ViewController, private camera:Camera,
      private loadingCtrl:LoadingController, private alertCtrl:AlertController,
      private actionSheetCtrl: ActionSheetController, private platform: Platform,
      private formBuilder: FormBuilder) {
        this.createForm = formBuilder.group({
          name: ['', Validators.compose([Validators.minLength(2),Validators.required])],
          deadline: ['', Validators.compose([Validators.minLength(2),Validators.required])],
          location: ['', Validators.compose([Validators.minLength(2),Validators.required])],
          qualifications: ['', Validators.compose([Validators.minLength(6),Validators.required])],
          contact: ['', Validators.compose([Validators.minLength(6),Validators.required])],
          description: ['', Validators.compose([Validators.minLength(2),Validators.required])]
        })
      }


  //uses opportunity provider to create an opportunity
  createOpportunity(): void {
    if(!this.createForm.valid){
      this.showError("We need all the details..")
    }
    // else if(this.captureDataUrl==null){
    //   this.showError("Picture Needed.")
    // }
    else {
        this.oppData.createOpportunity(this.createForm.value.name, this.createForm.value.deadline,
        this.createForm.value.location, this.createForm.value.description,
        this.createForm.value.qualifications, this.createForm.value.contact,
        this.captureDataUrl)
      .then( () => {
          this.showSuccess("You have created an opportunity.")
          this.navCtrl.pop();
          }).catch((error)=>{
            this.showError(error)
            this.loader.dismiss()
          });
      }
    }

  closeOpp(){
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
              this.showSuccess("Picture added!")
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
                this.showSuccess("Picture added!")
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


showLoading() {
  this.loader = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  this.loader.present();
}

showError(text) {
  let prompt = this.alertCtrl.create({
    title: 'Wait!',
    subTitle: text,
    buttons: ['OK']
  });
  prompt.present();

}

  showSuccess(text) {
        let prompt = this.alertCtrl.create({
          title: 'Success!',
          subTitle: text,
          buttons: ['OK']
        });
        prompt.present();

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }



}
