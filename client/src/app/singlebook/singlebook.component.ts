import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2'
import { Book } from '../models/book';
import { AuthService } from '../core/services/auth.service';
import { BookService } from '../core/services/book.service';
@Component({
  selector: 'app-singlebook',
  templateUrl: './singlebook.component.html',
  styleUrls: ['./singlebook.component.css']
})
export class SinglebookComponent implements OnInit {
  @Input()
  book:Book
  
  constructor(private readonly authService:AuthService,
    private readonly bookService:BookService) { }

  ngOnInit() {

  }
  public bookDetailes(){
    if(!!this.authService.isAuthenticated()){
      Swal.fire({
        imageUrl: this.book.img,
        imageWidth: 220,
    imageHeight: 400,
    imageAlt: 'Custom image',
        title: `${this.book.name}<br> by ${this.book.author}`,
        html:`<p style="text-align: left">${this.book.summery}...</p>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Bookmark!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
      }).then((result) => {
        if (result.value) {
          this.bookService.bookMarkBook(this.book)
        }
        } )
      }else{Swal.fire({
      position: 'center',
      type: 'error',
      title: 'Please Login',
      showConfirmButton: false,
      timer: 1000})}
    
  }
  


}
