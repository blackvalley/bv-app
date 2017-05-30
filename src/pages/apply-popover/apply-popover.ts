import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ApplyPopover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-apply-popover',
  templateUrl: 'apply-popover.html'
})
export class ApplyPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
        public viewCtrl:ViewController) {}

  closePage(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPopoverPage');
  }

}
