import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,
          AlertController, Platform} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';



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
    private viewCtrl:ViewController, private alertCtrl:AlertController,
    private platform:Platform, private iab: InAppBrowser) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  closePage(){
    this.viewCtrl.dismiss();
  }

  openWebsite(){
      this.platform.ready().then(() => {
        this.iab.create("http://www.theblackvalley.com", '_blank')
        // this.iab.create("www.google.com",'_blank');
      });
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
