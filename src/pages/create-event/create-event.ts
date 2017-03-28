import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { EventData } from '../../providers/event.provider'


@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html'
})
export class CreateEventPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventData: EventData,
    private viewCtrl: ViewController) {}


  //uses Event provider to create an event
  createEvent(eventName: string, eventDate: string, eventLocation: string, eventPrice: number,
    eventCost: number): void {
      this.eventData.createEvent(eventName, eventDate, eventLocation, eventPrice, eventCost)
      .then( () => {
          this.navCtrl.pop();
          });
      }

  closeEvent(){
    this.viewCtrl.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }



}
