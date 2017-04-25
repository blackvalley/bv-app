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
    private birthDate: string;
    private editProfile: string;
    private editProfileForm;
    private loader;



    constructor(public nav: NavController, private profile: ProfileData,
      private formBuilder: FormBuilder, private loadingCtrl: LoadingController,
      private authData: AuthProvider, private alertCtrl:AlertController, private forms: FormsModule) {
      this.nav = nav;
      this.profileData = profile;
      this.editProfile = "persInfo";

      this.profileData.getUserProfile().on('value', (data) => {
        this.userProfile = data.val();
        this.birthDate = this.userProfile.birthDate;
        });

      this.editProfileForm = formBuilder.group({
        college: [this.userProfile.college, Validators.minLength(2)],
        location: [this.userProfile.location, Validators.minLength(2)],
        employment: [this.userProfile.employment, Validators.minLength(2)],
        birthDate: [this.userProfile.birthDate, Validators.minLength(2)]
      });

        }



    logOut(): void {
      this.authData.logoutUser().then(() => {
      this.nav.setRoot(LoginPage);
          });
      }

      updateProfile(){
        if (!this.editProfileForm.valid){
          console.log('Form Invalid');
        } else {
          console.log('Form Valid');
          this.profileData.updateProfile(this.editProfileForm.value.college,
            this.editProfileForm.value.location,this.editProfileForm.value.employment).then(() => {
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

        this.loader = this.loadingCtrl.create();
        this.loader.present();
        }
      }




      //creates prompt to edit your name.
      updateName(): void {
          let alert = this.alertCtrl.create({
          message: "Your first name & last name",
          inputs: [
            {
              name: 'firstName',
              placeholder: 'Your first name',
              value: this.userProfile.firstName
            },
            {
              name: 'lastName',
              placeholder: 'Your last name',
              value: this.userProfile.lastName
            },
          ],
          buttons: [
            {
              text: 'Cancel',
            },
            {
              text: 'Save',
              handler: data => {
                this.profileData.updateName(data.firstName, data.lastName);
              }
            }
          ]
        });
        alert.present();
      }
      //method for updating method
      updateDOB(birthDate): void {
        this.profileData.updateDOB(birthDate);
        }
      //prompts to update email.
      updateEmail(): void {
        let alert = this.alertCtrl.create({
          inputs: [
            {
              name: 'newEmail',
              placeholder: 'Your new email',
            },
          ],
          buttons: [
            {
              text: 'Cancel',
            },
            {
              text: 'Save',
              handler: data => {
                this.profileData.updateEmail(data.newEmail);
              }
            }
          ]
        });
        alert.present();
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

}
