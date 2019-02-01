import express from 'express'
import bodyParser from 'body-parser';
import session from 'express-session';
import { userRouter } from './Main/Routers/User.Router';
import { UserDao } from './Main/Dao/UserDoa';
import { RoleDoa } from './Main/Dao/RoleDoa';
//Databasename/ hostname : password/ endpoint
const app = express();
export let userdoa = new UserDao();
export let roledoa = new RoleDoa();

app.use(bodyParser.json());


// // create logging middleware
// app.use((req, res, next) => {
//     console.log(`request was made with url: ${req.path}
//     and method: ${req.method}`);
//     next(); // will past the request on to the search for the next piece for the next piece of(pass on to the next middleware)
// });
const sess = {
    secret: 'project0',
    cookie: {secure: false},
    resave: false,
    saveUnitialized: false
};
// req,session is a object we cans store any data we want
app.use(session(sess));

// allow cross origins
app.use((req, resp, next) => {
    (process.env.MOVIE_API_STAGE === 'prod')
      ? resp.header('Access-Control-Allow-Origin', process.env.DEMO_APP_URL)
      : resp.header('Access-Control-Allow-Origin', `http://localhost:5500`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    next();
   });
   
app.use('/project0',userRouter);

app.listen(3000);
console.log('application started on port: 3000');