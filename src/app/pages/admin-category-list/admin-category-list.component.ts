import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.scss']
})
export class AdminCategoryListComponent implements OnInit {

  categories:Category[];
  datasource
  displayedColumns: string[] = ["no","name","action"]
  // Angular Material da böyle yaptığı için yaptık
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(result=> {
      this.categories = result;
      this.categories.forEach((categoory,index) => {
        this.categories[index]["no"]= index+1 // categorinin index no parametresine index+1 ekle.
      });
      this.datasource = new MatTableDataSource<Category>(this.categories);
      this.datasource.paginator = this.paginator;
    });
  }

  delete(categoryId:string) {
      this.categoryService.deleteCategory(categoryId)
      .subscribe(result=> { //  tabloda veri gelen kısmı yani datasource update etmemiz lazım
        // categories dizininde verimiz zaten bulunuyor oradan silersek tablodan silinir
       
        if(result.status =="success") {

        let category = this.categories.filter(x=>x._id == categoryId)[0];

        let index = this.categories.indexOf(category); 

        this.categories.splice(index,1); // indexten itibaren 1 tane sil
        // tabloyu güncelledik
        this.datasource = new MatTableDataSource<Category>(this.categories)
        }
        else {
          alert("Silme işlemi sırasında bir hata meydana geldi.")
        }
      })
  }

}
