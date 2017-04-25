import { Injectable } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FirebaseConfigService } from '../core/service/service'

@Injectable()
export class AuthProvider {
  private profilePicRef
  private fireAuth
  private userdb
  users: any;
  constructor(private fire: FirebaseConfigService){
    this.profilePicRef = this.fire.getStorage().ref('/eventPics')
    this.fireAuth = this.fire.getAuth()
    this.userdb = this.fire.getDatabase().ref('/users')
  }


  //login function
  loginUser(email: string, password: string): firebase.Promise<any> {
  return this.fireAuth.signInWithEmailAndPassword(email, password);
    }
  getCurrentUser(){
    return this.fireAuth.currentUser.uid
  }
  //signs up user
  signupUser(fname: string, lname: string, email: string, field: string,
      password: string, profilePic=null): firebase.Promise<any> {
  return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then((newUser) => {
      let date =  Date.now()
      this.userdb.child(newUser.uid)
        .set({  email: email,
                firstName:fname,
                lastName:lname,
                field:field,
                timestamp:date
              });
              if (profilePic != null) {
                console.log(profilePic)
                this.profilePicRef.child(newUser.uid).child('profilePicture.png')
                .putString(profilePic, 'base64', {contentType: 'image/png'})
                .then((savedPicture) => {
                this.userdb.child(newUser.uid)
                .child('profilePic')
                .set(savedPicture.downloadURL);
                });
              }

      });
  }

  //sign up page 2 for user
  signup2User(profileType: string, gender: string, city: string, state: string): firebase.Promise<any> {
      return this.userdb.child(this.getCurrentUser()).update({profileType:profileType, gender:gender,
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
