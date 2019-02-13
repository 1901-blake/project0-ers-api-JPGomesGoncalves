import express from 'express';
import { userdoa } from '../../Index'
import { roledoa } from '../../Index'
import { AdminMiddleware } from '../middleware/Adminmiddleware';
import { FindUserMiddleware } from '../middleware/FindUserMiddleware';


// ask about letters in the timestamps for the Reimbursement
// ask about how to not set a value without multiple if statments

export const userRouter = express.Router();

/*Find Users Done
URL: /users
Method: GET
Allowed Roles finance-manager, admin
find all user
*/
userRouter.get('', [FindUserMiddleware], async (req, res) => {

    try {
        console.log('Getting all Users in (Get User Function)'); console.log();
        const result = await userdoa.getAllUser();
        console.log('Finished Getting all Users in (Get User Function)'); console.log();

        //console.log('session user value: ' + req.session.user);

        res.json(result);
        //res.sendStatus(200);

    } catch (e) {
        req.next(e);
    }


});

/*Find Users By Id Done
URL /users/:id
Method: GET
Allowed Roles finance-manager, admin or if the id provided matches the id of the current user
Response:*/
userRouter.get('/:id', [FindUserMiddleware], async (req, res) => {
    try {

        console.log('Finding Users for finance-manager in (Get User ID Function)'); console.log();
        const result = await userdoa.findUserById(req.params.id);
        console.log(result + 'Finshed finding User for finance-manager in (Get User ID Function)'); console.log();
        res.json(result);

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
userRouter.patch('', [AdminMiddleware], async (req, res) => {
    console.log('Started in Update Users');
    try {
        console.log('Entered try block in Update Users');
        const result = await userdoa.userUpdate(+req.body.userid, req.body.username, req.body.password, req.body.firstname || req.body.firstName, req.body.lastname, req.body.email, +req.body.roleId || +req.body.roleid);
        res.json(result);

    } catch (e) {
        console.log('somehting went wrong in Update Users')
        req.next(e);
    }
});

/*Login Done
Retreives users from the database
URL: /login
Method: POST
Request:
*/
userRouter.post('/login', async (req, res) => {
    try {
        console.log('started user login');
        let tempuserdisplay = {
            userId: 0,
            username: 'string',
            firstname: 'String',
            lastname: 'String',
            email: 'String',
            role: 'String'
        };


        let user = await userdoa.userlogin(req.body.username, req.body.password)

        if (user !== undefined) {
            console.log('Finding role in (User Login Function)');
            let role = await roledoa.findRoleById(user.roleid);
            console.log('Finshed Finding role in (User Login Function)'); console.log();


            tempuserdisplay.userId = user.userid;
            tempuserdisplay.username = user.username;
            tempuserdisplay.firstname = user.firstname;
            tempuserdisplay.lastname = user.lastname;
            tempuserdisplay.email = user.email;
            tempuserdisplay.role = role.role;

            req.session.user = user;
            req.session.role = role;

            // console.log(user);
            // console.log(req.body.username);
            // console.log(req.body.password);
            // console.log('session user value: ' + req.session.user);
            // console.log(`session userid value: ${req.session.user.userid}
            // session username value: ${req.session.user.username} 
            // session firstname value: ${req.session.user.firstname}
            // session lastname value: ${req.session.user.lastname}
            // session email value: ${req.session.user.email}
            // session role value: ${req.session.user.roleid}`);
            // console.log(`session roleid value: ${req.session.role.roleid}
            //              session role value: ${req.session.role.role}`);


            res.json(tempuserdisplay);
        } else {
            res.status(400).send('Invalid username or password');
        }

    } catch (e) {
        req.next(e)
    }
});

