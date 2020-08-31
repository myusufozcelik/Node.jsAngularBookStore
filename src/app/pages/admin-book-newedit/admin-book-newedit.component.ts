import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service'
import { CategoryService } from 'src/app/services/category.service';
import { Book } from 'src/app/models/book';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { iif } from 'rxjs';
import { map,mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-admin-book-newedit',
  templateUrl: './admin-book-newedit.component.html',
  styleUrls: ['./admin-book-newedit.component.scss']
})
export class AdminBookNeweditComponent implements OnInit {

// resmi tutmak için 
formData: FormData = null;
bookId: string;
book:Book;
bookForm: FormGroup;
title:string;
btnText:string;
type:string;
categories:Category[];

  constructor(private router:Router,private categoryService:CategoryService,
    private route:ActivatedRoute,private bookService:BookService) { }

   
  ngOnInit(): void {
    this.getCategory();
    this.getBookId();
    this.bookFormGroup();
     
  }

  upload(files) { 
    // eklenen dosyalardan 1. al
    
      let fileData = files.target.files[0]
      this.formData = new FormData();
      this.formData.append("picture",fileData) // picture keywordu ile ekleriz. 
      // node.js tarafında saveImage kısmında picture keyine sahip bir keyword bekliyordu bizde picture yazdık
      console.log(fileData)
  }
  

  getCategory() {
    this.categoryService.getCategories().subscribe(data=> {
      this.categories = data
    })
  }

  bookFormGroup() {
    this.bookForm = new FormGroup({
      title: new FormControl("",Validators.required),
      author: new FormControl("",Validators.required),
      price: new FormControl("",Validators.required),
      stock: new FormControl("",Validators.required),
       picture: new FormControl(""),
      categoryBy: new FormControl("")
    })
  }

  getBookId() {
    this.bookId = this.route.snapshot.paramMap.get("id")
    if(this.bookId == null) {
      this.title = "Add Books"
      this.btnText = "Add";
      this.type = "add";
    }
    else {
      // update kısmı

      this.title = "Book Update"
      this.btnText = "Update"
      this.type = "update"

      this.bookService.getBookById(this.bookId).subscribe(result=> {
        this.book = result;
        // Kitap bilgilerini servisten alıp title kısmına yazdırdık
        this.bookForm.controls.title.setValue(this.book.title)
        this.bookForm.controls.author.setValue(this.book.author)
        this.bookForm.controls.price.setValue(this.book.price)
        this.bookForm.controls.stock.setValue(this.book.stock)
        this.bookForm.controls.picture.setValue(this.book.picture)
        this.bookForm.controls.categoryBy.setValue(this.book.categoryBy);

      })

    }
  }

  onSubmit() {
    if(this.bookForm.valid) {
      if(this.type =="add") {
        
          this.bookService.saveBookImage(this.formData)
          .pipe(map(result=>{
            // picture kısmını yakalayıp dolduralım  
            this.bookForm.controls.picture.setValue(result.url)
           
          }),
          
          mergeMap(()=>this.bookService.addBook(this.bookForm.value)))
          .subscribe(result=> {
            this.router.navigateByUrl("/admin");
          })
          
      }
      else {
        // update

        // choose file seçilmişse ya da seçilmemişse diye iki durum ele alalım
        if(this.formData==null) {
          // resim seçmemişse
          this.bookService.updateBook(this.book._id,this.bookForm.value) // book._id ngOnInıt'den geliyor
          .subscribe(result=> this.router.navigateByUrl("/admin"))
        }

        else {
          // /kitap seçilmişse

          this.bookService.saveBookImage(this.formData)
          .pipe(map(result=>{
            // picture kısmını yakalayıp dolduralım  
            this.bookForm.controls.picture.setValue(result.url)
           
          }),
          
          mergeMap(()=>
          this.bookService.updateBook(this.book._id,this.bookForm.value)))
          .subscribe(result=> {
            this.router.navigateByUrl("/admin");
          })

        }

      }
    }
  }

  displayCategoryName(category) {

    
    // kategorileri almak için;
    if(category) {
      return category.name
    } 
    // yoksa
    return null;
  }



}
