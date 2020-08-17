import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/app.models';

@Injectable({
    providedIn: 'root',
})
export class UserStatusService {
   public userStatus: BehaviorSubject<User> = new BehaviorSubject({Group:'',Name:'',Password:'',Status:''});
   protected _userStatus; 
   constructor() {

   }

   setUser(user: User) {
      user.Status = "logged-in";
      this._userStatus = user;
      this.userStatus.next(user);
   }

   getUser() {
       return this._userStatus;
   }

   noUser() {
       this._userStatus = {Group:'',Name:'',Password:'',Status:''}; 
    this.userStatus.next( this._userStatus );
   }

}