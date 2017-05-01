import { Component } from '@angular/core';

import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { ProfileData } from '../../providers/profile.data'
import { AuthProvider } from '../../providers/auth.provider'
import { LoginPage } from '../login/login';
import { FormsModule, FormBuilder, Validators }   from '@angular/forms';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
    private profileData;
    private userProfile: any;

    private editProfile: string;
    private editProfileForm;
    private editEmploymentForm;
    private loader;



    constructor(public nav: NavController, private profile: ProfileData,
      private formBuilder: FormBuilder, private loadingCtrl: LoadingController,
      private authData: AuthProvider, private alertCtrl:AlertController, private forms: FormsModule) {
      this.nav = nav;
      this.profileData = profile;
      this.editProfile = "persInfo";

      this.profileData.getUserProfile().on('value', (data) => {
        this.userProfile = data.val();
        });

      this.editProfileForm = formBuilder.group({
        firstName: [this.userProfile.firstName, Validators.compose([Validators.minLength(2),Validators.required])],
        lastName: [this.userProfile.lastName, Validators.compose([Validators.minLength(2),Validators.required])],
        college: [this.userProfile.college, Validators.minLength(2)],
        field: [this.userProfile.field, Validators.minLength(2)],
        location: [this.userProfile.location, Validators.minLength(2)],
        birthDate: [this.userProfile.birthDate, Validators.minLength(2)],
        email: [this.userProfile.email, Validators.compose([Validators.minLength(6),Validators.required])],
      });

      this.editEmploymentForm = formBuilder.group({
        jobName: [this.userProfile.jobName, Validators.minLength(2)],
        jobPosition: [this.userProfile.jobPosition, Validators.minLength(2)],
        jobDescription: [this.userProfile.jobDescription, Validators.minLength(2)],
        jobDate: [this.userProfile.jobDate, Validators.minLength(2)],
        jobLink: [this.userProfile.jobLink, Validators.minLength(2)],
      });

        }



    logOut(): void {
      this.authData.logoutUser().then(() => {
      this.nav.setRoot(LoginPage);
          });
      }

      updateEmploymentInfo(){
        if (!this.editEmploymentForm.valid){
          console.log('Form Invalid');
        } else {
          console.log('Form Valid');
          this.profileData.updateEmployment(this.editEmploymentForm.value.jobName,
            this.editEmploymentForm.value.jobPosition, this.editEmploymentForm.value.jobDescription,
            this.editEmploymentForm.value.jobDate, this.editEmploymentForm.value.jobLink)
          .then(() => {
                this.nav.push(ProfilePage);
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
        }
      }


      updatePersonalInfo(){
        if (!this.editProfileForm.valid){
          console.log('Form Invalid');
        } else {
          console.log('Form Valid');
          this.profileData.updateName(this.editProfileForm.value.firstName,
            this.editProfileForm.value.lastName);
          this.profileData.updateProfile(this.editProfileForm.value.college, this.editProfileForm.value.field,
            this.editProfileForm.value.location, this.editProfileForm.value.birthDate)
          this.profileData.updateEmail(this.editProfileForm.value.email)
          .then(() => {
                this.nav.push(ProfilePage);
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
        }
      }


      updatePassword(){
        let alert = this.alertCtrl.create({
          inputs: [
            {
              name: 'newPassword',
              placeholder: 'Your new password',
              type: 'password'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
            },
            {
              text: 'Save',
              handler: data => {
                this.profileData.updatePassword(data.newPassword);
              }
            }
          ]
        });
        alert.present();
      }



  addInterest() {
  let alert = this.alertCtrl.create({
    title: 'Add Interest',
    message: 'What are you Interested in?',
    inputs: [
      {
        name: 'interest',
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Add',
        handler: () => {
          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
}

}
