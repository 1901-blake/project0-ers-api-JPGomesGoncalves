export class Reimbursement {
    reimbursmentid: number; // primary key
    author: number;  // foreign key -> User, not null
    amount: number;  // not null
    dateSubmitted: Date; // not null
    dateResolved: Date; // not null
    description: string; // not null
    resolver: number; // foreign key -> User
    status: number; // foreign key -> ReimbursementStatus, not null
    type: number; // foreign key -> ReimbursementType

    constructor(reimbursmentid: number = 0, author: number = 0, amount: number = 0,dateSubmitted: Date = new Date(1111,1,1),dateResolved: Date =new  Date(1111,1,1),resolver: number =  0,type: number = 0 ) {
        this.reimbursmentid = reimbursmentid;
        this.author = author;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = dateResolved;
        this.resolver = resolver;
        this.type = type;
    }
}