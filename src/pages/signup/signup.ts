import {
  NavController,
  LoadingController,
  AlertController, ActionSheetController, Platform, } from 'ionic-angular';
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
   private alertCtrl: AlertController, private camera:Camera,
   private actionSheetCtrl: ActionSheetController, private platform: Platform) {

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
   else if(this.profilePic == null){
    this.showError("Profile Picture Needed")
  }
  else {
    this.authProvider.signupUser(this.signupForm.value.fname, this.signupForm.value.lname,
       this.signupForm.value.email, this.signupForm.value.field, this.signupForm.value.password,
        this.profilePic)
    .then(() => {
        this.showSuccess("Now tell us more about you!")
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



   cameraOptions() {
     let actionSheet = this.actionSheetCtrl.create({
       title: 'Get Photo from ...',
       cssClass: 'share-action-sheet',
       enableBackdropDismiss: true,
       buttons: [
         {
           text: 'Camera',
           role: 'destructive',
           icon: !this.platform.is('ios') ? 'camera' : null,
           handler: () => {
             const options: CameraOptions = {
               quality : 95,
               destinationType : this.camera.DestinationType.DATA_URL,
               sourceType : this.camera.PictureSourceType.CAMERA,
               allowEdit : true,
               encodingType: this.camera.EncodingType.PNG,
               targetWidth: 500,
               targetHeight: 500,
               saveToPhotoAlbum: true
             }
             this.camera.getPicture(options).then(imageData => {
               this.profilePic = "data:image/jpeg;base64,"+imageData;
               this.showSuccess("Image added")
               console.log(this.profilePic)

             }, error => {
               console.log("ERROR -> " + JSON.stringify(error));
             });
           }
         },
         {
           text: 'Photo Library',
           icon: !this.platform.is('ios') ? 'images' : null,
           handler: () => {
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
                 this.showSuccess("Image added")
                 console.log(this.profilePic)
               }, error => {
               console.log("ERROR -> " + JSON.stringify(error));
               });
           }
         },
         {
           text: 'Cancel',
           role: 'cancel', // will always sort to be on the bottom
           icon: !this.platform.is('ios') ? 'close' : null,
           handler: () => {
             console.log('Cancel clicked');
           }
         }
       ]
     });
     actionSheet.present();
   }
   showSuccess(text) {
         let prompt = this.alertCtrl.create({
           title: 'You made it in!',
           subTitle: text,
           buttons: ['OK']
         });
         prompt.present();

     }



}
