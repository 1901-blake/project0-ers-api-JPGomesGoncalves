import express from 'express'
import bodyParser from 'body-parser';
import session from 'express-session';
import { userRouter } from './Routers/User.Router';
//Databasename/ hostname : password/ endpoint
const app = express();

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

app.use('/project0',userRouter);

app.listen(3000);
console.log('application started on port: 3000');