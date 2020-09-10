import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  book: Book = new Book();
  bookId:string;


  constructor(private bookService:BookService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getUrl();
  }

  getUrl() {
    this.bookId = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(this.bookId).subscribe(result=> {
      this.book = result;
    })
  }

}
