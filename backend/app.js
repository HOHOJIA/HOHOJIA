// load required package
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
// import env file
const dotenv = require('dotenv');
dotenv.config();

// our handmade routers <3
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let likeRouter = require('./routes/like');
let commentRouter = require('./routes/comment');

// default port 3000 (settting in bin folder)
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mysql connection info (git ignore env folder)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// connect to mysql db
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/like', likeRouter(connection));
app.use('/comment', commentRouter(connection));

module.exports = app;
