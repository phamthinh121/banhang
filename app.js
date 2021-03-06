const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

//passport config
require('./config/passport')(passport)
 
app.engine('ejs', require('ejs-locals'));
//dbconfig
const db= require('./config/key').MongoURI;
//connect to mongo
mongoose.connect(db,{useNewUrlParser:true })
.then(()=>console.log('mongodb connected'))
.catch(err=>console.log(err));
//ejs
app.use(expressLayouts);
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
// app.use("/images",express.static(__dirname + "/images"));
app.use("/public",express.static(__dirname + "/public"));
app.use("/images",express.static(__dirname + "/images"));

//bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cookieParser('phamphuocthinh'));
//express-session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  //connect flash
  app.use(flash());
  // global variable

    app.use(function(req, res, next) {
        res.locals.suc_message = req.flash('suc_message');
        res.locals.error_message = req.flash('error_message');
        res.locals.error = req.flash('error');
      next();

  })
//routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/', taskRouter);




const PORT = process.env.PORT || 3000
//


app.listen(PORT,console.log(`server started on port ${PORT}`));