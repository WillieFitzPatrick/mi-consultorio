import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { UserStatusService } from '../services/user-status.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

   isUserLoggedIn: boolean;

    constructor(protected router: Router, private uss: UserStatusService) {
       // this.us.isUserLoggedIn.subscribe( isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn)
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        if (state.url !== '/login' && this.uss.getUser().Status !== "" ) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}
