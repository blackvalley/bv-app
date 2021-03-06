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
    this.currentUser = this.profile.getCurrentUser()
    this.myEvents = this.profile.getUserProfile().child('/eventList')
    this.eventList = this.fire.getDatabase().ref('/events')
    this.eventPicRef = this.fire.getStorage().ref('/eventPics')
            }

   createEvent(name: string, date:string, location: string,
      description:string, price:string, eventPic=null): firebase.Promise<any> {
      let timestamp =  Date.now()
      return this.myEvents.push({
        name: name,
        date: date,
        location: location,
        price: price,
        description:description,
        timestamp:timestamp
      })

      .then((newEvent) => {
          this.eventList.child(newEvent.key).
              set({
              name: name,
              date: date,
              location: location,
              price: price,
              description:description,
              timestamp:date
            });
            if (eventPic != null) {
              console.log(eventPic)
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
