import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-white-box',
    template: `
    <div #box class="white-box">
        <div class="title-container with-border bottom" (click)="toggleContent()">
            <h3>{{title}}</h3>
            <mat-icon aria-hidden="false" aria-label="Toggle Box Content" class="icon" *ngIf="icon">{{icon}}</mat-icon>
        </div>
        <div class="box-content" [hidden]="hideContent">
            <ng-content></ng-content>
        </div>
    </div>
  `,
    styles: [`
    .white-box {
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 6px;
        box-shadow: $shadow;
        padding: 20px;
        @media screen and (max-width: 960px) {
            margin-bottom: 0px;
            border-radius: 0px;
            box-shadow: none;
            border-bottom : 1px solid #e2e4e5;
            padding: 5px;
        }
        h3 {
            margin-bottom: 15px;
        }
    }
    .box-content {
        margin-top: 15px;

    }
    .title-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        cursor: pointer;
    }
    [hidden] {
        display: none !important;
    }
    `]
})
export class WhiteBoxComponent implements OnInit, AfterViewInit {
    @Input() title: string;
    @Input() icon: string;
    @Input() sticky: number;
    @Input("hide-content") hideContent: boolean;
    @Output("onHideContent") onHideContent = new EventEmitter<boolean>();
    @ViewChild("box") box: ElementRef;

    isSticky = false;
    constructor() { }

    ngOnInit(): void {
        if (this.sticky) {
            this.isSticky = true;
        }
    }

    ngAfterViewInit() {
        if (this.sticky)
            this.box.nativeElement.style.position = "sticky";
            this.box.nativeElement.style.top = this.sticky + "px";
    }

    toggleContent() {
        this.hideContent = !this.hideContent;
        if (this.onHideContent.observers.length > 0) {
            this.onHideContent.emit(true);
        }
    }
}
