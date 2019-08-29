import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public constructor(private readonly http: HttpClient) {}

  public getAllBooks():Observable<any>{
    return this.http.get(`http://localhost:5000/api/books`)
  }

  public getBookById(id:string):Observable<any>{
    return this.http.get(`http://localhost:5000/api/book/${id}`)
  }

  public searchBook(title:string):Observable<any>{
    return this.http.post(`http://localhost:5000/api/books/search`,title)
  }

}
