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
  private eventPicRef : firebase.storage.Reference

  constructor(public http: Http, private fire: FirebaseConfigService,
              private profile :ProfileData) {
    console.log('Hello EventData Provider');
    this.currentUser = this.profile.getUserProfile()
    this.myEvents = this.currentUser.child('/eventList')
    this.eventList = this.fire.getDatabase().ref('/events')
    this.eventPicRef = this.fire.getStorage().ref('/eventPics')
            }

   createEvent(eventName: string, eventDate: string, eventLocation: string, eventPrice: number,
      eventCost: number, eventPic=null): firebase.Promise<any> {

      return this.myEvents.push({
        name: eventName,
        location: eventLocation,
        date: eventDate,
        price: eventPrice * 1,
        cost: eventCost * 1
        })
      .then((newEvent) => {
          this.eventList.child(newEvent.key).
              set({name: eventName,
              date: eventDate,
              location: eventLocation,
              price: eventPrice * 1,
              cost: eventCost * 1
            })
          if (eventPic != null) {
            this.eventPicRef.child(newEvent.key).child('eventPicture.png')
            .putString(eventPic, 'base64', {contentType: 'image/png'})
            .then((savedPicture) => {
            this.eventList.child(newEvent.key)
            .child('eventPicture')
            .set(savedPicture.downloadURL);
            this.myEvents.child(newEvent.key)
            .child('eventPicture')
            .set(savedPicture.downloadURL)
            });

          }

      });

    }
    getEventList(): firebase.database.Reference {
      return this.eventList;
    }
    getMyEvents():firebase.database.Reference {
      return this.myEvents;
    }
    getEventDetail(eventId): firebase.database.Reference {
    return this.eventList.child(eventId);
    }
    getMyEventDetail(eventId): firebase.database.Reference{
      return this.myEvents.child(eventId);
    }

}
