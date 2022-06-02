"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }const dotenv = require('dotenv').config({ path: __dirname+'/../.env' });
var _pgpromise = require('pg-promise'); var _pgpromise2 = _interopRequireDefault(_pgpromise);


const pgp = _pgpromise2.default.call(void 0, {
    receive: (data, result, e)=> {
        // var dc = e.dc;
        // var d = data[0].prop;
        // var r = result.fields[0].name;
        // var query = e.query;
    },
    query: (e)=> {
        var dc = e.dc;
        var query = e.query;
    },
    error: (err, e)=> {
        var dc = e.dc;
        var query = e.query;
    },
    extend: (obj, dc)=> {
        obj['method'] = (val)=> {
            return obj.one(null, val);
        }
    }
});

const connection = {
    host: dotenv.parsed.HOST,
    port: dotenv.parsed.PORT,
    user: dotenv.parsed.USER,
    password: dotenv.parsed.PASS
}
 const dbS = pgp(connection); exports.dbS = dbS;
