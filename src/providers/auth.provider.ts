import { Injectable } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FirebaseConfigService } from '../core/service/service'

@Injectable()
export class AuthProvider {

  constructor(private fire: FirebaseConfigService){}
  private fireAuth = this.fire.getAuth()
  private userdb = this.fire.getDatabase().ref('/users')
  users: any;

  //login function
  loginUser(email: string, password: string): firebase.Promise<any> {
  return this.fireAuth.signInWithEmailAndPassword(email, password);
    }
  getCurrentUser(){
    return this.fireAuth.currentUser.uid
  }
  //signs up user
  signupUser(fname: string, lname: string, email: string, field: string, password: string): firebase.Promise<any> {
  return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then((newUser) => {
      let date =  Date.now()
      this.userdb.child(newUser.uid)
        .set({  email: email,
                firstName:fname,
                lastName:lname,
<<<<<<< HEAD
                timestamp:date
              });
=======
                field:field,
                timestamp:date
              });

>>>>>>> 15a7582d078460387d829511c9c4379a7b9f0797
    });
  }

  //sign up page 2 for user
  signup2User(profileType: string, gender: string, city: string, state: string): firebase.Promise<any> {
      return this.userdb.child(this.getCurrentUser()).set({profileType:profileType, gender:gender,
        city:city, state:state});

  }


  //reset password
  resetPassword(email: string): firebase.Promise<any> {
  return this.fireAuth.sendPasswordResetEmail(email);
  }

  //logs the user out
  logoutUser(): firebase.Promise<any> {
  return this.fireAuth.signOut();
  }



}
