import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { EventData } from '../../providers/event.provider'
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
  private loader
  // private guestName: String =""
  // private guestPicture :any =null

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private eventData:EventData,private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    this.eventData.getEventDetail(this.navParams.get('eventId'))
    .on('value', snapshot => {
    this.event = snapshot.val();
    });
    console.log(this.event)
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }



}
