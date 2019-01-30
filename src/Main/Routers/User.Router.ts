import express from 'express';
import { userInfoArr, reimbursementInfoArr } from '../Util/Data';
import { stringify } from 'querystring';
import { User } from '../Models/User';
import { Reimbursement } from '../Models/reimbursement';
import {UserDao} from '../Dao/UserDoa';
import {RoleDoa} from '../Dao/RoleDoa';
import {ReimbursementDao} from '../Dao/ReimbursementDoa';
import { Role } from '../Models/Role';

// ask about letters in the timestamps for the Reimbursement
// ask about how to not set a value without multiple if statments

export const userRouter = express.Router();

/*Find Users Done
URL: /users
Method: GET
Allowed Roles finance-manager
find all user
*/
userRouter.get('/users',async (req,res)=> {

    try {
        const userinfo = req.session.user;
        const roledoa = new RoleDoa();
        const userdoa = new UserDao();
        let testsucceded = false;

        
        console.log('Finding Role of User in (Get User Function)');
        const role = await roledoa.findRoleById(userinfo.roleid);
        console.log('Finished Role of User in (Get User Function)');

            if (userinfo && await role.role === 'finance-manager') {
                console.log('Getting all Users in (Get User Function)');console.log();
                const result = await userdoa.getAllUser();
                console.log('Finished Getting all Users in (Get User Function)');console.log();
                testsucceded = true;
                res.json(result);
            }else{
                testsucceded = true;
                res.send('Invalid Role');
            }
    
            if (testsucceded != true) {
                res.send('Finding User was skipped FIX THIS')
            }

    } catch (e) {
        req.next(e);
    }


});

/*Find Users By Id Done
URL /users/:id
Method: GET
Allowed Roles finance-manager or if the id provided matches the id of the current user
Response:*/
userRouter.get('/users/:id',async (req,res)=>{

    try {
        const userinfo = req.session.user;
        const roledoa = new RoleDoa();
        const userdoa = new UserDao();
        let testsucceded = false;

        console.log('Finding Role of User in (Get User ID Function)');
        const role = await roledoa.findRoleById(userinfo.roleid);
        console.log('Finshed Role of User in (Get User ID Function)');

        if (userinfo && role.role === 'finance-manager') {
            console.log('Finding Users for finance-manager in (Get User ID Function)');console.log();
            const result = await userdoa.findUserById(req.params.id);
            console.log(result + 'Finshed finding User for finance-manager in (Get User ID Function)');console.log();
            testsucceded = true;
            res.json(result);
        } else if (userinfo && userinfo.userid === +req.params.id) {
            console.log('Finding Users for admin or lower in (Get User ID Function)');
            const result = await userdoa.findUserById(userinfo.userid);
            console.log('Finshed finding Users for admin or lower in (Get User ID Function)');console.log();
            testsucceded = true;
            res.json(result);
        } else {
            testsucceded = true;
            res.send('Invalid Role or ID Number');
        }

        if (testsucceded != true) {
            res.send('User ID Function was Skipped FIX THIS');
        }

    } catch (error) {
        req.next(error);
    }
});

/*Update User Needs works
URL /users
Method: PATCH
Allowed Roles: admin, finance-manager
Request The userId must be presen as well as all fields to update, any field left undefined will not be updated.
*/
userRouter.patch('/users',async (req,res)=>{
    try {

        const userinfo = req.session.user;
        const roledoa = new RoleDoa();
        const userdoa = new UserDao();
        const reimbursementsdoa = new ReimbursementDao();

        
        console.log(userinfo);

        const role = await roledoa.findRoleById(userinfo.roleid);
        console.log(role);

            if(userinfo && role.role === 'finance-manager'){
                const info = await reimbursementsdoa.UpdateReimbursement(+req.body.reimbursmentid,+req.body.author,+req.body.amount,req.body.datesubmitted,req.body.dateresolved,req.body.description,+req.body.resolver,+req.body.status,+req.body.type);
                res.json(info);
            }else if (userinfo && role.role === 'admin') {
               const result = await userdoa.userUpdate(+req.body.userid,req.body.username,req.body.password,req.body.firstName,req.body.lastName,req.body.email, +req.body.roleId);
               res.json(result);
            }else{
                res.send('Invalid Role');
            }
    
        

    } catch (e) {
        req.next(e);
    }
});

/*Login Done
Retreives users from the database
URL: /login
Method: POST
Request:
*/
userRouter.post('/login', async ( req, res ) => {
    try {
        let userdoa = new UserDao();
        let roledoa = new RoleDoa();
        let tempuserdisplay = {
            userId : 0,
            username : 'string',
            firstname : 'String',
            lastname : 'String',
            email : 'String',
            role : 'String'
        };


        let user = await userdoa.userlogin( req.body.username, req.body.password)

        if (user !== undefined) {
            console.log('Finding role in (User Login Function)');
            let role = await roledoa.findRoleById(user.roleid);
            console.log('Finshed Finding role in (User Login Function)');console.log();


            tempuserdisplay.userId =  user.userid;
            tempuserdisplay.username = user.username;
            tempuserdisplay.firstname = user.firstname;
            tempuserdisplay.lastname = user.lastname;
            tempuserdisplay.email = user.email;
            tempuserdisplay.role = role.role;
    
            req.session.user = user;
    
            res.json(tempuserdisplay);
        }else{
            res.send('Invalid username or password');
        }

      } catch (e) {
        req.next(e) 
      }
});

/*Find Reimbursements By Status Done
Reimbursements should be ordered by date
URL: /reimbursements/status/:statusId
For a challenge you could do this instead: /reimbursements/status/:statudId/date-submitted?start=:startDate&end=:endDate
Method: GET
Allowed Roles: finance-manager
Response:
*/
userRouter.get('/reimbursements/status/:statusId',async (req,res)=>{
    try {
        const userinfo = req.session.user;
        const roledoa = new RoleDoa();
        const reimbursementsdoa = new ReimbursementDao();

        const role = await roledoa.findRoleById(userinfo.userid); 

        if (userinfo && role.role === 'finance-manager') {
            const info = await reimbursementsdoa.findReimbursementByStatus(+req.params.statusId);
            res.json(info);
        }else {
            res.send('Invalid Role or ID Number');
        }
    } catch (error) {
        req.next(error);
    }

});

/*Find Reimbursements By User Done
Reimbursements should be ordered by date
URL: /reimbursements/author/userId/:userId
For a challenge you could do this instead: /reimbursements/author/userId/:userId/date-submitted?start=:startDate&end=:endDate
Method: GET
Allowed Roles: finance-manager or if ther userId is the user making the request.*/
userRouter.get('/reimbursements/author/userId/:userId',async (req,res)=>{

    try {
        const userinfo = req.session.user;
        const roledoa = new RoleDoa();
        const reimbursementsdoa = new ReimbursementDao();

        const role = await roledoa.findRoleById(userinfo.userid); 

        if (userinfo && role.role === 'finance-manager') {
            //const info = reimbursementInfoArr.find(ele => ele.reimbursementId === +req.params.userId);
            const info = await reimbursementsdoa.findReimbursementByUserId(+req.params.userId);
            console.log(info);
            res.json(info);
        }else if (userinfo && userinfo.userid === +req.params.userId) {
            //const info = reimbursementInfoArr.find(ele => ele.reimbursementId === userinfo.userId);
            const info = await reimbursementsdoa.findReimbursementByUserId(userinfo.userid);
            console.log(info);
            res.json(info);
        }else {
            res.send('Invalid Role or ID Number');
        }
    } catch (error) {
        req.next(error);
    }

});

/*Submit Reimbursement Needs work
URL /reimbursements
Method: POST
Rquest: The reimbursementId should be 0
Response: Status Code 201 CREATED*/
userRouter.post('/reimbursements',async (req,res)=>{
    /*    reimbursementId: 0, // primary key
    author: 0,  // foreign key -> User, not null
    amount: 0,  // not null
    dateSubmitted: 0, // not null
    dateResolved: 0, // not null
    description: 'not filled', // not null
    resolver: 0, // foreign key -> User
    status: 0, // foreign key -> ReimbursementStatus, not null
    type: 0 // foreign key -> ReimbursementType*/



    try {

        const userinfo = req.session.user;
        const reimbursementsdoa = new ReimbursementDao();

        let result = await reimbursementsdoa.SubmitReimbursement(+req.body.reimbursmentid, +req.body.author,+req.body.amount,req.body.datesubmitted,req.body.dateresolved,req.body.description,+req.body.resolver,+req.body.status,+req.body.type)

        res.send(result);
        
    } catch (error) {
        req.next(error);
    }
        
});
