import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
// import { EventData } from '../../providers/event.provider'
/*
  Generated class for the EventDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  private event
  // private guestName: String =""
  // private guestPicture :any =null

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.event =this.navParams.get('event')
  }



}
