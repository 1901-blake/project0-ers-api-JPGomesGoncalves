export class Role  {
    roleid: number; // primary key
    role: string; // not null, unique

    constructor(roleid:number = 0, role:string = 'not filled'){
        this.roleid = roleid;
        this.role = role;

    }
}