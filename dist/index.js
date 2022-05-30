"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _Routes = require('./Controllers/Routes'); var Routes = _interopRequireWildcard(_Routes);

const dotenv = require('dotenv').config({ path: __dirname+'/../.env' });
const app = _express2.default.call(void 0, );

//Routes Express;

app.get('/user/:user', Routes.getUser);
app.get('/users', Routes.getUser);
app.post('/user/:user', Routes.storeUser);
app.delete('/user/:user', Routes.deleteUser);
app.get('*', Routes.err400);

var port = dotenv.parsed.PORT_ALT;
if(dotenv.parsed.AMB == "PROD"){
    port = process.env.PORT;
}

app.listen(port, () =>{
    console.log(`Rodando na port ${port}`);
});