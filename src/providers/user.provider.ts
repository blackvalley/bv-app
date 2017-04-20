import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { FirebaseConfigService } from '../core/service/service'
import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider{

    private userdb = this.fire.getDatabase().ref('/users')
    private _currentUser
    constructor (private fire: FirebaseConfigService){
        this._currentUser = this.fire.getAuth().currentUser
    }
    //create listener for users in the database
    get currentUser(){
      return this._currentUser
    }
    getAddedUsers():Observable<any>{
      return Observable.create(obs=>{
        this.userdb.on('child_added', user =>{
          obs.next(user.val())//gets data from user and converts to json
        },
        err =>{

        })
      })
    }

    getUsers() {
      return this.userdb
    }
}
