import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CreateEventPage } from '../create-event/create-event';
import { EventDetailPage } from '../event-detail/event-detail';


@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  constructor(private navCtrl: NavController, private modalCtrl: ModalController) {

  }

  addEvent(){
    let eventModal = this.modalCtrl.create(CreateEventPage)
    eventModal.present()
  }

  opendetails(){
    this.navCtrl.push(EventDetailPage)
  }


}
