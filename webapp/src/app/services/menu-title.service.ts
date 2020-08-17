import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TITLE_CONST = "Mi Consultorio"

@Injectable()
export class MenuTitleService {
   public menuTitle: BehaviorSubject<string> = new BehaviorSubject(`${TITLE_CONST} - Menu Principal`);

   constructor() {

   }

   setTitle(title: string) {
      this.menuTitle.next(`${TITLE_CONST} - ${title}`);
   }

}


