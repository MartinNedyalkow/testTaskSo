import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public constructor(private readonly http: HttpClient,
    private readonly storageService:StorageService,
    private readonly userService:UserService) {}

  public getAllBooks():Observable<any>{
    return this.http.get(`http://localhost:5000/api/books`)
  }

  public getBookById(id:string):Observable<any>{
    return this.http.get(`http://localhost:5000/api/book/${id}`)
  }

  public searchBook(title:any):Observable<any>{
    return this.http.post(`http://localhost:5000/api/books/search`,title)
  }

  public bookMarkBook(book){
    let findUserName=this.storageService.get('userName')
    const findUserId=this.storageService.get('userId')
    let user={username:findUserName}
        this.userService.checkUser(user).subscribe(data=>{
          const newFavoriteBooks=data.favoriteBooks
          const bookNames=newFavoriteBooks.map(x=>{return x.name})
          if(bookNames.includes(book.name)){return}
          newFavoriteBooks.push(book)
          const userToSet={
              _id: findUserId,
              username:findUserName,
              favoriteBooks: newFavoriteBooks
          }
          this.userService.updateUserBooks(userToSet).subscribe()
        })
}
}