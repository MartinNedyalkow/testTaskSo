import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'ng-sidebar'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component'; 
import { FormsModule } from '@angular/forms';
import { BookListComponent } from './book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SinglebookComponent } from './singlebook/singlebook.component'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import {NgxPaginationModule} from 'ngx-pagination';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BookListComponent,
    SinglebookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    })
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
