// ssimport { Component } from '@angular/core';
import { NavController, ModalController, AlertController,
      LoadingController} from 'ionic-angular';
import { ChatProvider } from '../../providers/chat.provider'
import { CreateChatPage } from '../create-chat/create-chat';
import { GroupchatPage } from '../groupchat/groupchat';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';


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
    private alertCtrl:AlertController, private onesignal: OneSignal,
    private platform: Platform) {
    this.chats=[]
    this.allChats=[]
    this.chatdb=this.chatData.chats


  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.onesignal.startInit('0d94ae81-bd1d-49d9-b235-5ce2e4743f90, googleProjectId);
  //     this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.Notification);
  //     this.onesignal.setSubscription(true);
  //     this.onesignal.handleNotificationReceived().subscribe(() => {
  //       // handle received here how you wish.
  //     });
  //     this.onesignal.handleNotificationOpened().subscribe(() => {
  //       // handle opened here how you wish.
  //     });
  //     this.onesignal.endInit();
  //   })
  // }

  ionViewDidEnter() {
    console.log('ionViewDidLoad MultiChatPage');
    this.showChats()

  }
  createChat(){
    this.navCtrl.push(CreateChatPage)

  }


  openGroupChat(chatid:string){
    this.navCtrl.push(GroupchatPage,{
      chatid:chatid
    });
  }

  showChats(){
    let rawList = []
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
  }
  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'You\'re Great!...'
    });
    this.loader.present();
  }
  showError(text) {
    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }






  }
