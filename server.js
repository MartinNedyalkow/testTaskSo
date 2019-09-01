const express = require('express');
const Mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const BodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

Mongoose.connect("mongodb+srv://MNED:MNED@testtaskso-pt65n.azure.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true })

const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
  
});
Mongoose.set('useFindAndModify', false);
const userSchema = new Mongoose.Schema({
  userName:String,
  email:String,
  password:String,
  favoriteBooks:Array,
  dateOfRegister: Date
})

const user = Mongoose.model('User', userSchema);

const bookSchema = new Mongoose.Schema({
  name: String,
  author: String,
  genre:String,
  summery:String,
  img:String,
  isBookmarked:Boolean,
  dateOfCreation:Date,
  dateOfLastUpdate:Date 
});

const book = Mongoose.model('Book', bookSchema);

const genreSchema = new Mongoose.Schema({
  name: String,
  dateOfCreation:Date,
  dateOfLastUpdate:Date 
});

const genre = Mongoose.model('Genre', genreSchema);

app.post("/newbook", async (request, response) => {
      const newBook = new book(request.body);
      const result = await newBook.save();
      response.send(result);
});
app.post("/newgenre", async (request, response) => {
  const newGenre = new genre(request.body);
  const result = await newGenre.save();
  response.send(result);
});
app.get("/api/book/:id", async (request, response) => {
      const result = await book.findById(request.params.id).exec();
      response.send(result);
});
app.get("/api/books", async (request, response) => {
      const result = await book.find().exec();
      response.send(result);
});
app.get("/api/genre/:id", async (request, response) => {
  const newGenre = await genre.findById(request.params.id).exec();
  const result = await book.find({genre:newGenre.name});
  response.send(result);
});
app.get("/api/genres", async (request, response) => {
  const result = await genre.find().exec();
  response.send(result);
});
app.post("/api/books/search", async (request, response) => {
  const result = await book.find({name:{ '$regex' : request.body.search, '$options' : 'i' }});
  response.send(result);
});
app.post("/api/genres/search", async (request, response) => {
  const result = await genre.find({name:{ '$regex' : request.body.search, '$options' : 'i' }});
  response.send(result);
  }
);

app.post("/newuser", async (request, response) => {
  const newUser = new user(request.body);
  const result = await newUser.save();
  response.send(result);
});

app.post("/user", async (request, response) => {
  const userToreturn=request.body.username
  const result = await user.findOne({userName:userToreturn})
  response.send(result);
  }
);
 
app.put("/user", async (request, response) => {
  const userToreturn=request.body.username
  const oldUser = await user.findOne({userName:userToreturn})
  oldUser.favoriteBooks=request.body.favoriteBooks
  const result = await user.findByIdAndUpdate(request.body._id,oldUser,{new: true})
  response.send(result);
  }
);

app.listen(port, () => console.log(`Listening on port ${port}`));
 