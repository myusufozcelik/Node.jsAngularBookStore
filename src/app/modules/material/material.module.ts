import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule
  ], 
  // MatToolbarModule modulünü diğer sayfalarda kullanabilmesi için export etmemiz lazım
  // app.module içerisine yazsaydık gerek yoktu çünkü ana modulumüz orasıydı.
  exports:[MatToolbarModule]
})
export class MaterialModule { }
