import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class MenuTitleService {
   public menuTitle: BehaviorSubject<string> = new BehaviorSubject('Menu Principal');

   constructor() {

   }

   setTitle(title: string) {
      this.menuTitle.next(title);
   }

}



