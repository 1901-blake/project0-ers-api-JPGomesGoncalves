export class userinfo{
    userId: number; // primary key
    username: string; // not null, unique (might have to loop through all Userinfo)
    password: string; // not null
    firstName: string; // not null
    lastName: string; // not null
    email: string; // not null
    role: Role; // not null
    constructor(id = 0, username: string = 'not filled', password: string = 'not filled',firstName: string = 'not filled',lastName: string = 'not filled',email: string =  'not filled',role: string = "associate" ) {
        this.userId = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = new Role(id,role);
    }
}

class Role  {
    roleId: number; // primary key
    role: string; // not null, unique

    constructor(roleId:number, role:string){
        this.roleId = roleId;
        this.role = role;

    }
}

export class reimbursement {
    reimbursementId: number; // primary key
    author: number;  // foreign key -> User, not null
    amount: number;  // not null
    dateSubmitted: number; // not null
    dateResolved: number; // not null
    description: string; // not null
    resolver: number; // foreign key -> User
    status: number; // foreign key -> ReimbursementStatus, not null
    type: number; // foreign key -> ReimbursementType

    constructor(reimbursementId: number = 0, author: number = 0, amount: number = 0,dateSubmitted: number = 0,dateResolved: number = 0,resolver: number =  0,type: number = 0 ) {
        this.reimbursementId = reimbursementId;
        this.author = author;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = dateResolved;
        this.resolver = resolver;
        this.type = type;
    }
}

let ReimbursementStatus = {
    statusId: 0, // primary key
    status: 'not filled' // not null, unique
}

//Lodging, Travel, Food, or Other.
let ReimbursementType = {
    typeId: 0, // primary key
    type: 'not filled', // not null, unique
  }