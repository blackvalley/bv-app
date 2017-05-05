import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseConfigService } from '../core/service/service'
import { ProfileData } from './profile.data'
/*
  Generated class for the OpportunityData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OpportunityData {
  private currentUser
  private myOpportunities : firebase.database.Reference
  private opportunityList : firebase.database.Reference
  private jobPicRef
  constructor(public http: Http, private fire :FirebaseConfigService,
    private profile:ProfileData) {
      this.currentUser = this.profile.getUserProfile()
      this.myOpportunities = this.currentUser.child('/opportunityList')
      this.opportunityList = this.fire.getDatabase().ref('/opps')
      this.jobPicRef = this.fire.getStorage().ref('/oppPics')
    }
    createOpportunity(oppName: string, oppDeadline: string,
          oppLocation: string, oppDescription: string,
          oppPic=null): firebase.Promise<any> {
          let date =  Date.now()
          return this.myOpportunities.push({
            name: oppName,
            location: oppLocation,
            deadline: oppDeadline,
            description: oppDescription,
            timestamp:date
          })
          .then((newOpp) => {
              this.opportunityList.child(newOpp.key).
              set({ name: oppName,
                    location: oppLocation,
                    deadline: oppDeadline,
                    description: oppDescription,
                    timestamp:date
                  })
                  if (oppPic != null) {
                    console.log(oppPic)
                    this.jobPicRef.child(newOpp.key).child('opportunityPicture.png')
                    .putString(oppPic, 'base64', {contentType: 'image/png'})
                    .then((savedPicture) => {
                    this.opportunityList.child(newOpp.key)
                    .child('opportunityPicture')
                    .set(savedPicture.downloadURL);
                    this.myOpportunities.child(newOpp.key)
                    .child('opportunityPicture')
                    .set(savedPicture.downloadURL)
                    });

                  }
          });
        }
        getAllEvents(){

        }
        getOpportunityList(): firebase.database.Reference {
          return this.opportunityList;
        }
        getMyOpportunities():firebase.database.Reference {
          return this.myOpportunities;
        }
        getOppDetail(oppId): firebase.database.Reference {
        return this.opportunityList.child(oppId);
        }
        getMyOppDetail(oppId): firebase.database.Reference{
          return this.myOpportunities.child(oppId);
        }
        saveToMine(opp):firebase.Promise<any>{
          console.log(opp)
          return this.myOpportunities.child(opp.id).set({
                  name: opp.name,
                  location: opp.location,
                  deadline: opp.deadline,
                  description: opp.description,
                  opportunityPicture:opp.picture
          })
        }


}
