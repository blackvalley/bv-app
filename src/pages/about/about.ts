import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl:ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  closePage(){
    this.viewCtrl.dismiss();
  }


}
