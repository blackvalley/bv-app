import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseConfigService } from '../core/service/service'
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChatProvider {

  private chatdb : firebase.database.Reference
  private currentUser
  constructor(public http: Http, private fire:FirebaseConfigService) {
    console.log('Hello ChatProvider Provider');
    this.chatdb = this.fire.getDatabase().ref('/chats')
    this.currentUser = this.fire.getAuth().currentUser
  }
  public get chats(){
    return this.chatdb
  }
  createChat(members:any[],message:string,topic?:string):firebase.Promise<any>{
    let timestamp = Date.now()
    return this.chatdb.push({
        timestamp:timestamp,
        topic:topic
    }).then((newChat)=>{
      this.chatdb.child(newChat.key).child('/messages').push({
          message:message,
          timestamp:timestamp,
          sender:this.currentUser.uid
        })
      this.chatdb.child(newChat.key).child('/members').set(members)
    })
  }

}
