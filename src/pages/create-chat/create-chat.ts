import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user.provider'
/*
  Generated class for the CreateChat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-chat',
  templateUrl: 'create-chat.html'
})
export class CreateChatPage {
  private users : any[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userPro:UserProvider , private viewCtrl: ViewController
  ) {
    this.users=[]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateChatPage');
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
    closeChat(){
      this.viewCtrl.dismiss();

    }

}
