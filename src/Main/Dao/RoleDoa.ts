import { Role } from '../Models/Role';
import { SessionFactory } from '../Util/session-factory';

export class RoleDoa{
    
    public async getallrole(): Promise<Role[]> {

        let pool = SessionFactory.getConnectionPool();

        const client = await  pool.connect();

        const result = await  client.query(`select * from "Role";`);
        client.release();
        return result.rows;
    }

    public async findRoleById(id : number): Promise<Role> {

        let pool = SessionFactory.getConnectionPool();

        console.log('Entering Pool in (findRoleById Function)');
        const client = await  pool.connect();
        console.log('Finshed Pool in (findRoleById Function)');

        console.log('Entering client.query(select * from "Role" where roleId = ${id};) in (findRoleById Function)');
        const result = await  client.query(`select * from "Role" where roleId = ${id};`);
        console.log('Finished client.query(select * from "Role" where roleId = ${id};) in (findRoleById Function)');console.log();
        client.release();
        return result.rows[0];
    }
}