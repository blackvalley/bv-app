import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProfileData } from '../../providers/profile.data'
//import { ConnectionsPage } from '../connections/connections';
import { AuthProvider } from '../../providers/auth.provider'
import { EditProfilePage } from '../edit-profile/edit-profile'
import { ConnectionsPage } from '../connections/connections'
import { MyEventsPage } from '../my-events/my-events'
import { MyOppsPage } from '../my-opps/my-opps'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
    private profileData
    private userProfile: any;
    private jobs: any[]

    constructor(public nav: NavController, private profile: ProfileData,
      private authData: AuthProvider, private alertCtrl:AlertController) {
      this.nav = nav;
      this.profileData = profile;
      this.jobs=[]
      this.profileData.getUserProfile().on('value', (data) => {
        this.userProfile = data.val();
            });

      this.profileData.getMyJobs().on('value', snapshot => {
        snapshot.forEach( data => {
          this.jobs.push({
            id:data.key,
            jobDate:data.val().jobDate,
            jobDescription:data.val().jobDesription,
            jobLink:data.val().jobLink,
            jobName:data.val().jobName,
            jobPosition:data.val().jobPosition
          })
        })
          console.log(this.jobs)
              });
        }

    editProfile(){
      this.nav.push(EditProfilePage)
    }


    openConnections() {
      this.nav.push(ConnectionsPage);
    }

    openMyEvents() {
      this.nav.push(MyEventsPage);
    }

    openMyOpps() {
      this.nav.push(MyOppsPage);
    }


}
