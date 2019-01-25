import express from 'express';
import { userInfoArr, reimbursementInfoArr } from '../Data';
import { stringify } from 'querystring';
import { reimbursement, userinfo } from '../Models/User';

export const userRouter = express.Router();

/*Find Users
URL: /users
Method: GET
Allowed Roles finance-manager
find all user
*/
userRouter.get('/users',(req,res)=> {
    const user = req.session.user;
    if (user && user.role.role === 'finance-manager') {
        res.json(userInfoArr);
    }else{
        res.send('Invalid Role');
    }
});

/*Find Users By Id
URL /users/:id
Method: GET
Allowed Roles finance-manager or if the id provided matches the id of the current user
Response:*/
userRouter.get('/users/:id',(req,res)=>{
    const user = req.session.user;
    if (user && user.role.role === 'finance-manager') {
        const info = userInfoArr.find(ele => ele.userId === +req.params.id);
        res.json(info);
    }else if (user && user.userId === +req.params.id) {
        const info = userInfoArr.find(ele => ele.userId === user.userId);
        res.json(info);
    }else {
        res.send('Invalid Role or ID Number');
    }
    
});

/*Update User
URL /users
Method: PATCH
Allowed Roles: admin
Request The userId must be presen as well as all fields to update, any field left undefined will not be updated.
*/
userRouter.patch('/users',(req,res)=>{
    const user = req.session.user;
    if (user && user.role.role === 'admin') {
        user.userId =  req.body.userId;
        user.username = req.body.username;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.role.role = req.body.role;
        
        req.session.user = user;

        for (let index = 0; index < userInfoArr.length; index++) {
            if (userInfoArr[index].userId === user.userId) {
                
            }
        }

        res.json(user);
    }
});

/*Login
Retreives users from the database
URL: /login
Method: POST
Request:
*/
userRouter.post('/login', ( req, res ) => {
    let userdisplay = {
        userId: 0,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    }
    let user = new userinfo(undefined,undefined,undefined,undefined,undefined,undefined,undefined);
    for (let index = 0; index < userInfoArr.length; index++) {
        //loops through an array of usernames to see if there are any identical values
        if (req.body.username != userInfoArr[index].username && req.body.password != userInfoArr[index].password) {
            continue;
        }
        else if(req.body.username === userInfoArr[index].username && req.body.password === userInfoArr[index].password) {
            user.userId =  userInfoArr[index].userId;
            user.username = req.body.username;
            user.firstName = userInfoArr[index].firstName;
            user.lastName = userInfoArr[index].lastName;
            user.email = userInfoArr[index].email;
            user.role = userInfoArr[index].role;

            userdisplay.userId =  userInfoArr[index].userId;
            userdisplay.username = req.body.username;
            userdisplay.firstName = userInfoArr[index].firstName;
            userdisplay.lastName = userInfoArr[index].lastName;
            userdisplay.email = userInfoArr[index].email;
            userdisplay.role = userInfoArr[index].role.role;
        }
    }

    if (user) {
        req.session.user = user;
        res.json(userdisplay);
    }else {
        res.send('Invalid Credentials')
    }
});

/*Find Reimbursements By Status
Reimbursements should be ordered by date
URL: /reimbursements/status/:statusId
For a challenge you could do this instead: /reimbursements/status/:statudId/date-submitted?start=:startDate&end=:endDate
Method: GET
Allowed Roles: finance-manager
Response:
*/
userRouter.get('/reimbursements/status/:statusId',(req,res)=>{

});

/*Find Reimbursements By User
Reimbursements should be ordered by date
URL: /reimbursements/author/userId/:userId
For a challenge you could do this instead: /reimbursements/author/userId/:userId/date-submitted?start=:startDate&end=:endDate
Method: GET
Allowed Roles: finance-manager or if ther userId is the user making the request.*/
userRouter.get('/reimbursements/author/userId/:userId',(req,res)=>{
    let userinfo = req.session.user;
    if (userinfo && userinfo.role.role === 'finance-manager') {
        const info = reimbursementInfoArr.find(ele => ele.reimbursementId === +req.params.userId);
        res.json(info);
    }else if (userinfo && userinfo.userId === +req.params.id) {
        const info = reimbursementInfoArr.find(ele => ele.reimbursementId === userinfo.userId);
        res.json(info);
    }else {
        res.send('Invalid Role or ID Number');
    }
});

/*Submit Reimbursement
URL /reimbursements
Method: POST
Rquest: The reimbursementId should be 0
Response: Status Code 201 CREATED*/
userRouter.post('/reimbursements',(req,res)=>{
    /*    reimbursementId: 0, // primary key
    author: 0,  // foreign key -> User, not null
    amount: 0,  // not null
    dateSubmitted: 0, // not null
    dateResolved: 0, // not null
    description: 'not filled', // not null
    resolver: 0, // foreign key -> User
    status: 0, // foreign key -> ReimbursementStatus, not null
    type: 0 // foreign key -> ReimbursementType*/
    let user = req.session.user;

    if (user && user.role.role) {
        let reimbursementinfo = new reimbursement(undefined,undefined,undefined,undefined,undefined,undefined,undefined);
        //reimbursementinfo.reimbursementId = 1;
        reimbursementinfo.author = req.body.author;
        reimbursementinfo.amount = req.body.amount;
        reimbursementinfo.dateSubmitted = req.body.dateSubmitted;
        reimbursementinfo.description = req.body.description;
        reimbursementinfo.resolver = req.body.resolver;
        //reimbursementinfo.status = 1; //'pending'
        reimbursementinfo.type = req.body.type;

        reimbursementInfoArr.push(reimbursementinfo);
        res.sendStatus(201);
    }
    else{
        res.send('Invalid Role');
    }
        
});

/*Update Reimbursement
URL /users
Method: PATCH
Allowed Roles finance-manager*/
userRouter.patch('/users',(req,res)=>{

});