import { Component, ViewChild, ElementRef } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular';

declare var google;
/*
  Generated class for the GeoLocation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-geo-location',
  templateUrl: 'geo-location.html'
})
export class GeoLocationPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeoLocationPage');
    this.loadMap()
  }
  loadMap(){

  let latLng = new google.maps.LatLng(-34.9290, 138.6010);

  let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  console.log(this.map)
}
}
