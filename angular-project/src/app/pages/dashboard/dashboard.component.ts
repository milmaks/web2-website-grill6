import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  panelOpenState = false;
  panelOpenState1 = false;

  constructor() { }

  changeUserForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    Lastname: new FormControl('', Validators.required),
    BirthDate: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    Type: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
    passwordRep: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)]))
  });

  changePasswordForm = new FormGroup({
    PasswordOld: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
    passwordRepOld: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
    PasswordNew: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
    passwordRepNew: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)]))
  });

  role:string="";
  decoded:any;

  ngOnInit(): void {
    const temp = localStorage.getItem('token');
    const token = temp !== null ? temp : "";
    this.decoded = jwt_decode(token);
    this.role = this.decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  onSubmit(){

  }

  onSubmitPass(){

  }

}


