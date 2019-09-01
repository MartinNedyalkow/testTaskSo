import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { BookService } from '../core/services/book.service';
import { GenreService } from '../core/services/genre.service';
import Swal from 'sweetalert2';
import { Genre } from '../models/genre';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { StorageService } from '../core/services/storage.service';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public model: any;
  books = [];
  favoriteBooks
  fullBooks:any 
  genre:Genre[]
  user 
  allGenres:any = ["All"];
  loggedIn=this.authService.isAuthenticated()
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
    private readonly authService:AuthService,
    private readonly userService:UserService,
    private readonly storageService:StorageService
    ) { }

  private _opened: boolean = false;
 
  private _toggleSidebar() {
    if(!!this.authService.isAuthenticated()){
      this.user=this.storageService.get('userName')
      this._opened = !this._opened;
      this.myBookmarcs()
    }else{
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Please Login',
        showConfirmButton: false,
        timer: 1000})
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
    })
    this.user=this.storageService.get('userName')
  }


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
          '<i class="fa fa-thumbs-up"></i> Bookmark!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
      }).then((result) => {
        if (result.value) {
          this.bookService.bookMarkBook(book[0])
        }
        } )
      
    }

    public login(){
      Swal.fire({
        title: 'Login',
        html: '<input type="text" id="username" class="swal2-input" placeholder="Enter your username"></input>' +
          '<input type="password" id="password" class="swal2-input" placeholder="Enter your password"></input>',
        confirmButtonText: 'Login',
        preConfirm: () => {
          let username= (Swal.getPopup().querySelector('#username') as HTMLInputElement).value
          let password = (Swal.getPopup().querySelector('#password') as HTMLInputElement).value
          
          if (username === '' || password === '') {
            Swal.showValidationMessage(`Username/Password empty`)
            return
          }
          const user = { username:username };
          this.userService.checkUser(user).subscribe(data=>{
           if(data===null){
            Swal.fire({
              type: 'error',
              title: 'Wrong username or password',
            })
           }
             if(data.userName===username && data.password===password){
              this.authService.login(user).subscribe(data=>{
                
              })
              this.loggedIn=true
              this.user=this.storageService.get('userName')
              return Swal.fire({
                position: 'center',
                type: 'success',
                title: 'You are logged in',
                showConfirmButton: false,
                timer: 1500
              })
              
            }else{
                Swal.fire({
                type: 'error',
                title: 'Wrong username or password',
              })}
          })
          
        }
      })
    }
    public logout(){
      this.authService.logout()
      this.loggedIn=false
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'You are logged out',
        showConfirmButton: false,
        timer: 1500
      })
    }

    public myBookmarcs(){
      let user={username:this.user}
      this.userService.checkUser(user).subscribe(data=>{
        this.favoriteBooks=data.favoriteBooks
      })
    }

    public removeFromBookmarks(value){
      const newArr=this.favoriteBooks.filter(x=>{return x.name != value})
      this.favoriteBooks=newArr
      const findUserId=this.storageService.get('userId')
      let findUserName=this.storageService.get('userName')
      const userToSet={
        _id: findUserId,
        username:findUserName,
        favoriteBooks: newArr
    }
    this.userService.updateUserBooks(userToSet).subscribe()
    }
    public register(){
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          title: 'Enter Username',
          inputValidator: (value) => {
            return !value && 'You need to write something!'
          }
        },{
          title: 'Enter Email',
          inputValidator: (value) => {
            return !value && 'You need to write something!'
          }
        }
        ,
        {
          title: 'Enter Password',
          input: 'password',
          inputValidator: (value) => {return new Promise((resolve) => {
            const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            if (value.match(passw)) {
              resolve()
            } else {
              resolve('6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')
            }
          })
        }}
      ]).then((result) => {
        if (result.value) {
          const newUser={
            userName:result.value[0],
            email:result.value[1],
            password:result.value[2],
            favoriteBooks:[],
            dateOfRegister: new Date()
          }
          this.userService.registerUser(newUser).subscribe()
          
        }
        this.login()
      })
    }
}
