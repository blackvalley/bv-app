import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CreateOppPage } from '../create-opp/create-opp'
import { OppDetailPage } from '../opp-detail/opp-detail'
import { OpportunityData } from '../../providers/opportunity.provider'

/*
  Generated class for the Opportunities page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-opportunities',
  templateUrl: 'opportunities.html'
})
export class OpportunitiesPage {
  calendar: any = "event"
  private opportunities : any[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, private oppData:OpportunityData) {
      this.opportunities=[]
    }

  addOpp(){
    let oppModal = this.modalCtrl.create(CreateOppPage)
    oppModal.present()
  }

  oppdetails(){
    this.navCtrl.push(OppDetailPage)
  }


  ionViewDidEnter(){
    this.oppData.getOpportunityList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
        id: snap.key,
        name: snap.val().name,
        price: snap.val().deadline,
        date: snap.val().cost,
        location: snap.val().location
      });
      console.log(rawList)
      return false
      });
      this.opportunities = rawList;
      });
    }
    addEvent(){
      let eventModal = this.modalCtrl.create(CreateOppPage)
      eventModal.present()
    }

    goToEventDetail(oppId):void{
      this.navCtrl.push(OppDetailPage, {
        eventId:oppId
      })
    }

}
