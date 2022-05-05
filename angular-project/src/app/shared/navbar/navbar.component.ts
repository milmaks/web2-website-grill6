import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../models/login.model';
import { Token } from '../models/token.model';
import { UserService } from '../user.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginForm = new FormGroup({
    Email : new FormControl("", Validators.required),
    Password : new FormControl("", Validators.required),
  });
  
  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/');
    this.isSignin();
  }

  show: boolean = false;
  token: string = "";
  name: string = "";
  decoded:any;

  isSignin() {
    if (localStorage.getItem('token') != null){
      this.show = true;
      const temp = localStorage.getItem('token');
      this.token = temp !== null ? temp : "";
      this.decoded = jwt_decode(this.token);
      this.name = this.decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    }
  }

  onSubmit() {
    if(this.loginForm.valid){
      let login:Login = new Login();
      login.email = this.loginForm.controls['Email'].value;
      login.password = this.loginForm.controls['Password'].value;

      this.service.login(login).subscribe(
        (data : Token) => {
          localStorage.setItem('token', data.token);
          this.isSignin();
          this.router.navigateByUrl('/');
        },
        error => {
            this.toastr.error('Incorrect email or password.', 'Authentication failed.');
        }
      );
      this.loginForm.reset();
    }
    else{
      this.toastr.info('Didnt input email or password.', 'Log in failed.');
      this.loginForm.reset();
      console.log("error")
    }
  }

  logOut(){
    localStorage.removeItem('token');
    this.isSignin();
    this.router.navigateByUrl('/');
  }
}
