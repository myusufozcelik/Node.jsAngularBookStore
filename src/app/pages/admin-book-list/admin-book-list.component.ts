import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.scss']
})
export class AdminBookListComponent implements OnInit {

  books:Book[];
  datasource;
  displayedColumns: string[] = ["no","picture","title","author","price","stock","categoryName","action"]

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  MatPaginator;

  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook() {
    this.bookService.getBooks().subscribe(result=> {
      this.books = result
      this.books.forEach((book,index)=> {
        this.books[index]["no"] = index+1
        // books dizisinde no property diye alan oluşturduk onada index+1 değerini atadık 
      })

      this.datasource = new MatTableDataSource<Book>(this.books)
      this.datasource.paginator = this.paginator;
    })
  }

  delete(bookId:string) {
    this.bookService.deleteBook(bookId).subscribe(result=> {
      
      if(result.status=="success") {
        let book = this.books.filter(x=> x._id==bookId)[0] // birden fazla gelebilir. O yüzden 0. indextekini alırız
        
        let index = this.books.indexOf(book);
        
        this.books.splice(index,1)
        // datayı sildik şimdi datasource yi güncellememiz lazım.(tabloya veri datasourceden gidiyor)
        this.datasource = new MatTableDataSource<Book>(this.books);

      }

      else {
          alert("An error occurred during the deletion") 
      }

    })
  }


}
