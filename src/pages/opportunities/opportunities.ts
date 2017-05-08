import { Component } from '@angular/core'
import { NavController, NavParams, ModalController,
      AlertController, LoadingController } from 'ionic-angular'
import { CreateOppPage } from '../create-opp/create-opp'
import { OppDetailPage } from '../opp-detail/opp-detail'
import { OpportunityData } from '../../providers/opportunity.provider'
import { GeoLocationPage } from '../geo-location/geo-location'
/*
  Generated class for the Opportunities page.
*/
@Component({
  selector: 'page-opportunities',
  templateUrl: 'opportunities.html'
})
export class OpportunitiesPage {
  calendar: any = "event"
  private loader
  private opps : any[]
  private allOpps

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, private oppData:OpportunityData,
    private loadingCtrl:LoadingController, private alertCtrl:AlertController) {
      this.opps=[];
      this.allOpps = 'student'
    }

  addOpp(){
    let oppModal = this.modalCtrl.create(CreateOppPage)
    oppModal.present()
  }

  oppdetails(){
    this.navCtrl.push(OppDetailPage)
  }


  ionViewDidLoad(){

    this.oppData.getOpportunityList().on('value', snapshot => {
      this.showLoading()
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
        id: snap.key,
        name: snap.val().name,
        deadline: snap.val().deadline,
        location: snap.val().location,
        picture:snap.val().opportunityPicture,
        description:snap.val().description
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

    goToOppDetail(opp):void{
      this.navCtrl.push(OppDetailPage, {
        opp:opp
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
    bookmark(opp:any){
      this.oppData.saveToMine(opp).then(()=>{
          this.showSuccess("Saved to Your Opportunities!")
      })

    }
    showSuccess(text) {
          let prompt = this.alertCtrl.create({
            title: 'Success!',
            subTitle: text,
            buttons: ['OK']
          });
          prompt.present();

      }
    goToGeoLocation(){
      this.navCtrl.push(GeoLocationPage)
    }


}
