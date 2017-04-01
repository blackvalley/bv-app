import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,
    AlertController, LoadingController} from 'ionic-angular';
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
  private loader
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userPro:UserProvider , private viewCtrl: ViewController,
    private loadingCtrl:LoadingController, private alertCtrl:AlertController
  ) {
    this.users=[]
  }

  ionViewDidEnter(){
    this.showLoading()
    this.userPro.getUsers().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
      rawList.push({
        id: snap.key,
        firstname: snap.val().fname,
        })
      return false
      });
      this.users = rawList;
      this.loader.dismiss()
    });

  }

    showLoading() {
      this.loader = this.loadingCtrl.create({
        content: 'You\'re Great!...'
      });
      this.loader.present();
    }
    closeChat(){
      this.viewCtrl.dismiss();
    }


}
