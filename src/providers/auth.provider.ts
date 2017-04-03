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
  signupUser(fname: string, lname: string, email: string, password: string): firebase.Promise<any> {
  return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then((newUser) => {
      this.userdb.child(newUser.uid).set({email: email, fname:fname, lname:lname});
    });
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
