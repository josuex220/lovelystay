import {dbS3} from './conexao';
import inquirer from 'inquirer';
import {CreateDB} from './CreateDB';
import colors from 'colors';
const dotenv = require('dotenv').config({ path: __dirname+'/../.env' });
import figlet from 'figlet';


export async function install(){
    welcome();

    checkConnection().then(async (result) => {
        if(await !result[0]){  
            TerminalInstall();
        }
    });
    
}
async function checkConnection(){
    return await dbS3.any(`SELECT 1 as total FROM pg_database WHERE datname='${dotenv.parsed.DB}'`);
}

function welcome(){
    
    figlet('Lovelystay Test \n\n\n', function(err, data) {
        if (err) {
            console.log('Algo errado...');
            console.dir(err);
            return;
        }
        console.log(colors.red(data))
    });

}

function nextPass(){
    
}
function TerminalInstall(){
     inquirer.prompt([
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
            console.log(colors.green("\n\nCriando Banco de dados..."));
            CreateDB();
            figlet('Iniciando...', function(err, data) {
                if (err) {
                    console.log('Algo errado...');
                    console.dir(err);
                    return;
                }
                console.log(colors.green(data));
            });
            nextPass();
          }else{
            console.log(colors.green("\n\n\nThanks a Lot :)"));
            process.exit(1);
          }
      });
}
