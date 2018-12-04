import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform
  ) {
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      // this.googleLoginTest();
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  // googleLoginTest(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.gplus.login({
  //       'webClientId': '118377643563-mnukqc89au8vp0t743r3hop1ktmb3bhn.apps.googleusercontent.com',
  //       'offline': true
  //     }).then(res => {
  //       const googleCredential = firebase.auth.GoogleAuthProvider
  //         .credential(res.idToken);

  //       firebase.auth().signInWithCredential(googleCredential)
  //         .then(response => {
  //           console.log('Firebase success: ' + JSON.stringify(response));
  //           resolve(response);
  //         });
  //     }, err => {
  //       console.error('Error: ', err);
  //       reject(err);
  //     });
  //   });
  // }

  async nativeGoogleLogin(): Promise<any> {
    try {

      const gplusUser = await this.gplus.login({
        'webClientId': '118377643563-mnukqc89au8vp0t743r3hop1ktmb3bhn.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });

      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));

    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

    } catch (err) {
      console.log(err);
    }

  }

}
