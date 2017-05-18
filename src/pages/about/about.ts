import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,
          AlertController} from 'ionic-angular';

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
    private viewCtrl:ViewController, private alertCtrl:AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  closePage(){
    this.viewCtrl.dismiss();
  }

  feedback() {
  let alert = this.alertCtrl.create({
    title: 'Feedback',
    message: 'Let us know what you think!',
    inputs: [
      {
        name: 'feedback',
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Submit',
        handler: () => {
          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
  }


}
