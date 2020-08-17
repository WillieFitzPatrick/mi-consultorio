import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FechaUtcPipe } from './fecha-utc.pipe';
import { SinoPipe } from './sino.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FechaUtcPipe,
        SinoPipe
    ],
    exports: [
        FechaUtcPipe, 
        SinoPipe
    ]
})
export class SwPipesModule{
    static forRoot() {
        return {
            ngModule: SwPipesModule,
            providers: [ //services that you want to share across modules
                FechaUtcPipe,
                SinoPipe
            ]
        }
    }
}