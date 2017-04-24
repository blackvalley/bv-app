import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  private userProfile: any
  private chat
  private messages
  constructor(public navCtrl: NavController, public navParams: NavParams, private chatData: ChatProvider) {

      this.chatData.getChat(this.navParams.get('chatid')).on('value', (data) => {
        this.chat = data.val();
        console.log(this.chat)
            });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupchatPage');

  }

  editchat(){
    this.navCtrl.push(EditChatPage);
  }

}
