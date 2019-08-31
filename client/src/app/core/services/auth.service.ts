import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../core/services/storage.service';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';



@Injectable(
  {
    providedIn: 'root',
  }
)
export class AuthService {
  redirectUrl: string;
  isLoggedIn = false;

  public constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
    public jwtHelper: JwtHelperService,
    private router: Router,
   
  ) { }

 

  

  public login(user): Observable<any> {
    return this.http.post('http://localhost:5000/user', user).pipe(
      tap((res: any) => {
        this.isLoggedIn = true;
        this.storage.set('userId', res._id);
        this.storage.set('userName',res.userName)
      }
      )
      );
  }

  public logout(): void {
    this.storage.remove('userId');
    this.storage.remove('userName')
    this.router.navigate([]);
  }

  public isAuthenticated(): boolean {
    const user = this.storage.get('userId');
    if (!!user) {
      return true;
    }
    return false;
  }

}
