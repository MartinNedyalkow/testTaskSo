import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }


  public checkUser(user): Observable<any> {
    return this.http.post('http://localhost:5000/user', user)
}
  public updateUserBooks(user): Observable<any> {
    return this.http.put('http://localhost:5000/user', user)
}
 public registerUser(user):Observable<any> {
   console.log(user);
   
  return this.http.post('http://localhost:5000/newuser', user)
}

}
