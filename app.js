const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//Routes
const coursesRoutes = require('./routes/courses');
const categoriesRoutes = require('./routes/categories');
const usersRoutes = require('./routes/users');
const questionRoutes = require('./routes/questions');

const api = process.env.API_URL;

app.use(`${api}/courses`, coursesRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/questions`, questionRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Course-App-database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
//app.listen(3000, ()=>{

 //   console.log('server is running http://localhost:3000');
//})


//production


var server = app.listen(process.env.PORT || 3000 , function (){
    var port = server.address().port;
   console.log("Express is working on port" + port)
})