import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GenreService {

  public constructor(private readonly http: HttpClient) {}

  public getAllGenres():Observable<any>{
    return this.http.get(`http://localhost:5000/api/genres`)
  }

  public getBooksByGenreId(genreId:string):Observable<any>{
    return this.http.get(`http://localhost:5000/api/genre/${genreId}`)
  }

  public searchBooksByGenre(genre:any):Observable<any>{
    return this.http.post(`http://localhost:5000/api/genres/search`,genre)
  }
}
