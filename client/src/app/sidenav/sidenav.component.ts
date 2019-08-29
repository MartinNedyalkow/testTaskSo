import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { BookService } from '../core/services/book.service';
import { GenreService } from '../core/services/genre.service';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public model: any;
  books:any = [];
  genre
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
    
    ) { }

  private _opened: boolean = false;
 
  private _toggleSidebar() {  
    this._opened = !this._opened;
  }
  private _toggleOpened(): void {
    this._opened = !this._opened;
  }
  ngOnInit() {
    this.bookService.getAllBooks().subscribe(data=>{
      const names=data.map(x=>{return x.name})
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
}
