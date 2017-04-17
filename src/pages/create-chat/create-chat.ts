import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,
    AlertController, LoadingController} from 'ionic-angular';
import { UserProvider } from '../../providers/user.provider';
import { CreateMessagePage } from '../create-message/create-message'

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
  private members :any[]

  private loader
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userPro:UserProvider , private viewCtrl: ViewController,
    private loadingCtrl:LoadingController, private alertCtrl:AlertController
  ) {
    this.users=[]
    this.members=[];
  }

  ionViewDidEnter(){
    this.showLoading()
    this.userPro.getUsers().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
      rawList.push({
        id: snap.key,
        firstname: snap.val().fname,
        lastname:snap.val().lname,
        college: snap.val().college,
        employment: snap.val().employment
        })
      return false
      });
      this.users = rawList;
      this.loader.dismiss()
    });
  }


  // Loop check first see if in array if not add if it is no return


addToChat(user:any){
  this.members.push({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    });

}



    deleteMember(i){
      this.members.splice(i, 1);
      console.log(this.members)

    }
    showLoading() {
      this.loader = this.loadingCtrl.create({
        content: 'You\'re Great!...'
      });
      this.loader.present();
    }

    createMessage(){
      this.navCtrl.push(CreateMessagePage,{
        members:this.members
      })
    }
    closeChat(){
      this.viewCtrl.dismiss();
    }



}
