import { Injectable } from '@angular/core';

import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import  * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;

    constructor(private router: Router) { 
        //Info from firebase google goes here
        var config = {
            apiKey: "AIzaSyA82T8ynOEv8by7hPILcPBjaPCYbTpf7do",
            authDomain: "gigabyte-games-ebea9.firebaseapp.com",
            databaseURL: "https://gigabyte-games-ebea9.firebaseio.com",
            projectId: "gigabyte-games-ebea9",
            storageBucket: "gigabyte-games-ebea9.appspot.com",
            messagingSenderId: "202279310495"
          };
          firebase.initializeApp(config);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string) : boolean {
        if(this.userLoggedIn) { return true; }

        this.router.navigate(['/admin/login']);
        return false;
    }

    register(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error){
            alert(error.message);
        });
    }

    verifyUser() {
        this.authUser = firebase.auth().currentUser;

        if(this.authUser) {
            alert('Welcome '+ this.authUser.email);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }

    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function(error) {
                alert(error.message+' Unable to login. Try again!');
            });
    }

    logout(){
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function() {
            alert('Logged Out');
        }, function(error) {
            alert(error.message+' Unable to logout. Try Again!');
        });
    }

}