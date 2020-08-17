import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuTitleService } from './services/menu-title.service';
import { UserStatusService } from './services/user-status.service';
import { User } from './models/app.models';

// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
   title: string;
   _subscriptions: Subscription =  new Subscription();
   _user: User;
   constructor(private router: Router,
               private mts: MenuTitleService,
               private uss: UserStatusService) { }

   ngOnInit() {
      this._subscriptions.add(this.mts.menuTitle.subscribe( t => this.title = t ))
      this._subscriptions.add(this.uss.userStatus.subscribe( u => {
         this._user = u;
      }))

      this.router.navigate(['/login']);
   }
   ngOnDestroy() {
      if (this._subscriptions) {
         this._subscriptions.unsubscribe();
      }
   }

   gotoHome() {
      this.router.navigate(['/home']);
   }

   // openDialog(): void {
   //    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
   //      width: '250px',
   //      data: {name: this.name, animal: this.animal}
   //    });
  
   //    dialogRef.afterClosed().subscribe(result => {
   //      console.log('The dialog was closed');
   //      this.animal = result;
   //    });
   //  }

}


