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
  getAddedChats():Observable<any>{
    return Observable.create(obs=>{
      this.chatdb.on('child_added', chat =>{
        obs.next(chat.val())//gets data from user and converts to json
      },
      err =>{

      })
    })
  }
  public get currentUser(){
    return this._currentUser
  }
  createChat(members:any[],message:string,topic?:string):firebase.Promise<any>{
    let timestamp = Date.now()
    return this.chatdb.push({
        timestamp:timestamp,
        topic:topic,
        members:members,
        messages:{
          message:message,
          timestamp:timestamp,
          sender:this.currentUser.uid
        }
    })
  }
  addMessage(){

  }

}
