import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../models/login.model';
import { Token } from '../models/token.model';
import { UserService } from '../user.service';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

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
  
  constructor(private service: UserService, private router: Router, private toastr: ToastrService, route:ActivatedRoute, private sanitizer: DomSanitizer) { 

  }

  ngOnInit(): void {
    this.service.subscriber$.subscribe(data => {
      this.name = data as string;
    });
    this.service.subscriber1$.subscribe(data => {
      this.show = data as boolean;
      this.isSignin();
    });
    
    if (localStorage.getItem('token') != null){
      this.router.navigateByUrl('/');
      console.log("here");
    }
    this.isSignin();
  }

  show: boolean = false;
  token: string = "";
  name: string = "";
  decoded:any;
  profilePicture:any;

  isSignin() {
    if (localStorage.getItem('token') != null){
      this.show = true;
      const temp = localStorage.getItem('token');
      this.token = temp !== null ? temp : "";
      this.decoded = jwt_decode(this.token);
      this.name = this.decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

      if(this.decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"] === "true"){
        this.service.getImage().subscribe(
          (data) =>{
            let objectURL = URL.createObjectURL(data); 
            this.profilePicture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          },
          error =>{
            console.log(error.error);
            this.profilePicture = "../../../assets/images/profile-pic-placeholder.png";
          }
        )
      }
      else{
        this.profilePicture = "../../../assets/images/profile-pic-placeholder.png";
      }

    }
    else{
      this.show = false;
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
          this.router.navigateByUrl('/dashboard');
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
    }
  }

  logOut(){
    localStorage.removeItem('token');
    this.isSignin();
    this.router.navigateByUrl('/');
  }
}
