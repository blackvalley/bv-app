import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OpportunityData } from '../../providers/opportunity.provider'
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
  private oppData:OpportunityData) {}

    ionViewDidLoad() {
      this.oppData.getOppDetail(this.navParams.get('oppId'))
      .on('value', snapshot => {
      this.opp = snapshot.val();
      });
      console.log(this.opp)
    }


}
