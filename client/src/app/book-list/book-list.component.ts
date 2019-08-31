import { Component, OnInit, OnChanges, Input } from '@angular/core';
import {BookService} from '../core/services/book.service'
import { GenreService } from '../core/services/genre.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit,OnChanges {
  @Input()
public genre:any
 @Input()
 public bookFilter:any
public books = []
  
p: number = 1;

  
  constructor(
    private readonly bookService:BookService,
    private readonly genreService:GenreService 
    ) { }

  ngOnInit() {
    this.showBooks()
  }
  ngOnChanges(): void {
    this.filterGenres(this.genre)
  }

  public showBooks(){
    this.bookService.getAllBooks().subscribe(data=>{
      this.books=data
    })
  }

  
 public filterGenres(input){
   if(input===undefined){return}
    const genre={
      search:input
    }
    if(this.genre==="All"){
      this.showBooks()
      return
    }
    this.genreService.searchBooksByGenre(genre).subscribe(data=>{
      this.genreService.getBooksByGenreId(data[0]._id).subscribe(data=>{
        this.books=data
      })

    })
 }


}
