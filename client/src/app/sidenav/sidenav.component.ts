import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { BookService } from '../core/services/book.service';
import { GenreService } from '../core/services/genre.service';
import Swal from 'sweetalert2';
import { Book } from '../models/book';
import { Genre } from '../models/genre';
import { AuthService } from '../core/services/auth.service';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public model: any;
  books = [];
  fullBooks:any
  genre:Genre[]
  allGenres:any = ["All"];
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.books.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  constructor(
    private readonly bookService:BookService,
    private readonly genreService:GenreService,
    private readonly authService:AuthService
    
    ) { }

  private _opened: boolean = false;
 
  private _toggleSidebar() {
    if(!!this.authService.isAuthenticated()){
      this._opened = !this._opened;
    }else{
      Swal.fire({
        type: 'error',
        title: 'Please Login',
      })
    }
  }
  private _toggleOpened(): void {
    this._opened = !this._opened;
  }
  ngOnInit() {
    this.bookService.getAllBooks().subscribe(data=>{ 
      const names=data.map(x=>{return x.name})
      this.fullBooks=data
      this.books=names
    })
    this.genreService.getAllGenres().subscribe(data=>{
      const genre=data.map(x=>{return x.name})
      const genres=["All"]
      this.allGenres= genres.concat(genre)
      
    })}

    public selectedGenre(value){
      this.genre=value
    }
    public selectItem(event){
      const book=this.fullBooks.filter(x=>{return x.name===event.item})
      Swal.fire({
        imageUrl: book[0].img,
        imageWidth: 220,
        imageHeight: 400,
        imageAlt: 'Custom image',
        title: `${book[0].name}<br> by ${book[0].author}`,
        html:`<p>${book[0].summery}...</p>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
      })
      
      
    }
}
