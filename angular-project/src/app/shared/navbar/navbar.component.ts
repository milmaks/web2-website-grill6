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
  
  constructor(private service: UserService, private router: Router, private toastr: ToastrService, route:ActivatedRoute, private sanitizer: DomSanitizer) { 

  }

  loginForm = new FormGroup({
    Email : new FormControl("", Validators.required),
    Password : new FormControl("", Validators.required),
  });

  show: boolean = false;
  token: string = "";
  name: string = "";
  decoded:any;
  profilePicture:any;

  ngOnInit(): void {
    this.service.subscriber$.subscribe(data => {
      if(data as string !== "profilepicture")
        this.name = data as string;
      this.isSignin();
    });
    this.service.subscriber1$.subscribe(data => {
      console.log("show false");
      this.show = data as boolean;
      this.isSignin();
    });
    
    if (localStorage.getItem('token') != null){
      this.router.navigateByUrl('/');
    }
    this.isSignin();
  }

  isSignin() {
    console.log("isSignin")
    if (localStorage.getItem('token') != null){
      this.show = true;
      const temp = localStorage.getItem('token');
      this.token = temp !== null ? temp : "";
      this.decoded = jwt_decode(this.token);
      this.name = this.decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

      this.service.getImage().subscribe(
        (data) =>{
          if(data !== null){
            let objectURL = URL.createObjectURL(data); 
            this.profilePicture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
          else
          this.profilePicture = "../../../assets/images/profile-pic-placeholder.png";
        },
        error =>{
          this.profilePicture = "../../../assets/images/profile-pic-placeholder.png";
        }
      );
    }
    else{
      this.show = false;
      this.profilePicture = "";
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
    this.profilePicture = "";
    localStorage.removeItem('token');
    this.router.navigateByUrl('/').then(() =>{
      console.log("reload");
      window.location.reload();
    });
    
  }
}
