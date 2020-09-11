import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuTitleService } from './services/menu-title.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title: string;
  _subscription: Subscription;

  constructor(private router: Router,
              private mts: MenuTitleService) { }

  ngOnInit() {
     this._subscription = this.mts.menuTitle.subscribe( t => {
        setTimeout( () => { this.title = t },100);
      });
     this.router.navigate(['/login']);
  }
  
  ngOnDestroy() {
     if (this._subscription) {
        this._subscription.unsubscribe();
     }
  }

  gotoHome() {
     this.router.navigate(['/home']);
  }
  gotoLogin() {
     this.router.navigate(['/login']);
  }
}
