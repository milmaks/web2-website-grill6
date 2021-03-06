import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order, ProductsInOrder } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';
import { UserService } from 'src/app/shared/user.service';
import { AdministratorService } from '../administrator.service';
import { Delivery } from '../models/delivery.model';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private userservice: UserService, private service: AdministratorService, private router: Router, private toastr: ToastrService) { }

  deliveryUsers: Delivery[] = [];
  orders: Order[] = [];
  foodItems: ProductsInOrder[] = [];
  foodItemsMap: Map<number,Product> = new Map<number,Product>(); 
  statusMap: Map<number,string> = new Map<number,string>();
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  now:any;

  addNewProductForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    Ingredients: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.foodItems = [];
    this.foodItemsMap = new Map<number,Product>(); 

    this.service.getDeliveryUsers().subscribe({
      next: (data : Delivery[]) => {
        this.deliveryUsers = data;
      },
      error: (error) => {
        this.toastr.error(error.error, 'Preuzimanje informacija o korisniku neuspesno.');
      }
    });

    // get all products for order
    this.userservice.getAllProducts().subscribe({
      next: (data) => {
        for(let p of data){
          this.foodItems.push(new ProductsInOrder(p.id,0));
          this.foodItemsMap.set(p.id,p);
        }
      },
      error: (error) => {
        this.toastr.error(error.error, 'Preuzimanje proizvoda sa menija neuspesno.');
      }
    });

    this.service.getAllOrders().subscribe({
      next: (data : Order[]) => {
        this.orders = data;
        this.now = new Date();
        for(let o of this.orders){
          if(o.deliveryEmail){
            if(new Date(o.deliveryTime).getTime() < this.now.getTime())
              this.statusMap.set(o.id,"Isporucena");
            else
              this.statusMap.set(o.id,"Aktivna");
          }
        }
      },
      error: (error) => {
        this.toastr.error(error.error, 'Preuzimanje porudzbina neuspesno.');
      }
    });
  }

  onAllow(email:string){
    let delivery:Delivery = new Delivery();
    delivery.email = email;
    delivery.status = 1;
    this.service.changeDeliveryUser(delivery).subscribe({
      next: (data) => {
        this.toastr.success("Dostavljacev status je promenjen uspenso");
        this.ngOnInit();
      },
      error: (error) => {
        this.toastr.error(error.error, "Nije moguce promeniti status dostavljaca");
      }
    });
  }

  onDeny(email:string){
    let delivery:Delivery = new Delivery();
    delivery.email = email;
    delivery.status = 2;
    this.service.changeDeliveryUser(delivery).subscribe({
      next: (data) => {
        this.toastr.success("Dostavljacev status je promenjen uspenso");
        this.ngOnInit();
      },
      error: (error) => {
        this.toastr.error(error.error, "Nije moguce promeniti status dostavljaca");
      }
    });
  }

  onSubmitAdd(){
    let newProduct:Product = new Product();
    newProduct.name = this.addNewProductForm.controls['Name'].value;
    newProduct.price = this.addNewProductForm.controls['Price'].value;
    newProduct.ingredients = this.addNewProductForm.controls['Ingredients'].value;

    this.service.addNewProduct(newProduct).subscribe({
      next: (data) => {
        this.toastr.success("Novi proizvod",(data.name) + " uspesno dodat");
        this.addNewProductForm.reset();
        this.ngOnInit();
      },
      error: (error) => {
        this.toastr.error("Neuspesno dodavanje novog proizvoda");
      }
    });
  }

}
