import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProfileData } from '../../providers/profile.data'
//import { ConnectionsPage } from '../connections/connections';
import { AuthProvider } from '../../providers/auth.provider'
import { LoginPage } from '../login/login';
import { EditProfilePage } from '../edit-profile/edit-profile'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
    private profileData
    private userProfile: any;
    private birthDate: string;

    constructor(public nav: NavController, private profile: ProfileData,
      private authData: AuthProvider, private alertCtrl:AlertController) {
      this.nav = nav;
      this.profileData = profile;

      this.profileData.getUserProfile().on('value', (data) => {
        this.userProfile = data.val();
        this.birthDate = this.userProfile.birthDate;
            });
        }

    editProfile(){
      this.nav.push(EditProfilePage)
    }

    logOut(): void {
      this.authData.logoutUser().then(() => {
      this.nav.setRoot(LoginPage);
          });
      }


}
