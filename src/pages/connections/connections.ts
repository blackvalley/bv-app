import { Component } from '@angular/core';
import { NavController, AlertController,
    LoadingController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { UserProvider } from '../../providers/user.provider';
import { ViewProfilePage } from '../view-profile/view-profile'
import 'rxjs/add/operator/debounceTime';

/*
  Generated class for the Connections page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-connections',
  templateUrl: 'connections.html'
})
export class ConnectionsPage {

  searchTerm: string = "";
  searchControl: FormControl;
  items: any;
  searching: any = false;
  private users:any[]
  private loader
  constructor(public navCtrl: NavController, private userPro:UserProvider,
  private loadingCtrl:LoadingController, private alertCtrl:AlertController) {
      this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
      this.users=[]
      this.showLoading()
      this.userPro.getUsers().on('value', snapshot => {
        let rawList = [];
        snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          firstname: snap.val().firstName,
          lastname:snap.val().lastName,
          college:snap.val().college,
          employment:snap.val().employment,
          pic:snap.val().profilePic
          })
        return false
        });
        this.users = rawList;
        this.loader.dismiss()
      });
      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

          this.searching = false;
          // this.setFilteredItems();

      });
  }
  viewProfile(userid:string){
    this.navCtrl.push(ViewProfilePage,{
      userid:userid
    })
  }
  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'You\'re Great!...'
    });
    this.loader.present();
  }

  onSearchInput(){
      this.searching = true;
  }

  // setFilteredItems() {
  //
  //     this.items = this.dataService.filterItems(this.searchTerm);
  //
  // }
}
