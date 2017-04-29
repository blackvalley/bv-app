import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,
    AlertController, LoadingController} from 'ionic-angular';
import { UserProvider } from '../../providers/user.provider';
import { CreateMessagePage } from '../create-message/create-message'
import { ProfileData } from '../../providers/profile.data';


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
  private me

  private loader
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userPro:UserProvider , private viewCtrl: ViewController,
    private loadingCtrl:LoadingController, private alertCtrl:AlertController,
    private profile:ProfileData) {
    this.users=[]
    this.members=[];
    this.profile.getUserProfile().on('value', (data) => {
      this.me ={
        id:data.key,
        firstname:data.val().firstName,
        pic:data.val().profilePic
      }
          });
  }

  ionViewDidEnter(){
    this.showLoading()
    this.userPro.getUsers().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
      rawList.push({
        id: snap.key,
        firstname: snap.val().firstName,
        lastname:snap.val().lastName,
        college:snap.val().college,
        employment:snap.val().employment,
        pic:snap.val().profilePic
        })
      return false
      });
      this.users = rawList;
      this.loader.dismiss()
    });
    }

    addToChat(user:any){
      this.members.push({
        id: user.id,
        firstname: user.firstname,
        pic:user.pic
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
          members:this.members,
          me:this.me
        })
    }
    closeChat(){
      this.viewCtrl.dismiss();
    }



}
