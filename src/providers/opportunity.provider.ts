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
  constructor(public http: Http, private fire :FirebaseConfigService,
    private profile:ProfileData) {
      this.currentUser = this.profile.getUserProfile()
      this.myOpportunities = this.currentUser.child('/opportunityList')
      this.opportunityList = this.fire.getDatabase().ref('/opps')
    }

       createOpportunity(oppName: string, oppDeadline: string,
          oppLocation: string, oppDescription: string): firebase.Promise<any> {
          return this.myOpportunities.push({
            name: oppName,
            location: oppLocation,
            deadline: oppDeadline,
            description: oppDescription
          })
          .then((newOpp) => {
              this.opportunityList.child(newOpp.key).
              set({ name: oppName,
                    location: oppLocation,
                    deadline: oppDeadline,
                    description: oppDescription
                  //  creator: this.currentUser.uid
                  })
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


}
