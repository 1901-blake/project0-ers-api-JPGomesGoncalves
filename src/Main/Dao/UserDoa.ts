import { User } from '../Models/User';
import { SessionFactory } from '../Util/session-factory';

export class UserDao{

    public async getAllUser(): Promise<User[]> {

        let pool = SessionFactory.getConnectionPool();
        console.log("Entering pool conenct in (GetAllUser Function)");
        const client = await  pool.connect();
        console.log("Finshed pool conenct in (GetAllUser Function)");

        console.log("Entering client.query(SELECT * from User;) in (GetAllUser Function)");
        const result = await  client.query('SELECT * from "User" order by userid;');
        console.log("Finshed client.query(SELECT * from User;) in (GetAllUser Function)");console.log();
        console.log(result.rows);
        client.release();
        return result.rows ;
    }

    public async findUserById(id : number): Promise<User> {

        let pool = SessionFactory.getConnectionPool();

        console.log("Entering pool conenct in (FindUserById Function)");
        const client = await  pool.connect();
        console.log("Finshed pool conenct in (FindUserById Function)");

        console.log("Entering client.query(select * from User where userId = ${id};) in (FindUserById Function)");
        const result = await  client.query(`select * from "User" where userId = $1;`,[id]);
        console.log("Finished client.query(select * from User where userId = ${id};) in (FindUserById Function)");console.log();
        client.release();
        return result.rows[0];
    }

    public async userlogin(username : string,password : string): Promise<User> {

        let pool = SessionFactory.getConnectionPool();
        const client = await  pool.connect();

        const result = await  client.query(`select * from "User" where username =  $1  and "password" =  $2 ;`, [username,password]) ;
        //console.log(result.rows[0]);
        client.release();
        return result.rows[0];
    }

    public async userUpdate(userId : number, username : string,password : string, firstName : string,lastName : string, email : string, roleId : number): Promise<User> {
        // userId int 
        // username varchar(255) not n
        // password varchar(255)
        // firstName varchar(255)
        // lastName varchar(255)
        // email varchar(255)
        // roleId int
        let pool = SessionFactory.getConnectionPool();

        const client = await  pool.connect();
        
        console.log(`userid = ${userId}, username = '${username}', "password" = '${password}',
         firstname = '${firstName}', lastname = '${lastName}', email = '${email}', roleid = ${roleId}`);

        let tempnull = await client.query('select * from  "User" where userid = $1',[userId]);

        userId = userId || tempnull.rows[0].userid;
        username = username || tempnull.rows[0].username;
        password = password || tempnull.rows[0].password;
        firstName = firstName || tempnull.rows[0].firstname;
        lastName = lastName || tempnull.rows[0].lastname;
        email = email || tempnull.rows[0].email;
        roleId = roleId || tempnull.rows[0].roleid;

        console.log(`userid = ${userId}, username = '${username}', "password" = '${password}',
         firstname = '${firstName}', lastname = '${lastName}', email = '${email}', roleid = ${roleId}`);

        const result = await  client.query(`update "User"
        set userid = $1, username = $2, "password" = $3, firstname = $4, lastname = $5, email = $6, roleid = $7 
        where userid = $1 returning *;`,[userId,username,password,firstName,lastName,email,roleId]) ;
        client.release();
        return result.rows[0];
    }
}