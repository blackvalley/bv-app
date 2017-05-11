import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { FirebaseConfigService } from '../core/service/service'
import firebase from 'firebase'

/*
  Generated class for the ProfileData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileData {

  // We'll use this to create a database reference to the userProfile node.
 private userProfile: firebase.database.Reference;

// We'll use this to create an auth reference to the logged in user.
 public currentUser: firebase.User;


constructor(private fire: FirebaseConfigService) {

 this.currentUser = this.fire.getAuth().currentUser;
 this.userProfile = this.fire.getDatabase().ref('/users');

}

/**
* This one should be really easy to follow, we are calling a function getUserProfile() that takes no parameters.
* This function returns a DATABASE reference to the userProfile/uid of the current user
* and we'll use it to get the user profile info in our page.
*/
getUserProfile(): firebase.database.Reference {
 return this.userProfile.child(this.currentUser.uid);
}
getCurrentUser(){
  return this.currentUser;
}
getMyJobs():firebase.database.Reference {
  return this.getUserProfile().child('jobs');
}

/**
* This one takes 2 string parameters, firstName & lastName, it just saves those 2 to the userProfile/uid node
* for the current user as the firstName & lastName properties.
*/
updateName(firstName: string, lastName: string): firebase.Promise<any> {
 return this.userProfile.child(this.currentUser.uid).update({
   firstName: firstName,
   lastName: lastName
 });
}

updateProfile(college: string, field: string, location: string, birthDate: string): firebase.Promise<any> {
 return this.userProfile.child(this.currentUser.uid).update({
   college: college,
   field: field,
   location: location,
   birthDate: birthDate,
 });
}


updateEmployment(jobName: string, jobPosition: string, jobDescription: string, jobDate: string, jobLink: string): firebase.Promise<any> {
 return this.userProfile.child(this.currentUser.uid).
        child('jobs').push({
           jobName: jobName,
           jobPosition: jobPosition,
           jobDescription: jobDescription,
           jobDate: jobDate,
           jobLink: jobLink,
         });
}




/**
* This is were things get trickier, this one is taking the user's email and first it's calling the
* this.currentUser auth reference to call it's updateEmail() function, it's very important that you
* understand that this is changing your email in the AUTH portion of firebase, the one stored in the
* userProfile/uid node hasn't changed.
* After it successfully changes your email in the AUTH portion of firebase it updates your email in the
* real time database in the userProfile/uid node.
*/
updateEmail(newEmail: string, password: string): firebase.Promise<any> {
 const credential =  firebase.auth.EmailAuthProvider
   .credential(this.currentUser.email, password);

 return this.currentUser.reauthenticate(credential).then( user => {
   this.currentUser.updateEmail(newEmail).then( user => {
     this.userProfile.child(this.currentUser.uid)
       .update({ email: newEmail });
   });
 });
}

/**
* Just like before this is changing the user's password, but remember,
* this has nothing to do with the database this is the AUTH portion of
* Firebase.
*/
updatePassword(newPassword: string, oldPassword: string): firebase.Promise<any> {
 const credential =  firebase.auth.EmailAuthProvider
   .credential(this.currentUser.email, oldPassword);

 return this.currentUser.reauthenticate(credential).then( user => {
   this.currentUser.updatePassword(newPassword).then( user => {
     console.log("Password Changed");
   }, error => {
     console.log(error);
   });
 });
}

}
