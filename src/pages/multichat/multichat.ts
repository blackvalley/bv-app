import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ProfileData } from '../../providers/profile.data'
import { CreateChatPage } from '../create-chat/create-chat';
@Component({
  selector: 'page-multichat',
  templateUrl: 'multichat.html'
})
export class MultiChatPage {
  private connections: any[]
  private myConnects:firebase.database.Reference
  constructor(public navCtrl:NavController, private profile:ProfileData,
    private modalCtrl: ModalController) {
    this.connections=[]
    this.myConnects=this.profile.getUserProfile().child('/connections')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MultiChatPage');
  }
  createChat(){
      let eventModal = this.modalCtrl.create(CreateChatPage)
      eventModal.present()
  }

  }
