import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CreateEventPage } from '../create-event/create-event';
import { EventDetailPage } from '../event-detail/event-detail';
import { EventData } from '../../providers/event.provider'

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  private events : any[]

  constructor(private navCtrl: NavController, private eventData : EventData,
    private modalCtrl: ModalController) {
    this.events = [];
  }
  ionViewDidEnter(){
    this.eventData.getEventList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
      rawList.push({
        id: snap.key,
        name: snap.val().name,
        price: snap.val().price,
        date: snap.val().date,
        location: snap.val().location
      })
      return false
      });
      this.events = rawList;
    });
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


}
