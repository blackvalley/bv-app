import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { EventData } from '../../providers/event.provider'
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html'
})
export class CreateEventPage {
  private eventPicture
  constructor(public navCtrl: NavController, public navParams: NavParams, private eventData: EventData,
    private viewCtrl: ViewController, private cameraPlugin:Camera) {}


  //uses Event provider to create an event
  createEvent(eventName: string, eventDate: string, eventLocation: string, eventPrice: number,
    eventCost: number): void {
      this.eventData.createEvent(eventName, eventDate, eventLocation, eventPrice,
        eventCost, this.eventPicture)
      .then( () => {
          this.eventPicture = null
          this.navCtrl.pop();
          });
      }

  closeEvent(){
    this.viewCtrl.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

  takePicture(){
  this.cameraPlugin.getPicture({
    quality : 95,
    destinationType : this.cameraPlugin.DestinationType.DATA_URL,
    sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
    allowEdit : true,
    encodingType: this.cameraPlugin.EncodingType.PNG,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: true
  }).then(imageData => {
    this.eventPicture = imageData;
  }, error => {
    console.log("ERROR -> " + JSON.stringify(error));
  });
}
}
