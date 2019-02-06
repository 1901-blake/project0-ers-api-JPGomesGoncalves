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
    public async UpdateReimbursement(reimbursmentid: number, author: number, amount: number, dateSubmitted: number, dateResolved: number, description: string, resolver: number, status: number, type: number): Promise<Reimbursement>  {

        // console.log(`reimbursmentid = ${reimbursmentid}, author = ${author}, amount = ${amount}, datesubmitted = ${dateSubmitted}, 
        // dateresolved = ${dateResolved},description = ${description}, resolver = ${resolver}, status = ${status}, "type" = "${type}"`);
        
        let pool = SessionFactory.getConnectionPool();

        const client = await  pool.connect();

        let tempnull = await client.query('select * from  reimbursement where reimbursmentId = $1',[reimbursmentid]);

        amount = amount || tempnull.rows[0].amount;
        author = author || tempnull.rows[0].author;
        dateSubmitted = dateSubmitted || tempnull.rows[0].datesubmitted;
        dateResolved = dateResolved || tempnull.rows[0].dateresolved;
        description = description || tempnull.rows[0].description;
        resolver = resolver || tempnull.rows[0].resolver;
        status =status || tempnull.rows[0].status;
        type =type || tempnull.rows[0].type;

        // console.log(`reimbursmentid = ${reimbursmentid}, author = ${author}, amount = ${amount}, datesubmitted = ${dateSubmitted}, 
        // dateresolved = ${dateResolved},description = ${description}, resolver = ${resolver}, status = ${status}, "type" = "${type}"`);

        const result = await  client.query(`update reimbursement
         set reimbursmentid = $1, author = $2, amount = $3, datesubmitted = $4, 
         dateresolved = $5,description = $6, resolver = $7, status = $8, "type" = $9
         where reimbursmentid = $1 returning *;`,[reimbursmentid ,author,amount,dateSubmitted,dateResolved,description,resolver,status,type]);

        client.release();

        return result.rows[0];
    }

    public async SubmitReimbursement(reimbursmentid : number ,author: number, amount: number, dateSubmitted: number, dateResolved: number, description: string, resolver: number, status: number, type: number): Promise<Reimbursement>  {
        
        console.log(`author = ${author}, amount = ${amount}, datesubmitted = ${dateSubmitted}, 
        dateresolved = ${dateResolved},description = ${description}, resolver = ${resolver}, status = ${status}, "type" = ${type}`);
        


        let pool = SessionFactory.getConnectionPool();

        const client = await  pool.connect();

        //status(1,'pending');
        //status(2,'approved');
        //status(3,'rejected');
        //const count = await  client.query(`select max(reimbursementid) from reimbursement;`);
        const result = await  client.query(`insert into Reimbursement values(default ,$1,$2, $3,'0001-01-01', $4,null,1,$5) returning *;`,
        [author,amount,dateSubmitted,description,type]);
        
        client.release();

        return result.rows[0];
    }
}