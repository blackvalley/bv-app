import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { OpportunityData } from '../../providers/opportunity.provider'

@Component({
  selector: 'page-create-opp',
  templateUrl: 'create-opp.html'
})
export class CreateOppPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private oppData:OpportunityData, private viewCtrl: ViewController) {}


  //uses opportunity provider to create an opportunity
  createOpportunity(oppName: string, oppDeadline: string,
     oppLocation: string, oppDescription: string): void {
      this.oppData.createOpportunity(oppName, oppDeadline,
        oppLocation, oppDescription)
      .then( () => {
          this.navCtrl.pop();
          });
      }

  closeOpp(){
    this.viewCtrl.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }



}
