import express from 'express';
import { reimbursementsdoa } from '../../Index'
import { ValidUserMiddleware } from '../middleware/ValidUsermiddleware';
import { ReimbursementMiddleware } from '../middleware/ReimbursementMiddleware';

export const reimbursementRouter = express.Router();


/*Find Reimbursements By Status Done
Reimbursements should be ordered by date
URL: /reimbursements/status/:statusId
For a challenge you could do this instead: /reimbursements/status/:statudId/date-submitted?start=:startDate&end=:endDate
Method: GET
Allowed Roles: finance-manager
Response:
*/
reimbursementRouter.get('/status/:statusId', [ReimbursementMiddleware], async (req, res) => {
    try {
        const info = await reimbursementsdoa.findReimbursementByStatus(+req.params.statusId);
        let reimbursementDisplay = [];
        for (let index = 0; index < info.length; index++) {
            const reimbursementHolder = {
                reimbursmentid: 0, // primary key
                author: 0,  // foreign key -> User, not null
                amount: 0,  // not null
                datesubmitted: 'not filled', // not null
                dateresolved: 'not filled', // not null
                description: 'not filled', // not null
                resolver: 0, // foreign key -> User
                status: 0, // foreign key -> ReimbursementStatus, not null
                type: 0, // foreign key -> ReimbursementType
            };
            reimbursementHolder.reimbursmentid = info[index].reimbursmentid;    
            reimbursementHolder.author = info[index].author;            
            reimbursementHolder.amount = info[index].amount;            
            reimbursementHolder.datesubmitted = info[index].datesubmitted.toLocaleDateString('en-US');   
            reimbursementHolder.dateresolved = info[index].dateresolved.toLocaleDateString('en-US');          
            reimbursementHolder.description = info[index].description;            
            reimbursementHolder.resolver = info[index].resolver;    
            reimbursementHolder.status = info[index].status;            
            reimbursementHolder.type = info[index].type;            
            reimbursementDisplay[index] = reimbursementHolder;
        }
        res.json(reimbursementDisplay);
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
reimbursementRouter.get('/author/userId/:userId', [ReimbursementMiddleware], async (req, res) => {

    try {

        let reimbursementDisplay = [];
        //const info = reimbursementInfoArr.find(ele => ele.reimbursementId === +req.params.userId);
        const info = await reimbursementsdoa.findReimbursementByUserId(+req.params.userId);
        for (let index = 0; index < info.length; index++) {
            const reimbursementHolder = {
                reimbursmentid: 0, // primary key
                author: 0,  // foreign key -> User, not null
                amount: 0,  // not null
                datesubmitted: 'not filled', // not null
                dateresolved: 'not filled', // not null
                description: 'not filled', // not null
                resolver: 0, // foreign key -> User
                status: 0, // foreign key -> ReimbursementStatus, not null
                type: 0, // foreign key -> ReimbursementType
            };
            reimbursementHolder.reimbursmentid = info[index].reimbursmentid;    
            reimbursementHolder.author = info[index].author;            
            reimbursementHolder.amount = info[index].amount;            
            reimbursementHolder.datesubmitted = info[index].datesubmitted.toLocaleDateString('en-US');   
            reimbursementHolder.dateresolved = info[index].dateresolved.toLocaleDateString('en-US');          
            reimbursementHolder.description = info[index].description;            
            reimbursementHolder.resolver = info[index].resolver;    
            reimbursementHolder.status = info[index].status;            
            reimbursementHolder.type = info[index].type;        

            reimbursementDisplay[index] = reimbursementHolder;
        }

        res.json(reimbursementDisplay);

    } catch (error) {
        req.next(error);
    }

});



/*Submit Reimbursement Needs work
URL /reimbursements
Method: POST
Rquest: The reimbursementId should be 0
Response: Status Code 201 CREATED*/
reimbursementRouter.post('', [ValidUserMiddleware], async (req, res) => {
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

        let result = await reimbursementsdoa.SubmitReimbursement(+req.body.reimbursmentid, req.session.user.userid, +req.body.amount, req.body.datesubmitted, req.body.dateresolved, req.body.description, +req.body.resolver, +req.body.status, +req.body.type)

        res.send(result);

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
reimbursementRouter.patch('', [ReimbursementMiddleware], async (req, res) => {
    try {
        const info = await reimbursementsdoa.UpdateReimbursement(+req.body.reimbursmentid, +req.body.author, +req.body.amount, req.body.datesubmitted, req.body.dateresolved, req.body.description, req.session.user.userid, +req.body.status, +req.body.type);
            const reimbursementHolder = {
                reimbursmentid: 0, // primary key
                author: 0,  // foreign key -> User, not null
                amount: 0,  // not null
                datesubmitted: 'not filled', // not null
                dateresolved: 'not filled', // not null
                description: 'not filled', // not null
                resolver: 0, // foreign key -> User
                status: 0, // foreign key -> ReimbursementStatus, not null
                type: 0, // foreign key -> ReimbursementType
            };
            reimbursementHolder.reimbursmentid = info.reimbursmentid;    
            reimbursementHolder.author = info.author;            
            reimbursementHolder.amount = info.amount;            
            reimbursementHolder.datesubmitted = info.datesubmitted.toLocaleDateString('en-US');   
            reimbursementHolder.dateresolved = info.dateresolved.toLocaleDateString('en-US');          
            reimbursementHolder.description = info.description;            
            reimbursementHolder.resolver = info.resolver;    
            reimbursementHolder.status = info.status;            
            reimbursementHolder.type = info.type;        


        res.json(reimbursementHolder);

    } catch (e) {
        req.next(e);
    }
});
