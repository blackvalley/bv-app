import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login'
import { TabsPage } from '../pages/tabs/tabs';
import { FirebaseConfigService } from '../core/service/service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  zone : NgZone
  rootPage:any = TabsPage;

  constructor(platform: Platform, fire:FirebaseConfigService) {
    this.zone = new NgZone({});
    const unsubscribe = fire.getAuth().onAuthStateChanged((user) => {
        this.zone.run( () => {
            if (!user) {
              this.rootPage = LoginPage;
              unsubscribe()
            } else {
              this.rootPage = TabsPage;
              unsubscribe()
            }
          });
        });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

}
