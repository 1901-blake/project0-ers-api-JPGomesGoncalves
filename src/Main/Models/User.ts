import {Role} from './Role';

export class User{
    userid: number; // primary key you wanna see somthing fun make this variable have a capital
    username: string; // not null, unique (might have to loop through all Userinfo)
    password: string; // not null
    firstname: string; // not null
    lastname: string; // not null
    email: string; // not null
    roleid: number; // not null
    constructor(id = 0, username: string = 'not filled', password: string = 'not filled',firstName: string = 'not filled',lastName: string = 'not filled',email: string =  'not filled',role: number = 0 ) {
        this.userid = id;
        this.username = username;
        this.password = password;
        this.firstname = firstName;
        this.lastname = lastName;
        this.email = email;
        this.roleid = 0;
    }
}








