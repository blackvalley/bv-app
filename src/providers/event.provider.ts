import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseConfigService } from '../core/service/service'
import { ProfileData } from './profile.data'


@Injectable()
export class EventData {

  private myEvents : firebase.database.Reference;
  private eventList : firebase.database.Reference;
  private currentUser;

  constructor(public http: Http, private fire: FirebaseConfigService,
              private profile :ProfileData) {
    console.log('Hello EventData Provider');
    this.currentUser = this.profile.getUserProfile()
    this.myEvents = this.currentUser.child('/eventList')
    this.eventList = this.fire.getDatabase().ref('/events')
            }
   createEvent(eventName: string, eventDate: string, eventPrice: number,
      eventCost: number): firebase.Promise<any> {
      return this.myEvents.push({
        name: eventName,
        date: eventDate,
        price: eventPrice * 1,
        cost: eventCost * 1,
        revenue: eventCost * -1
      })
      .then((newEvent) => {
        this.eventList
                  .push({name: eventName,
                  date: eventDate,
                  price: eventPrice * 1,
                  cost: eventCost * 1,
                  revenue: eventCost * -1})
      });
    }
    getEventList(): firebase.database.Reference {
      return this.eventList;
    }
    getEventDetail(eventId): firebase.database.Reference {
    return this.eventList.child(eventId);
    }

}
