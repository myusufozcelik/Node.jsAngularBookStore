import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ], 
  // MatToolbarModule modulünü diğer sayfalarda kullanabilmesi için export etmemiz lazım
  // app.module içerisine yazsaydık gerek yoktu çünkü ana modulumüz orasıydı.
  // Kullanacak olan sayfaların import etmesi gerekli!!!
  exports:[MatToolbarModule,MatButtonModule,MatTabsModule,
    MatFormFieldModule,MatInputModule,MatTableModule]
})
export class MaterialModule { }
