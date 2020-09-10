import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCardModule,
    MatListModule
  ], 
  // MatToolbarModule modulünü diğer sayfalarda kullanabilmesi için export etmemiz lazım
  // app.module içerisine yazsaydık gerek yoktu çünkü ana modulumüz orasıydı.
  // Kullanacak olan sayfaların import etmesi gerekli!!!
  exports:[MatToolbarModule,MatButtonModule,MatTabsModule,MatIconModule,
    MatFormFieldModule,MatInputModule,MatTableModule,MatPaginatorModule,
    MatAutocompleteModule, MatCardModule, MatListModule] 
})
export class MaterialModule { }
