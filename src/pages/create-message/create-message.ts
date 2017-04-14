import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


/*
  Generated class for the CreateMessage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-message',
  templateUrl: 'create-message.html'
})
export class CreateMessagePage {
  private members:any[]
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.members=this.navParams.get('members')
    console.log('ionViewDidLoad CreateMessagePage');

  }

}
