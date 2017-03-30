import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user.provider'
import { CreateChatPage } from '../create-chat/create-chat';
@Component({
  selector: 'page-multichat',
  templateUrl: 'multichat.html'
})
export class MultiChatPage {
  private users: any[]
  constructor(public navCtrl:NavController, private userPro:UserProvider, private modalCtrl: ModalController) {
    this.users=[]
    this.getAddedUsers()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MultiChatPage');
  }
  createChat(){
      let eventModal = this.modalCtrl.create(CreateChatPage)
      eventModal.present()
  }
  getAddedUsers(){
    this.userPro.getAddedUsers()
          .subscribe(user=> {
            console.log(user)
            this.users.push(user)
          },
          err =>{
             console.error("Unable to add user - ", err)
          })
    }
  }
