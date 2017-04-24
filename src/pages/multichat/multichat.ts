import { Component } from '@angular/core';
import { NavController, ModalController, AlertController,
      LoadingController} from 'ionic-angular';
import { ChatProvider } from '../../providers/chat.provider'
import { CreateChatPage } from '../create-chat/create-chat';
import { GroupchatPage } from '../groupchat/groupchat'


@Component({
  selector: 'page-multichat',
  templateUrl: 'multichat.html'
})
export class MultiChatPage {
  private chats: any[]
  private allChats:any[]
  private loader
  private chatdb:firebase.database.Reference
  constructor(public navCtrl:NavController, private chatData:ChatProvider,
    private modalCtrl: ModalController, private loadingCtrl: LoadingController,
    private alertCtrl:AlertController) {
    this.chats=[]
    this.allChats=[]
    this.chatdb=this.chatData.chats
    this.showChats()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MultiChatPage');


  }
  createChat(){
      let eventModal = this.modalCtrl.create(CreateChatPage)
      eventModal.present()
  }
  openGroupChat(){
    this.navCtrl.push(GroupchatPage);
  }

  showChats(){
    this.showLoading()
    this.chatData.getAddedChats()
              .subscribe(chat=> {
                //sort chats for only my chats
                let members = chat.members
                for(let member of members){
                  if(member.id==this.chatData.currentUser.uid){
                    this.chats.push(chat);
                    console.log(this.chats)
                    break
                  }
                }
              },
              err =>{
                 console.error("Unable to get chat - ", err)
              })
    this.loader.dismiss()
  }
  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'You\'re Great!...'
    });
    this.loader.present();
  }
  showError(text) {
    setTimeout(() => {
      this.loader.dismiss();
    });

    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }




  }
