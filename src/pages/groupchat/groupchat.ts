import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat.provider';
import { EditChatPage } from '../edit-chat/edit-chat';
import { FormBuilder, Validators } from '@angular/forms';

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
  private me
  private messageForm

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private chatData: ChatProvider, private formBuilder: FormBuilder ) {
      this.chatData.getChat(this.navParams.get('chatid')).on('value', snapshot => {
        this.chat = snapshot.val()
      });
      this.chatData.getUserProfile().on('value', (data) => {
        this.me ={
          id:data.key,
          firstname:data.val().firstName,
          pic:data.val().profilePic
        }
            });
      this.messageForm = formBuilder.group({
        message: ['', Validators.required]
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupchatPage');
    this.getAddedMessages()

  }

  postMessage(){
  if (!this.messageForm.valid){
    console.log(this.messageForm.value.message);
  }
  else {
    this.chatData.sendMessage(this.messageForm.value.message,this.me,
        this.navParams.get('chatid')).then( () =>
        {
        this.messageForm.reset();
        });


    }
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
    this.chatData.sendMessage(message,this.me,
        this.navParams.get('chatid'));
  }
  editChat(){
    this.navCtrl.push(EditChatPage);
  }


}
