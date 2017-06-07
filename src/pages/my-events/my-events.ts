import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { EventData } from '../../providers/event.provider'
/*
  Generated class for the MyEvents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html'
})
export class MyEventsPage {
  private events : any[]
  // private loader
  private myEvents: string
  constructor(private navCtrl: NavController, private eventData : EventData,
    private alertCtrl:AlertController) {
    this.events = [];
    this.myEvents = "post";

  }
  ionViewDidEnter(){
    this.eventData.getMyEvents().on('value', snapshot => {
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

  }
  //
  // goToEventDetail(eventId):void{
  //   this.navCtrl.push(EventDetailPage, {
  //     eventId:eventId
  //   })
  // }
  //
  // showLoading() {
  //   this.loader = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   this.loader.present();
  // }

  showError(text) {
    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();

  }


}
