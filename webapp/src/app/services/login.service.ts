import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {
   public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() { }

}


