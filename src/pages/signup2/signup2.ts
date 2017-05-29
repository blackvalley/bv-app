import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,
AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth.provider';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { Signup3Page } from '../signup3/signup3'





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
        let bio = {
          profileType:this.signup2Form.value.profileType,
          gender:this.signup2Form.value.gender,
          city:this.signup2Form.value.city,
          state:this.signup2Form.value.state
        }
        this.authProvider.signup2User(bio)
        .then(()=>{
          this.showSuccess()
          this.navCtrl.setRoot(TabsPage)
        })
        .catch((error)=>{
          this.showError(error)
        })

    }
  }
  showError(text){

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

  goToInterestPage(){
    this.navCtrl.push(Signup3Page);
  }


  showSuccess() {
        let prompt = this.alertCtrl.create({
          title: 'Success!',
          subTitle: "You are signed up!",
          buttons: ['OK']
        });
        prompt.present();

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup2Page');
  }

}
