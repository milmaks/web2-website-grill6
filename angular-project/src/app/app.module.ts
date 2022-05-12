import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserService } from './shared/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BuyerComponent } from './buyer/buyer/buyer.component';
import { AdministratorComponent } from './administrator/administrator/administrator.component';
import { DeliveryComponent } from './delivery/delivery/delivery.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    RegisterComponent,
    DashboardComponent,
    BuyerComponent,
    AdministratorComponent,
    DeliveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
