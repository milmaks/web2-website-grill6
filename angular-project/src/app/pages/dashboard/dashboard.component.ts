import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/shared/models/register.model';
import { Token } from 'src/app/shared/models/token.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  panelOpenState = false;
  panelOpenState1 = false;

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

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
    //ucitavanje elemenata za izmenu
    this.service.getUserInfo().subscribe(
      (data : Register) => {
        this.changeUserForm.setValue({
          Username: data.username,
          Name: data.name,
          Lastname: data.lastname,
          BirthDate: new Date(data.birthDate).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ),
          Address: data.address,
          Email: data.email,
          Type: data.type,
          Password: "",
          passwordRep: "",
        })
      },
      error => {
          this.toastr.error(error.error, 'Failed to get user info.');
      }
    );
    
    const temp = localStorage.getItem('token');
    const token = temp !== null ? temp : "";
    this.decoded = jwt_decode(token);
    this.role = this.decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  onSubmit(){
    if(this.changeUserForm.invalid){
      this.toastr.error('Invalid input, fill all fields correctly', 'Change failed.');
      return;
    }

    let register:Register = new Register();
    register.username = this.changeUserForm.controls['Username'].value;
    register.name = this.changeUserForm.controls['Name'].value;
    register.lastname = this.changeUserForm.controls['Lastname'].value;
    register.birthDate = this.changeUserForm.controls['BirthDate'].value;
    register.address = this.changeUserForm.controls['Address'].value;
    register.email = this.changeUserForm.controls['Email'].value;
    register.password = this.changeUserForm.controls['Password'].value;
    register.type = Number(this.changeUserForm.controls['Type'].value);
    
    if(register.password != this.changeUserForm.controls['passwordRep'].value){
      this.toastr.error('Passwords doesn\'t match.', 'Can\'t change.');
      return;
    }
    
    this.service.changeUserInfo(register).subscribe(
      (_data : Token) => {
        localStorage.setItem('token', _data.token);
        this.router.navigateByUrl('/dashboard');
        this.toastr.success('Fields changed','Account update successful.')
      },
      error => {
          if(error.status == 409)
            this.toastr.error(error.error, 'Change failed.');
          else
            this.toastr.error('Error ocured during change. Try again', 'Change failed.');
      }
    );
  }

  onSubmitPass(){

  }

}


