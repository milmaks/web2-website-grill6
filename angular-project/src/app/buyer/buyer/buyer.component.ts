import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order, ProductsInOrder } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';
import { UserService } from 'src/app/shared/user.service';
import { BuyerService } from '../buyer.service';
import { NewOrder, ProductInNewOrder } from '../models/newOrder.model';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor(private userservice: UserService, private service:BuyerService, private router: Router, private toastr: ToastrService) { }
  @Input() email = "";

  newOrderForm = new FormGroup({
    Address: new FormControl('', Validators.required),
    Comment: new FormControl('')
  });
  
  panelOpenState:boolean = false;
  hasActiveOrder:boolean = false;
  foodItems: ProductsInOrder[] = [];
  foodItemsMap: Map<number,Product> = new Map<number,Product>(); 
  foodItemsAvailabe:boolean = false;
  activeOrder:Order = new Order();
  orderMessage:string = '';

  ngOnInit(): void {
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
          this.orderMessage = "Nova";
        }
        else{
          this.activeOrder = data;
          this.hasActiveOrder = true;
          this.orderMessage = "Trenutna";
          this.activeOrder.orderTime = new Date(data.orderTime).toLocaleDateString('en-GB') + " " + new Date(data.orderTime).toLocaleTimeString();
          if(this.activeOrder.deliveryEmail)
          this.activeOrder.deliveryTime = new Date(data.deliveryTime).toLocaleDateString('en-GB') + " " + new Date(data.deliveryTime).toLocaleTimeString();
        }
      },
      (error) => {
        this.toastr.error(error.error, 'Greska pri ucitavanju narudzbina');
      }
    );
  }

  get priceDisplayValue(){
    let price = 0;
    for(let p of this.foodItems){
      price += this.foodItemsMap.get(p.productId)!.price * p.quantity;
    }

    if(price > 0)
      price += 200;

    return price;
  }

  onOrder(){
    if(this.newOrderForm.invalid){
      this.toastr.error('Popuni sva polja', 'Narucivanje nije uspesno.');
      return;
    }

    let newOrder:NewOrder = new NewOrder();
    newOrder.buyerEmail = this.email;
    newOrder.address = this.newOrderForm.controls['Address'].value;
    newOrder.comment = this.newOrderForm.controls['Comment'].value;
    for(let p of this.foodItems){
      if(p.quantity > 0)
        newOrder.productsInOrder.push(new ProductInNewOrder(0,p.productId,p.quantity));
    }

    this.service.placeNewOrder(newOrder).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        this.toastr.error(error.error, 'Greska pri narucivanju');
      }
    );
  }

}
