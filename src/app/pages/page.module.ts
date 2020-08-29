import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Layouts
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component'
import {MainLayoutComponent} from '../layouts/main-layout/main-layout.component';

import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from '../modules/material.module';
//components
import {HomeComponent} from './/home/home.component';
import { HeaderComponent } from '../nav/header/header.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
@NgModule({
  declarations: [MainLayoutComponent,HomeComponent,HeaderComponent,AdminLayoutComponent, AdminHomeComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    MaterialModule
  ]
})
export class PageModule { }
