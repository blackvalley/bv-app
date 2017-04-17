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

  createChat():firebase.Promise<any>{
    return
  }

}
