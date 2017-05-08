import { Component } from '@angular/core';
import { NavController, ModalController, AlertController,
  LoadingController } from 'ionic-angular';
import { CreateEventPage } from '../create-event/create-event';
import { EventDetailPage } from '../event-detail/event-detail';
import { EventData } from '../../providers/event.provider'
import { GeoLocationPage } from '../geo-location/geo-location'
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  private events : any[]
  private loader
  private allEvents

  constructor(private navCtrl: NavController, private eventData : EventData,
    private modalCtrl: ModalController,  private loadingCtrl:LoadingController,
    private alertCtrl:AlertController) {
    this.events = [];
    this.allEvents = 'tech';
  }
  ionViewDidLoad(){
    this.showLoading()
    this.eventData.getEventList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
      rawList.push({
        id: snap.key,
        name: snap.val().name,
        price: snap.val().price,
        date: snap.val().date,
        location: snap.val().location,
        eventPic:snap.val().eventPicture
      })
      return false
      });
      this.events = rawList;
      console.log(this.events)
    });
    this.loader.dismiss()

  }
  addEvent(){
    let eventModal = this.modalCtrl.create(CreateEventPage)
    eventModal.present()
  }

  goToEventDetail(eventId):void{
    this.navCtrl.push(EventDetailPage, {
      eventId:eventId
    })
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
 goToGeoLocation(){
   this.navCtrl.push(GeoLocationPage)
 }


}
