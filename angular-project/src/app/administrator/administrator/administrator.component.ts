import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/models/product.model';
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
  panelOpenState1 = false;

  addNewProductForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    Ingredients: new FormControl('', Validators.required)
  });

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

  onSubmitAdd(){
    let newProduct:Product = new Product();
    newProduct.name = this.addNewProductForm.controls['Name'].value;
    newProduct.price = this.addNewProductForm.controls['Price'].value;
    newProduct.ingredients = this.addNewProductForm.controls['Ingredients'].value;

    this.service.addNewProduct(newProduct).subscribe(
      (data) => {
        this.toastr.success("New product",(data.name) + " added succesfuly");
        this.addNewProductForm.reset();
        this.ngOnInit();
      },
      error => {
        console.log(error.error);
        this.toastr.error(error.error, "New product");
      });
  }

}
