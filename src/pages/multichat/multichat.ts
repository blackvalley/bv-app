import { Component } from '@angular/core';
import { NavController, ModalController, AlertController,
      LoadingController} from 'ionic-angular';
import { ProfileData } from '../../providers/profile.data'
import { CreateChatPage } from '../create-chat/create-chat';
import { GroupchatPage } from '../groupchat/groupchat'


@Component({
  selector: 'page-multichat',
  templateUrl: 'multichat.html'
})
export class MultiChatPage {
  private chats: any[]
  private loader
  private myChats:firebase.database.Reference
  constructor(public navCtrl:NavController, private profile:ProfileData,
    private modalCtrl: ModalController, private loadingCtrl: LoadingController,
    private alertCtrl:AlertController) {
    this.chats=[]
    this.myChats=this.profile.getUserProfile().child('/chats')
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
    this.myChats.on('value',snapshot=>{
      let rawList = []
      snapshot.forEach( snap =>{
        rawList.push({
          id: snap.key,
          title: snap.val().title,
          //inception: snap.val().creationDate,
        })
        return false
      })
      this.chats=rawList
      this.loader.dismiss()
    })
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
