import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeliveryService } from '../delivery.service';
import { Delivery } from '../models/delivery.model';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  constructor(private service: DeliveryService, private router: Router, private toastr: ToastrService) { }

  status:string = "";

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
  }

}
