import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseConfigService } from '../core/service/service'
import { Observable } from 'rxjs/Observable'
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChatProvider {

  private chatdb : firebase.database.Reference
  private _currentUser
  constructor(public http: Http, private fire:FirebaseConfigService) {
    console.log('Hello ChatProvider Provider');
    this.chatdb = this.fire.getDatabase().ref('/chats')
    this._currentUser = this.fire.getAuth().currentUser
  }
  public get chats(){
    return this.chatdb
  }
  getUserProfile(){
    return this.fire.getDatabase().ref('/users').child(this._currentUser.uid)
  }
  getAddedMessages(chatid:string):Observable<any>{
    return Observable.create(obs=>{
      this.chatdb.child(chatid).child('messages').on('child_added', message =>{
        obs.next(message.val())//gets data from user and converts to json
      },
      err =>{

      })
    })
  }
  public get currentUser(){
    return this._currentUser
  }
  createChat(members:any[],message:string,sender,topic?:string):firebase.Promise<any>{
    let timestamp = Date.now()
    return this.chatdb.push({
        timestamp:timestamp,
        topic:topic,
        members:members,
        latestMessage:message
    }).then((newChat)=>{
      this.chatdb.child(newChat.key).child('messages').push({
        message:message,
        sender:sender,
        timestamp:timestamp
      })
    })
  }
  getChat(id:string):firebase.database.Reference{
    return this.chatdb.child(id)
  }
  getAllChats():firebase.database.Reference{
    return this.chatdb
  }

  sendMessage(message:string,sender,chatid):firebase.Promise<any>{
    let timestamp = Date.now()
    return this.chatdb.child(chatid).update({
        latestUpdate:timestamp,
        latestMessage:message
    }).then(()=>{
      this.chatdb.child(chatid).
      child('messages').push({
        message:message,
        sender:sender,
        timestamp:timestamp
      })
    })
  }
  removeChat(chatid:string,userid:string):firebase.Promise<any>{
    return this.chatdb.child(chatid).child('members')
              .child(userid).remove()
  }


}
