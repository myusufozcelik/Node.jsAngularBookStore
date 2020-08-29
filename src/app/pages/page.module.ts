import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Layouts
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component'
import {MainLayoutComponent} from '../layouts/main-layout/main-layout.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from '../modules/material.module';
//components
import {HomeComponent} from './/home/home.component';
import { HeaderComponent } from '../nav/header/header.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminCategoryNeweditComponent } from './admin-category-newedit/admin-category-newedit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCategoryListComponent } from './admin-category-list/admin-category-list.component';


@NgModule({
  declarations: [MainLayoutComponent,HomeComponent,HeaderComponent,AdminLayoutComponent, AdminHomeComponent,AdminCategoryNeweditComponent, AdminCategoryListComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PageModule { }
