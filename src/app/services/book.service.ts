import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl:string = `${environment.baseurl}/category`
  constructor(private httpClient:HttpClient) { }

addBook(book:Book) {
  return this.httpClient.post<any>(this.apiUrl,book);
}

// resim kaydetmek için;

saveBookImage(image) {
  return this.httpClient.post<any>(`${this.apiUrl}/saveImage`,image)
}

}
