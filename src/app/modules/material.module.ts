import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule
  ], 
  // MatToolbarModule modulünü diğer sayfalarda kullanabilmesi için export etmemiz lazım
  // app.module içerisine yazsaydık gerek yoktu çünkü ana modulumüz orasıydı.
  // Kullanacak olan sayfaların import etmesi gerekli!!!
  exports:[MatToolbarModule,MatButtonModule,MatTabsModule]
})
export class MaterialModule { }
