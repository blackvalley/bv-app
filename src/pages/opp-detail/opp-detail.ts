import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { ApplyPopoverPage } from '../apply-popover/apply-popover'

/*
  Generated class for the OppDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-opp-detail',
  templateUrl: 'opp-detail.html'
})
export class OppDetailPage {
  private opp
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public popoverCtrl:PopoverController) {}

    ionViewDidLoad() {
      this.opp = this.navParams.get('opp')
    }

    presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(ApplyPopoverPage);
      popover.present({
        ev: myEvent
      });
    }



}
