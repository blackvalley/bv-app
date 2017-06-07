import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user.provider'
import { ConnectionsPage } from '../connections/connections'
import { MyEventsPage } from '../my-events/my-events'
import { MyOppsPage } from '../my-opps/my-opps'
/*
  Generated class for the ViewProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html'
})
export class ViewProfilePage {

  private userProfile: any;
  private userid

  constructor(public nav: NavController, private userPro: UserProvider,
     private alertCtrl:AlertController, private navParams:NavParams) {
       this.userid = this.navParams.get('userid')
       this.userPro.getUserProfile(this.userid).on('value', (data) => {
       this.userProfile = data.val();
          });
      }

  openConnections() {
    this.nav.push(ConnectionsPage);
  }

  openMyEvents() {
    this.nav.push(MyEventsPage);
  }
  openMyOpportunities() {
    this.nav.push(MyOppsPage);
  }



}
