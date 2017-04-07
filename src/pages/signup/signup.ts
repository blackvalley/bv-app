import {
  NavController,
  LoadingController,
  AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth.provider';
import { TabsPage } from '../tabs/tabs'
import { Signup2Page } from '../signup2/signup2'

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  private signupForm;
  private loader;


 constructor(private nav: NavController, private authProvider: AuthProvider,
   private formBuilder: FormBuilder, private loadingCtrl: LoadingController,
   private alertCtrl: AlertController) {

   this.signupForm = formBuilder.group({
     fname: ['', Validators.compose([Validators.minLength(2),Validators.required])],
     lname: ['', Validators.compose([Validators.minLength(2),Validators.required])],
     email: ['', Validators.compose([Validators.required, Validators.required])],
     password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
   })
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  // sign up user with auth provider
  signupUser(){
  if (!this.signupForm.valid){
    console.log(this.signupForm.value);
  } else {
    this.authProvider.signupUser(this.signupForm.value.fname, this.signupForm.value.lname,
      this.signupForm.value.email, this.signupForm.value.password)
    .then(() => {
      this.loader.dismiss().then( () => {
        this.nav.setRoot(TabsPage);
      });
    }, (error) => {
      this.loader.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
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
   moreInfo(){
     this.nav.push(Signup2Page)
   }


}
