import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdministratorService } from '../administrator.service';
import { Delivery } from '../models/delivery.model';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private service: AdministratorService, private router: Router, private toastr: ToastrService) { }

  deliveryUsers: Delivery[] = [];
  panelOpenState = false;

  ngOnInit(): void {
    this.service.getDeliveryUsers().subscribe(
      (data : Delivery[]) => {
        this.deliveryUsers = data;
      },
      error => {
        this.toastr.error(error.error, 'Getting informations failed.');
      });
  }

  onAllow(email:string){
    let delivery:Delivery = new Delivery();
    delivery.email = email;
    delivery.status = 1;
    this.service.changeDeliveryUser(delivery).subscribe(
      (data) => {
        this.toastr.success("User\'s status changed succesfuly","Delivery user change");
        this.ngOnInit();
      },
      error => {
        this.toastr.error(error.error, "Delivery user change");
      });
  }

  onDeny(email:string){
    let delivery:Delivery = new Delivery();
    delivery.email = email;
    delivery.status = 2;
    this.service.changeDeliveryUser(delivery).subscribe(
      (data) => {
        this.toastr.success("User\'s status changed succesfuly","Delivery user change");
        this.ngOnInit();
      },
      error => {
        this.toastr.error(error.error, "Delivery user change");
      });
  }

}
