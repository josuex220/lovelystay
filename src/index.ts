import express from 'express';
import * as Routes from './Controllers/Routes';

const dotenv = require('dotenv').config({ path: __dirname+'/../.env' });
const app = express();

//Routes Express;

app.get('*', Routes.err400);

var port = dotenv.parsed.PORT_ALT;
if(dotenv.parsed.AMB == "PROD"){
    port = process.env.PORT;
}

app.listen(port, () =>{
    console.log(`Rodando na port ${port}`);
});