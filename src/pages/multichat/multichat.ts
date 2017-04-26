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


  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad MultiChatPage');
    this.showChats()

  }
  createChat(){
      this.chats = []
      let eventModal = this.modalCtrl.create(CreateChatPage)
      eventModal.present()
  }
  openGroupChat(chatid:string){
    this.navCtrl.push(GroupchatPage,{
      chatid:chatid
    });
  }

  showChats(){
    let rawList = []
    this.showLoading()
    this.chatData.getAllChats().on('value', snapshot=> {
                snapshot.forEach(snap =>{
                  let members = snap.val().members
                  for(let member of members){
                    if(member.id==this.chatData.currentUser.uid){
                      rawList.push({
                        id:snap.key,
                        topic:snap.val().topic,
                        timestamp:snap.val().timestamp,
                        members:snap.val().members,
                        latestMessage:snap.val().latestMessage
                      });
                      break
                    }
                  }
                  return false
                })
                console.log(rawList)

              },
              err =>{
                 console.error("Unable to get chat - ", err)
              })
    this.chats=rawList
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
