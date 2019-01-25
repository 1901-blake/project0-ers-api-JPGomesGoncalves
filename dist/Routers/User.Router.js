"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Data_1 = require("../Data");
exports.userRouter = express_1.default.Router();
/*Find Users
URL: /users
Method: GET
Allowed Roles finance-managerfind user
*/
exports.userRouter.get('/users', (req, res) => {
    res.json(Data_1.userInfoArr);
});
/*Find Users By Id
URL /users/:id
Method: GET
Allowed Roles finance-manager or if the id provided matches the id of the current user
Response:*/
exports.userRouter.get('/users/:id', (req, res) => {
});
/*Update User
URL /users
Method: PATCH
Allowed Roles: admin
Request The userId must be presen as well as all fields to update, any field left undefined will not be updated.
*/
exports.userRouter.patch('/users', (req, res) => {
});
/*Login
Retreives users from the database
URL: /login
Method: POST
Request:
*/
exports.userRouter.post('/login', (req, res) => {
    for (const key in Data_1.userInfoArr) {
        if (Data_1.userInfoArr.hasOwnProperty('username')) {
            //loops through an array of usernames to see if there are any identical values
            if (req.body === Data_1.userInfoArr[key].username) {
            }
            console.log(Data_1.userInfoArr[key]);
        }
    }
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    res.json(user);
});
/*Find Reimbursements By Status
Reimbursements should be ordered by date
URL: /reimbursements/status/:statusId
For a challenge you could do this instead: /reimbursements/status/:statudId/date-submitted?start=:startDate&end=:endDate
Method: GET
Allowed Roles: finance-manager
Response:
*/
exports.userRouter.get('/reimbursements/status/:statusId', (req, res) => {
});
/*Find Reimbursements By User
Reimbursements should be ordered by date
URL: /reimbursements/author/userId/:userId
For a challenge you could do this instead: /reimbursements/author/userId/:userId/date-submitted?start=:startDate&end=:endDate
Method: GET
Allowed Roles: finance-manager or if ther userId is the user making the request.*/
exports.userRouter.get('/reimbursements/author/userId/:userId', (req, res) => {
});
/*Submit Reimbursement
URL /reimbursements
Method: POST
Rquest: The reimbursementId should be 0
Response: Status Code 201 CREATED*/
exports.userRouter.post('/reimbursements', (req, res) => {
});
/*Update Reimbursement
URL /users
Method: PATCH
Allowed Roles finance-manager*/
exports.userRouter.patch('/users', (req, res) => {
});
//# sourceMappingURL=User.Router.js.map