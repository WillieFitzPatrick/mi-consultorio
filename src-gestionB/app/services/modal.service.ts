import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Modal } from '../models/app.models';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
   public modalStatus: BehaviorSubject<Modal> = new BehaviorSubject({title:'',component:'',canClose:false});
   protected _isModalOpen: boolean; 

   constructor() {
   }
   setModal( modal: Modal ){
        this.modalStatus.next( modal );

   }
//    Open(component: any) {
//       user.Status = "logged-in";
//       this._userStatus = user;
//       this.userStatus.next(user);
//    }

//    getUser() {
//        return this._userStatus;
//    }

//    noUser() {
//        this._userStatus = {Group:'',Name:'',Password:'',Status:''}; 
//     this.userStatus.next( this._userStatus );
//    }

}
