import { Reimbursement } from '../Models/reimbursement';
import { SessionFactory } from '../Util/session-factory';

export class ReimbursementDao{

    public async getAllReimbursement(): Promise<Reimbursement[]> {

        let pool = SessionFactory.getConnectionPool();

        const client = await  pool.connect();

        const result = await  client.query('SELECT * from Reimbursement order by datesubmitted desc;');

        client.release();

        return result.rows;
    }

    public async findReimbursementByUserId(id : number): Promise<Reimbursement[]> {

        let pool = SessionFactory.getConnectionPool();

        const client = await  pool.connect();

        const result = await  client.query(`select * from Reimbursement where author = $1 order by datesubmitted desc;`,[id]);

        client.release();

        return result.rows;
    }

    public async findReimbursementByStatus(id : number): Promise<Reimbursement[]> {

        let pool = SessionFactory.getConnectionPool();

        const client = await  pool.connect();

        const result = await  client.query(`select * from Reimbursement where status = $1 order by datesubmitted desc;`,[id]);

        client.release();

        return result.rows;
    }
//userRouter.patch('/users') Pending = 1, Approved = 2, or Denied = 3.
    public async UpdateReimbursement(reimbursmentid: number, author: number, amount: number, dateSubmitted: number, dateResolved: number, description: string, resolver: number, status: number, type: number) {

        console.log(`reimbursmentid = ${reimbursmentid}, author = ${author}, amount = ${amount}, datesubmitted = ${dateSubmitted}, 
        dateresolved = ${dateResolved},description = ${description}, resolver = ${resolver}, status = ${status}, "type" = "${type}"`);
        
        let pool = SessionFactory.getConnectionPool();

        const client = await  pool.connect();

        let temp = [ client.query('update reimbursement set author = $1',[author]),]

        client.query('update reimbursement set author = $1',[author])
        const result = await  client.query(`update reimbursement
         set reimbursmentid = $1, author = $2, amount = $3, datesubmitted = $4, 
         dateresolved = $5,description = $6, resolver = $7, status = $8, "type" = $9
         where reimbursmentid = $1;`,[reimbursmentid,author,amount,dateSubmitted,dateResolved,description,resolver,status,type]);

        client.release();

        return result.rows;
    }

    public async SubmitReimbursement(reimbursmentid : number ,author: number, amount: number, dateSubmitted: number, dateResolved: number, description: string, resolver: number, status: number, type: number) {
        
        console.log(`author = ${author}, amount = ${amount}, datesubmitted = ${dateSubmitted}, 
        dateresolved = ${dateResolved},description = ${description}, resolver = ${resolver}, status = ${status}, "type" = ${type}`);
        
        let pool = SessionFactory.getConnectionPool();

        const client = await  pool.connect();

        //const count = await  client.query(`select max(reimbursementid) from reimbursement;`);
        const result = await  client.query(`insert into Reimbursement values($1,$2,$3, $4, $5,$6,$7,$8,$9);`,
        [reimbursmentid,author,amount,dateSubmitted,dateResolved,description,resolver,status,type]);
        
        client.release();

        return result.rows;
    }
}