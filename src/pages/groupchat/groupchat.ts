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

  private chat
  private messages =[]
  constructor(public navCtrl: NavController, public navParams: NavParams, private chatData: ChatProvider) {
      this.chatData.getChat(this.navParams.get('chatid')).on('value', snapshot => {
        this.chat = snapshot.val()
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupchatPage');
    this.getAddedMessages()

  }
  getAddedMessages(){
    this.chatData.getAddedMessages(this.navParams.get('chatid')).
            subscribe(message => {
              this.messages.push(message)
              console.log(this.messages)
            },
            err =>{
               console.error("Unable to add user - ", err)
            })
  }
  sendMessage(message:string){
    this.chatData.sendMessage(message,this.chatData.currentUser.uid,
        this.navParams.get('chatid'))
  }
  editchat(){
    this.navCtrl.push(EditChatPage);
  }

}
