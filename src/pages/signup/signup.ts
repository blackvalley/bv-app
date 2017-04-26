import {
  NavController,
  LoadingController,
  AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth.provider';
//import { TabsPage } from '../tabs/tabs'
import { Signup2Page } from '../signup2/signup2'
import { Camera, CameraOptions } from '@ionic-native/camera';
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
  private profilePic=null;

 constructor(private nav: NavController, private authProvider: AuthProvider,
   private formBuilder: FormBuilder, private loadingCtrl: LoadingController,
   private alertCtrl: AlertController, private camera:Camera) {

   this.signupForm = formBuilder.group({
     fname: ['', Validators.compose([Validators.minLength(2),Validators.required])],
     lname: ['', Validators.compose([Validators.minLength(2),Validators.required])],
     field: ['', Validators.compose([Validators.minLength(2),Validators.required])],
     email: ['', Validators.compose([Validators.minLength(6),Validators.required])],
     password: ['', Validators.compose([Validators.minLength(6),Validators.required])]
   })
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  // sign up user with auth provider
  signupUser(){
  if (!this.signupForm.valid){
    this.showError("All Fields Required")
    console.log(this.signupForm.value);
  }
  //  else if(this.profilePic == null){
  //   this.showError("Profile Picture Needed")
  // }
  else {
    this.authProvider.signupUser(this.signupForm.value.fname, this.signupForm.value.lname,
       this.signupForm.value.email, this.signupForm.value.field, this.signupForm.value.password,
        this.profilePic)
    .then(() => {
        this.nav.push(Signup2Page)
    }, (error) => {
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

    }
  }
  showError(text){
    let prompt = this.alertCtrl.create({
      title: 'Try Again',
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

   takePicture(){
   const options: CameraOptions = {
     quality : 95,
     destinationType : this.camera.DestinationType.DATA_URL,
     sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
     allowEdit : true,
     encodingType: this.camera.EncodingType.PNG,
     targetWidth: 500,
     targetHeight: 500,
     }
     this.camera.getPicture(options).then(imageData => {
       this.profilePic = imageData;
       console.log(this.profilePic)
     }, error => {
     console.log("ERROR -> " + JSON.stringify(error));
     });
   }


}
