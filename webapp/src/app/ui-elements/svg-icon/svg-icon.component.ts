import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
    selector: 'svg-icon',
    template: `
        <svg #icon>
            // SVG elements don't have properties, therefore attribute binding is needed
            // https://stackoverflow.com/a/35082700
            <use attr.xlink:href="assets/icons.svg#{{iconID}}-icon"></use>
        </svg>`,
    styles: [``]
})
export class SvgIconComponent implements OnInit, AfterViewInit {
    @ViewChild('icon') iconElement: ElementRef;
    @Input("icon") iconID: string;
    @Input("color") iconColor: string = "#000";
    @Input("size") iconSize: string = "16";
    @Input("margin") iconMargin: string = "8";
    @Input("border") border: boolean = false;

    constructor( private renderer: Renderer2, private element: ElementRef ) { }

    ngOnInit() {
        this.iconSize = this.iconSize + 'px';
        if (this.iconMargin)
            this.iconMargin = this.iconMargin + 'px';
    }

    ngAfterViewInit() {

        let svg = this.iconElement.nativeElement;
        this.renderer.setStyle( svg,"fill", this.iconColor );
        // if (this.border) {
        //     this.renderer.setStyle( svg,"width", this.iconSize + 6 );
        //     this.renderer.setStyle( svg,"height", this.iconSize + 6 );            
        //     this.renderer.setStyle( svg,"padding", "6px" );            
        //     this.renderer.setStyle( svg,"border-width", "1px");
        //     this.renderer.setStyle( svg,"border-style", "solid");
        //     this.renderer.setStyle( svg,"border-color", "gray");
        //     this.renderer.setStyle( svg,"border-radius", "6px");
        // } else {
            this.renderer.setStyle( svg,"width", this.iconSize );
            this.renderer.setStyle( svg,"height", this.iconSize );

        // }
        if (this.iconMargin) {
            this.renderer.setStyle( svg,"margin-left", this.iconMargin );
        }

        this.renderer.setStyle( svg, "cursor", "pointer" );

    }
}

// import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

// @Component({
//     selector: 'svg-icon',
//     template: `
//         <ng-content select="[slot=before]"></ng-content>
//         <svg #icon>
//             // SVG elements don't have properties, therefore attribute binding is needed
//             // https://stackoverflow.com/a/35082700

//             <!-- <use attr.xlink:href="../../assets/sprite.svg#{{iconID}}"></use> -->
//             <!-- <use attr.xlink:href="../../assets/icons/{{iconID}}.svg"></use> -->
//         </svg>
//         <ng-content select="[slot=after]"></ng-content>
//         `,
//     styles: [`
//     :host {
//         display: flex;
//         align-items: flex-end;
//     }`]
// })
// export class SvgIconComponent implements OnInit, AfterViewInit {
//     @ViewChild('icon') iconElement: ElementRef;
//     @Input("icon") iconID: string;
//     // @Input("color") iconColor: string = "#000";
//     @Input("color") iconColor: string = "#3b4a5e"; // Kara light gray
//     @Input("size") iconSize: string = "16";
//     @Input("margin") iconMargin: string = "8";

//     constructor( private renderer: Renderer2, private element: ElementRef ) { }

//     iconPath = '';
//     ngOnInit() {
//         this.iconPath = `url(../../assets/icons/${this.iconID}.svg)`;
//         this.iconSize = this.iconSize + 'px';
//         if (this.iconMargin)
//             this.iconMargin = this.iconMargin + 'px';
//     }

//     ngAfterViewInit() {

//         let svg = this.iconElement.nativeElement;
//         this.renderer.setStyle( svg,"fill", this.iconColor );
//         this.renderer.setStyle( svg,"width", this.iconSize );
//         this.renderer.setStyle( svg,"height", this.iconSize );
//         this.renderer.setStyle( svg,"background", this.iconPath );
//         if (this.iconMargin)
//             this.renderer.setStyle( svg,"margin-left", this.iconMargin );
//         this.renderer.setStyle( svg, "cursor", "pointer" );

//     }
// }
