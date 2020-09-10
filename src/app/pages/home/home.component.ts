import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books:Book[]
  categoryId:string;

  constructor(private bookService:BookService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getUrl();
  }

  getUrl() {
    this.route.paramMap.subscribe(params=> {
      this.categoryId = params.get('id')
      if(this.categoryId) {
        this.bookService.getBooksByCategoryId(this.categoryId)
        .subscribe(result=> {
          this.books = result
        })
      }
      else 
       this.getBooks();
    })
  }

  getBooks() {
    this.bookService.getBooks().subscribe(result => {
      this.books = result;
    })
  }

}
