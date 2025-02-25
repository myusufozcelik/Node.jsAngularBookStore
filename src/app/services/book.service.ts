import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl:string = `${environment.baseurl}/book`
  constructor(private httpClient:HttpClient) { }

getBooks() {
  return this.httpClient.get<any>(this.apiUrl)
  .pipe(map(result=>result.data)) //statusu alma sadece datayı al
  
}

getBookById(id:string) {
  return this.httpClient.get<any>(`${this.apiUrl}/${id}`)
  .pipe(map(result=>result.data))
}

getBooksByCategoryId(categoryId:string) {  // books old. için enviroment tarafından alıp books ile yazdık
  return this.httpClient.get<any>(`${environment.baseurl}/books/${categoryId}`)
  .pipe(map(result=>result.data)); // resultın sadece datasını al
}


addBook(book:Book) {
  return this.httpClient.post<any>(this.apiUrl,book);
}

updateBook(bookId:string, book:Book) {
  return this.httpClient.put<any>(`${this.apiUrl}/${bookId}`,book)
}

// resim kaydetmek için;

saveBookImage(image) {
  return this.httpClient.post<any>(`${this.apiUrl}/saveImage`,image)
}

deleteBook(bookId:string) {
  return this.httpClient.delete<any>(`${this.apiUrl}/${bookId}`)
}

}
