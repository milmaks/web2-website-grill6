import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order, ProductsInOrder } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';
import { UserService } from 'src/app/shared/user.service';
import { DeliveryService } from '../delivery.service';
import { Delivery } from '../models/delivery.model';
import { OrderConfirmation } from '../models/orderconfirmation.model';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  constructor(private userservice: UserService, private service: DeliveryService, private router: Router, private toastr: ToastrService, private datepipe:DatePipe) { }
  @Input() email = "";

  panelOpenState:boolean = false;
  panelOpenState1:boolean = false;
  status:string = "";
  hasActiveOrder:boolean = false;
  activeOrder:Order = new Order();
  foodItems: ProductsInOrder[] = [];
  foodItemsMap: Map<number,Product> = new Map<number,Product>(); 
  foodItemsAvailabe:boolean = false;
  orderMess:string = "";
  unconfirmedOrders: Order[] = [];
  hasUnconfirmedOrders:boolean = false;
  timerMin:string = "0";
  timerSec:string = "0";
  previousOrders: Order[] = [];

  ngOnInit(): void {
    this.foodItems = [];
    this.foodItemsMap = new Map<number,Product>(); 

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
          //ucitavanje neaktivnih porudzbina
          this.checkForUnconfirmedOrders();
        }
        else{
          this.activeOrder = data;
          this.hasActiveOrder = true;
          //this.activeOrder.orderTime = new Date(data.orderTime).toLocaleDateString('en-GB') + " " + new Date(data.orderTime).toLocaleTimeString();
          //if(this.activeOrder.deliveryEmail)
          //this.activeOrder.deliveryTime = new Date(data.deliveryTime).toLocaleDateString('en-GB') + " " + new Date(data.deliveryTime).toLocaleTimeString();
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

    this.getPreviousOrders();
    this.timerTick();
  }

  getPreviousOrders(){
    //get previous orders
    this.service.getPreviousOrders().subscribe(
      (data : Order[]) => {
        this.previousOrders = data;
      },
      error => {
        this.toastr.error(error.error, 'Getting informations failed.');
      }
    );
  }

  checkForUnconfirmedOrders(){
    this.service.getUnconfirmedOrders().subscribe(
      (data) => {
        this.unconfirmedOrders = data;
        if(this.unconfirmedOrders.length == 0){
          this.hasUnconfirmedOrders = false;
        }
        else{
          this.hasUnconfirmedOrders = true;
          this.unconfirmedOrders.forEach(element => {
            //element.orderTime = new Date(element.orderTime).toLocaleDateString('en-GB') + " " + new Date(element.orderTime).toLocaleTimeString();
          });
        }
      },
      (error) => {
        this.toastr.error(error.error, 'Greska pri ucitavanju nepotvrdjenih narudzbina');
      }
    );
  }

  takeOrder(id:number){
    let confirmation = new OrderConfirmation();
    confirmation.id = id;
    confirmation.email = this.email;
    this.service.confirmOrder(confirmation).subscribe(
      (data) => {
        if(data === null){
          this.toastr.error('Narudzbina nije vise dostupna pokusajte neku drugu');
          this.ngOnInit();
        }
        else{
          this.toastr.success('Narudzbina uspesno prihvacena');
          this.activeOrder = data;
          this.hasActiveOrder = true;
          this.timerTick();
          //this.activeOrder.orderTime = new Date(data.orderTime).toLocaleDateString('en-GB') + " " + new Date(data.orderTime).toLocaleTimeString();
          //this.activeOrder.deliveryTime = new Date(data.deliveryTime).toLocaleDateString('en-GB') + " " + new Date(data.deliveryTime).toLocaleTimeString();
        }
      },
      (error) => {
        this.toastr.error('Greska pri prihvatanju narudzbine');
      }
    );
  }

  interval:any = null;

  async timerTick(){
    if(this.interval === null){
      this.interval = setInterval(() => {
        if(this.hasActiveOrder){
          let now = new Date();
          let before = this.activeOrder.deliveryTime;
          this.datepipe.transform(now);

          if(now.getTime() > new Date(before).getTime())
            this.stopTimer();

          let timeSec = (new Date(before).getTime() - now.getTime())  / 1000;
          var timerMin = Math.floor(timeSec / 60);
          var timerSec = Math.floor(timeSec - timerMin * 60);
          if(timerMin >= 10)
            this.timerMin = timerMin.toString();
          else
            this.timerMin = "0" + timerMin.toString();
          if(timerSec >= 10)
            this.timerSec = timerSec.toString();
          else
            this.timerSec = "0" + timerSec.toString();
        }
        else{
          this.stopTimer();
        }
      },1000)
    }
  }

  stopTimer(){
    clearInterval(this.interval);
    this.interval = null;
    this.hasActiveOrder = false;
    this.activeOrder = new Order();
    this.checkForUnconfirmedOrders();
  }

}
