import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuTitleService } from '../services/menu-title.service';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILogin, IUser, IApiError } from '../models/models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loginError: boolean;

  constructor(private router: Router,
              private ds: DataService,
              private mts: MenuTitleService) { }

  ngOnInit(): void {
    this.mts.setTitle("Acceso al Portal");
    this.createForm();
    this.form.patchValue({
      Usuario: 'admin',
      Password: '1234',
    })
  }

  doLogin() {
    const loginData: ILogin = { 
      Usuario:this.form.get('Usuario').value,
      Password: this.form.get('Password').value,
    };
    this.ds.doLogin(loginData).subscribe( (data: IUser|IApiError) => {
      if (data['Nombre']) {
        this.router.navigate(["home"]);
      } else {
        this.loginError = true;
      }
    },
    (error) => {
      this.loginError = true;
    })

  }

  createForm() {
    this.form = new FormGroup({
      Usuario: new FormControl('',[Validators.required]),
      Password: new FormControl('',[Validators.required]),
    });

  }
  

  
}

