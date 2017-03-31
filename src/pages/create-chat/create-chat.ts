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
    this.getAddedUsers()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateChatPage');
  }
  getAddedUsers(){
    this.showLoading()
    this.userPro.getAddedUsers()
          .subscribe(user=> {
            console.log(user)
            this.users.push(user)
          },
          err =>{
             console.error("Unable to add user - ", err)
          })
    this.loader.dismiss()
    }
    closeChat(){
      this.viewCtrl.dismiss();

    }

    showLoading() {
      this.loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loader.present();
    }


}
