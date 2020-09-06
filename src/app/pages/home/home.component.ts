import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books:Book[]

  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.getBooks()
  }

  getBooks() {
    this.bookService.getBooks().subscribe(result => {
      this.books = result;
    })
  }

}
