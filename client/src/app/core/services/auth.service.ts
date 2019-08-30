import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from '../../models/user-register';
import { UserLogin } from '../../models/user-login';
import { StorageService } from '../../core/services/storage.service';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
//import { JWTService } from './jwt.service';



@Injectable(
  {
    providedIn: 'root',
  }
)
export class AuthService {
  private readonly userSubject$ = new BehaviorSubject<string | null>(this.username);
  redirectUrl: string;
  isLoggedIn = false;

  public constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
    public jwtHelper: JwtHelperService,
    private router: Router,
    //private readonly jwtService: JWTService,
  ) { }

  public get user$() {
    return this.userSubject$.asObservable();
  }

  private get username(): string | null {
    const token = this.storage.get('token');
    const username = this.storage.get('username') || '';
    if (token) {
      return username;
    }
    
    return null;
  }

  public register(user: UserRegister): Observable<any> {
    return this.http.post('http://localhost:3000/users', user);
  }

  public login(user: UserLogin): Observable<any> {

    return this.http.post('http://localhost:5000/user', user).pipe(
      tap((res: any) => {
        this.isLoggedIn = true;
        console.log(res);
        
        this.storage.set('userId', res._id);
        // this.setUserId();
        // this.isLoggedIn = true;
        // if (this.redirectUrl) {
        //   this.router.navigate([`/posts`]);
        //   this.redirectUrl = null;
        // }
      }
      ));
  }

  public logout(): void {
    this.storage.remove('token');
    this.storage.remove('username');
    this.storage.remove('userId');
    this.storage.remove('adminStatus');
    this.userSubject$.next(null);
    this.isLoggedIn = false;
    this.router.navigate([`/login`]);
  }

  public reverseToken(): any {
    const token = this.storage.get('token');
    if (!!token) {
      //const decoded = this.jwtService.JWTDecoder(token);
      //return decoded;
    }
    return '';
  }

  public setUserId(): void {
    const token = this.reverseToken();
    this.storage.set('userId', token.id);
  }

  public isAuthenticated(): boolean {
    const user = this.storage.get('userId');
    if (!!user) {
      return true;
    }
    return false;
  }

}
