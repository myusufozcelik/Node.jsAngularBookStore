import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Category } from '../models/category';
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl:string = `${environment.baseurl}/category`

  constructor(private httpClient:HttpClient) { }

addCategory(category:Category) {
  return this.httpClient.post<any>(this.apiUrl,category);
}

getCategories() { // subscribe olunca bir şeyleri düzenlemek için pipe kullanırız
  return this.httpClient.get<any>(this.apiUrl)
  .pipe(map(result=> result.data)) // gelen datada hem status bilgisi hem de data bilgisi gelir.
    // Burada status bilgisini alma, sadece data bilgisini al diyoruz.
}

}
 
