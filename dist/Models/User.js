"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class userinfo {
    constructor(id = 0, username = 'not filled', password = 'not filled') {
        this.userId = id;
        this.username = username;
        this.password = password;
    }
}
exports.userinfo = userinfo;
let role = {
    roleId: 0,
    role: 'not filled' // not null, unique
};
let reimbursement = {
    reimbursementId: 0,
    author: 0,
    amount: 0,
    dateSubmitted: 0,
    dateResolved: 0,
    description: 'not filled',
    resolver: 0,
    status: 0,
    type: 0 // foreign key -> ReimbursementType
};
let ReimbursementStatus = {
    statusId: 0,
    status: 'not filled' // not null, unique
};
let ReimbursementType = {
    typeId: 0,
    type: 'not filled',
};
//# sourceMappingURL=User.js.map