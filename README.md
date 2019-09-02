# Description

Company test task

- NodeJS / Express / Angular

- Server directory: the root of the project

- Client ( Angular ) directory: /client

-Screen Shots in root dir

# Installation

1. Global Installation of ```nodemon```:
```
npm i nodemon -g
```
2. Run ```npm install``` in root directory.
3. Run ```cd client & npm install``` - installing the react application dependencies.
4. Run ```cd ...``` - to go to the root folder again.
5. Run ```npm run dev```: This will start the server (running server.js with nodemon) & run the angular application from the client directory.

# More info

There is a proxy configuration in the client part, to map the http://localhost:5000 (Where the server API is running) to http://localhost:4200 (Where the client front end is running): ```"proxy": "http://localhost:5000/",```.

The server is running on nodeJS / Express

# Database
Mongodb Atlas + Mongoose ODM

Add your account in server.js Mongoose.connect(string)

You can use the Postman Collection in the root folder to populate your DB.

# API Endpoints

For Books:

POST: "/newbook" = Will create new book object in DB (Use Postman (or any other))

body:{

  name: String,

  author: String,

  genre:String,

  summery:String,

  img:String,

  isBookmarked:Boolean,

  dateOfCreation:Date,

  dateOfLastUpdate:Date 

} 

GET: "/api/book/:id" = Will return book by ID

GET: "/api/books" = Will return all books

POST: "/api/books/search" = Book search

body: {
  search:String
}

For Genres:

POST: "/newgenre" = Will create new genre object in DB (Use Postman (or any other))

body:{

  name: String,

  dateOfCreation:Date,

  dateOfLastUpdate:Date 

}

GET: "/api/genre/:id" = Will return genre by ID

GET:  "/api/genres" = Will return all genres

POST: "/api/genres/search" = Genre search

body:
{
  search:String
}

For Users:

POST: "/newuser" = Will create New user in the DB

body:{

userName:String,

  email:String,

  password:String,

  favoriteBooks:Array,

  dateOfRegister: Date

}

POST: "/user" = Will return User by username

body:{
  userName:String
}

PUT:"/user" = Will update User

body:
{

_id: String,

  username:String,

  favoriteBooks: Array

}
