import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileData } from '../../providers/profile.data';
import { ChatProvider } from '../../providers/chat.provider';
import { EditChatPage } from '../edit-chat/edit-chat';




/*
  Generated class for the Groupchat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-groupchat',
  templateUrl: 'groupchat.html'
})
export class GroupchatPage {
  private profileData
  private userProfile: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private profile: ProfileData) {
      this.profileData = profile

      this.profileData.getUserProfile().on('value', (data) =>{
      this.userProfile = data.val();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupchatPage');
  }

  editchat(){
    this.navCtrl.push(EditChatPage);
  }

}
