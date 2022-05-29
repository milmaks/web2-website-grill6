import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order, ProductsInOrder } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';
import { UserService } from 'src/app/shared/user.service';
import { DeliveryService } from '../delivery.service';
import { Delivery } from '../models/delivery.model';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  constructor(private userservice: UserService, private service: DeliveryService, private router: Router, private toastr: ToastrService) { }

  panelOpenState:boolean = false;
  status:string = "";
  hasActiveOrder:boolean = false;
  activeOrder:Order = new Order();
  foodItems: ProductsInOrder[] = [];
  foodItemsMap: Map<number,Product> = new Map<number,Product>(); 
  foodItemsAvailabe:boolean = false;
  orderMess:string = "";

  ngOnInit(): void {
    this.service.getDeliveryInfo().subscribe(
      (data : Delivery) => {
        if(data.status == 0)
          this.status = "Na cekanju";
        if(data.status == 1)
          this.status = "Prihvacen";
        if(data.status == 2)
          this.status = "Odbijen";
      },
      error => {
        this.toastr.error(error.error, 'Getting informations failed.');
    });

    // get all products for order
    this.userservice.getAllProducts().subscribe(
      (data) => {
        this.foodItemsAvailabe = true;
        for(let p of data){
          this.foodItems.push(new ProductsInOrder(p.id,0));
          this.foodItemsMap.set(p.id,p);
        }
      },
      (error) => {
        this.foodItemsAvailabe = false;
      }
    );

    //check for active order
    this.service.getActiveOrder().subscribe(
      (data) => {
        if(data === null)
        {
          this.activeOrder = new Order();
          this.hasActiveOrder = false;
        }
        else{
          this.activeOrder = data;
          this.hasActiveOrder = true;
          this.activeOrder.orderTime = new Date(data.orderTime).toLocaleDateString('en-GB') + " " + new Date(data.orderTime).toLocaleTimeString();
          if(this.activeOrder.deliveryEmail)
          this.activeOrder.deliveryTime = new Date(data.deliveryTime).toLocaleDateString('en-GB') + " " + new Date(data.deliveryTime).toLocaleTimeString();
        }
      },
      (error) => {
        this.toastr.error(error.error, 'Greska pri ucitavanju aktivne narudzbine');
      }
    );
    
    if(this.hasActiveOrder)
      this.orderMess = "Stanje aktivne porudzbine";
    else
      this.orderMess = "Dostupne porudzbine";

  }

}
