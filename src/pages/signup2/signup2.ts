import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,
AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth.provider';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs'




/*
  Generated class for the Signup2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup2',
  templateUrl: 'signup2.html'
})
export class Signup2Page {

  private signup2Form;
  private loader;

  constructor(public navCtrl: NavController, private authProvider: AuthProvider,
  public navParams: NavParams, private formBuilder: FormBuilder, private loadingCtrl: LoadingController,
  private alertCtrl: AlertController ) {

    this.signup2Form = formBuilder.group({
      profileType: ['', Validators.compose([Validators.minLength(2),Validators.required])],
      gender: ['', Validators.compose([Validators.minLength(2),Validators.required])],
      city: ['', Validators.compose([Validators.minLength(2)])],
      state: ['', Validators.compose([Validators.minLength(2)])],

    })
  }

  // sign up user with auth provider
  signup2User(){
  if (!this.signup2Form.valid){
    console.log(this.signup2Form.value);
  } else {
        this.loader.dismiss().then( () => {
        this.navCtrl.setRoot(TabsPage);
      });
    } (error) => {
      this.loader.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Try Again",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });

    this.loader = this.loadingCtrl.create();
    this.loader.present();
    }
  }
  showError(text){
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
  showLoading() {//this will show a loading symbol while the app is getting data
     this.loader = this.loadingCtrl.create({
       content: 'Please wait...'
     });
     this.loader.present();
   }

  goToLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup2Page');
  }

}
