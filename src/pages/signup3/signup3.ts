import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Signup3 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup3',
  templateUrl: 'signup3.html'
})
export class Signup3Page {
  selectedInterest: false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup3Page');
  }

  backgroundColor(){
    if(this.selectedInterest){
      return "#C6E947";
    } else {
      return "#000000";
    }
  }

  textColor(){
    if(this.selectedInterest){
      return "#000000";
    } else {
      return "#C6E947";
    }
  }



  closePage(){
    this.viewCtrl.dismiss();
  }


}
