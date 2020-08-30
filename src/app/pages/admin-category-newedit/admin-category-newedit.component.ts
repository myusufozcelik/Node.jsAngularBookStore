import { Component, OnInit } from '@angular/core';
import {CategoryService} from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-category-newedit',
  templateUrl: './admin-category-newedit.component.html',
  styleUrls: ['./admin-category-newedit.component.scss']
})
export class AdminCategoryNeweditComponent implements OnInit {


  categoryId:string;
  category:Category;
  categoryForm:FormGroup;
  title:string;
  btnText:string;
  type:string;

  constructor(private categoryService:CategoryService,
    private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategoryId() 
    
  }

getCategoryId() {
  this.categoryId = this.route.snapshot.paramMap.get('id')
  if(this.categoryId == null) { // Ekleme işlemi için
    this.title = "Kategori Ekle";
    this.btnText = "Ekle";
    this.type = "add";
  }
  else { // update işlemi için
    this.title = "Category Update"
    this.btnText = "Update"
    this.type = "update"
    this.categoryService.getCategoryById(this.categoryId)
    .subscribe(result=> {
      this.category = result

      // Update işleminde tıklanılan kategori ismi yazılı gelsin
      this.categoryForm.controls.name.setValue(this.category.name)
    })
  }
  this.categoryForm = new FormGroup({
    name: new FormControl("",Validators.required)
  })

}

onSubmit() {
  if(this.categoryForm.valid) {
    // categoryForm geçerli ise
    //ekleme mi güncelleme mi ? onu kontrol edelim
    if(this.type == "add") {
      this.categoryService.addCategory(this.categoryForm.value).subscribe(result=> {
        // Sonuç başarılı ise admin sayfasına dön
        this.router.navigateByUrl("/admin")   
      })
      // FormGrouptan tanımlanan yukarıdaki categoryFormu gidip json tipine değiştirip name alanını getirir
    }
    else if(this.type =="update") {
      // update için submit işlemi;
      this.categoryService.updateCategory(this.categoryId,this.categoryForm.value) 
     .subscribe(result => {
       this.router.navigateByUrl("/admin")
     })
    }
  }
}
  
}
