import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { DummyData } from '../../providers/dummy.data';
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

  constructor(public navCtrl: NavController, public dataService: DummyData) {
      this.searchControl = new FormControl();
  }

  ionViewDidLoad() {

      this.setFilteredItems();
      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

          this.searching = false;
          this.setFilteredItems();

      });


  }

  onSearchInput(){
      this.searching = true;
  }

  setFilteredItems() {

      this.items = this.dataService.filterItems(this.searchTerm);

  }
}
