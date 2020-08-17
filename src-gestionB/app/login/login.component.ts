import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserStatusService } from '../services/user-status.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    form2: FormGroup;
    onLoginProcess: boolean = false;

    constructor(private router: Router, 
                private fb: FormBuilder, 
                private uss: UserStatusService) { }
    
    //Helpers
    get userGroup() { return this.form.get('userGroup')}
    get userName() { return this.form.get('userName')}
    get userPassword() { return this.form.get('userPassword')}

    ngOnInit() {

        this.form = new FormGroup({
            userGroup: new FormControl('SistemasW'),
            userName: new FormControl('gfitzpatrick@sistemasw.com.ar'),
            userPassword: new FormControl('123456')
        });
        //setTimeout( () => {this.onLogin();})
    }

    // gotoHome() {
    //     this.router.navigate(["/home"]);
    // }

    onLogin( ) {
        this.onLoginProcess = true;
        setTimeout( () => {
            this.uss.setUser({Group: this.userGroup.value,Name: this.userName.value,Password: this.userPassword.value, Status: ''})
            // this.router.navigate(["/comprobs",1]);
            this.router.navigate(["/home"]);
        },100)
    }

}
