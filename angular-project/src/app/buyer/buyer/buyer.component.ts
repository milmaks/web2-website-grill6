import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsInOrder } from 'src/app/shared/models/order.model';
import { UserService } from 'src/app/shared/user.service';
import { NewOrder, ProductInNewOrder } from '../models/newOrder.model';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor(private userservice: UserService, private router: Router, private toastr: ToastrService) { }
  @Input() email = "";

  newOrderForm = new FormGroup({
    Address: new FormControl('', Validators.required),
    Comment: new FormControl('')
  });
  
  panelOpenState:boolean = false;
  hasActiveOrder:boolean = false;
  foodItems: ProductsInOrder[] = [];
  foodItemsAvailabe:boolean = false;


  ngOnInit(): void {
    
    // get all products for order
    if(!this.hasActiveOrder){
      this.userservice.getAllProducts().subscribe(
        (data) => {
          this.foodItemsAvailabe = true;
          for(let p of data){
            this.foodItems.push(new ProductsInOrder(p,0));
          }
        },
        (error) => {
          this.foodItemsAvailabe = false;
        }
      );
    }
  }

  get priceDisplayValue(){
    let price = 0;
    for(let p of this.foodItems){
      price += p.product.price * p.quantity;
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
        newOrder.productsInOrder.push(new ProductInNewOrder(0,p.product.id,p.quantity));
    }

    console.log(newOrder);
  }

}
