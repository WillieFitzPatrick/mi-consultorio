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
     this._subscription = this.mts.menuTitle.subscribe( t => this.title = t );
     //this.router.navigate(['/dashboard']);
     //this.router.navigate(['/comprobs/1']);
     //this.router.navigate(['/config']);
     this.router.navigate(['/home']);
  }
  ngOnDestroy() {
     if (this._subscription) {
        this._subscription.unsubscribe();
     }
  }

  gotoHome() {
     this.router.navigate(['/home']);
  }
}
