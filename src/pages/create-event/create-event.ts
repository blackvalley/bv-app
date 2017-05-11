import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,
  AlertController, LoadingController, ActionSheetController, Platform } from 'ionic-angular';
import { EventData } from '../../providers/event.provider'
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';



@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html'
})
export class CreateEventPage {
  private createForm
  private loader
  private captureDataUrl
  constructor(public navCtrl: NavController, public navParams: NavParams, private eventData: EventData,
    private viewCtrl: ViewController, private camera:Camera,
    private loadingCtrl:LoadingController, private alertCtrl:AlertController,
    private actionSheetCtrl: ActionSheetController, private platform: Platform,
    private formBuilder: FormBuilder) {
      this.createForm = formBuilder.group({
        name: ['', Validators.compose([Validators.minLength(2),Validators.required])],
        date: ['', Validators.compose([Validators.minLength(2),Validators.required])],
        location: ['', Validators.compose([Validators.minLength(2),Validators.required])],
        price: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.minLength(2),Validators.required])]
      })
    }


  //uses Event provider to create an event
  createEvent(): void {
    if(!this.createForm.valid){
      this.showError("We need all the details..")
    }
    else{
        this.eventData.createEvent(this.createForm.value.name, this.createForm.value.date,
        this.createForm.value.location, this.createForm.value.description,
        this.createForm.value.price, this.captureDataUrl)
      .then( () => {
          this.showSuccess("Event created!")
          this.navCtrl.pop();
        }).catch((error)=>{
          this.showError(error)
          this.loader.dismiss()
        });
      }
    }

  closeEvent(){
    this.viewCtrl.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
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

}
