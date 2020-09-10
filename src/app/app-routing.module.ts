import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminCategoryNeweditComponent } from './pages/admin-category-newedit/admin-category-newedit.component';
import { AdminBookNeweditComponent } from './pages/admin-book-newedit/admin-book-newedit.component';
import { BooksComponent } from './pages/books/books.component';


const routes: Routes = [
 
  {
    path:"", component:MainLayoutComponent, children: [{path:"",component:HomeComponent}, {path:"category/:id", component:HomeComponent},
  {path:"book/:id",component:BooksComponent}]
  },

  {
    path:"admin", component:AdminLayoutComponent, children: [{
      path:"",component:AdminHomeComponent},
      {
      path:"category", component:AdminCategoryNeweditComponent
    },
    {
      path:"category/:id", component:AdminCategoryNeweditComponent
    },
    {
      path:"book", component:AdminBookNeweditComponent
    },
    {
      path:"book/:id", component:AdminBookNeweditComponent
    }
  ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
