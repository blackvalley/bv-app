import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,
      AlertController, LoadingController } from 'ionic-angular';
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
  private loader
  private opps : any[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, private oppData:OpportunityData,
    private loadingCtrl:LoadingController, private alertCtrl:AlertController) {
      this.opps=[]
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
      this.showLoading()
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
        id: snap.key,
        name: snap.val().name,
        deadline: snap.val().deadline,
        date: snap.val().cost,
        location: snap.val().location,
        picture:snap.val().opportunityPicture
      });
      return false
      });
      console.log(rawList)
      this.opps = rawList;
      this.loader.dismiss()
      });
    }
    addEvent(){
      let eventModal = this.modalCtrl.create(CreateOppPage)
      eventModal.present()
    }

    goToOppDetail(oppId):void{
      this.navCtrl.push(OppDetailPage, {
        oppId:oppId
      })
    }

    showLoading() {
      this.loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loader.present();
    }

    showError(text) {
      setTimeout(() => {
        this.loader.dismiss();
      });

      let prompt = this.alertCtrl.create({
        title: 'Fail',
        subTitle: text,
        buttons: ['OK']
      });
      prompt.present();

  }


}
