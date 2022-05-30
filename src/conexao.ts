const dotenv = require('dotenv').config({ path: __dirname+'/../.env' });
import {IMain, IDatabase} from 'pg-promise';
import pgPromise from 'pg-promise';

const pgp: IMain = pgPromise({
    receive: (data:any, result:any, e:any)=> {
        // var dc = e.dc;
        // var d = data[0].prop;
        // var r = result.fields[0].name;
        // var query = e.query;
    },
    query: (e:any)=> {
        var dc = e.dc;
        var query = e.query;
    },
    error: (err:any, e:any)=> {
        var dc = e.dc;
        var query = e.query;
    },
    extend: (obj:any, dc:any)=> {
        obj['method'] = (val:any)=> {
            return obj.one(null, val);
        }
    }
});

const connection: any = {
    host: dotenv.parsed.HOST,
    port: dotenv.parsed.PORT,
    database: dotenv.parsed.DB,
    user: dotenv.parsed.USER,
    password: dotenv.parsed.PASS
}
export const db: IDatabase<any> = pgp(connection);
