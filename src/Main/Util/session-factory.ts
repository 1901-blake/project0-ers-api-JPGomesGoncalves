import {Pool} from 'pg';

export class SessionFactory{

    static cred = {
        database:  'postgres',
        host: process.env['Project_0_Host'],
        user: process.env['Project_0_Username'],
        password: process.env['Project_0_Password'],
        max: 10
    }
    static pool: Pool;

    static created = false;

    static getConnectionPool(): Pool{
        if (!this.created) {
            this.pool = new Pool(this.cred);
            this.created = true;
        }
        return this.pool;
    }
}