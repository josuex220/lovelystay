"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _conexao = require('./conexao');
var _inquirer = require('inquirer'); var _inquirer2 = _interopRequireDefault(_inquirer);
var _CreateDB = require('./CreateDB');
var _colors = require('colors'); var _colors2 = _interopRequireDefault(_colors);
const dotenv = require('dotenv').config({ path: __dirname+'/../.env' });
var _figlet = require('figlet'); var _figlet2 = _interopRequireDefault(_figlet);


 async function install(){
    welcome();

    checkConnection().then(async (result) => {
        if(await !result[0]){  
            TerminalInstall();
        }
    });
    
} exports.install = install;
async function checkConnection(){
    return await _conexao.dbS.any(`SELECT 1 as total FROM pg_database WHERE datname='${dotenv.parsed.DB}'`);
}

function welcome(){
    
    _figlet2.default.call(void 0, 'Lovelystay Test \n\n\n', function(err, data) {
        if (err) {
            console.log('Algo errado...');
            console.dir(err);
            return;
        }
        console.log(_colors2.default.red(data))
    });

}

function nextPass(){
    
}
function TerminalInstall(){
     _inquirer2.default.prompt([
        {
          type: 'list',
          name: 'install',
          message: 'Identifiquei que você ainda não passou pelo processo de instalação, deseja instalar?',
          choices: [
            '1. Instalar',
            '2. Sair'
          ],
        }
      ])
      .then((answers) => {
          if(answers.install == "1. Instalar"){
            console.log(_colors2.default.green("\n\nCriando Banco de dados..."));
            _CreateDB.CreateDB.call(void 0, );
            _figlet2.default.call(void 0, 'Iniciando...', function(err, data) {
                if (err) {
                    console.log('Algo errado...');
                    console.dir(err);
                    return;
                }
                console.log(_colors2.default.green(data));
            });
            nextPass();
          }else{
            console.log(_colors2.default.green("\n\n\nThanks a Lot :)"));
            process.exit(1);
          }
      });
}
