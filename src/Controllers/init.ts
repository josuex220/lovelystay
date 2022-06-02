import inquirer from 'inquirer';
import * as Routes from './Routes';
import colors from 'colors';
import Table from 'cli-table';


var stage = 0;
export function init(){
    switch (stage) {
        case 0:
            terminal('list', 'init', 'Olá, Oque deseja?',['Cadastrar Novo Usuario', 'Consultar Usuario(s)', 'Deletar Usuario', 'Sair']).then((result) => {
                if(result.init == 'Cadastrar Novo Usuario'){
                   stage = 1;
                   init(); 
                }else if(result.init == 'Consultar Usuario(s)'){
                    stage = 2;
                    init(); 
                }else if(result.init == 'Deletar Usuario'){
                    stage = 3;
                    init(); 
                }else{
                    process.exit(1);
                }
            });
        break;
        case 1:
            terminal('input', 'option', 'Nome de Usuario no Github (Ou digite Sair para voltar ao menu principal):').then(async (result)=>{
                if(result?.option?.length > 0){
                    if(result?.option.toUpperCase() == "SAIR"){
                        stage = 0;
                        return init();
                    }
                  var row = await Routes.storeUser(result?.option);
                    if(row.code != 200){
                        console.log(colors.red(`\n\n---------------------------------------------\n${row.text}, vamos tentar novamente\n---------------------------------------------\n\n\n`));

                        init();
                    }else{
                        console.log(colors.green(`\n\n---------------------------------------------\nUsuario encontrado e cadastrado com sucesso\n---------------------------------------------\n\n\n`));
                        
                        terminal('list', 'exit', 'Oque Deseja Fazer?', ['Cadastrar novo Usuario', 'Voltar ao menu Anterior', 'Sair']).then((r)=>{
                            switch (r.exit) {
                                case 'Cadastrar novo Usuario':
                                    init();
                                    break;
                                case 'Voltar ao menu Anterior':
                                    stage=0;
                                    init();
                                    break;
                                case 'Sair':
                                    process.exit(1);
                                    break;
                            }
                        });
                    }
                }else{
                    console.log(colors.red(`\n\n---------------------------------------------\nNecessario no min 1 Caractere, vamos tentar novamente\n---------------------------------------------\n\n\n`));
                    init();
                }
            });
        break;
        case 2:
            terminal('list', 'init', 'Buscar Por?',['Ver Todos','Nome de Usuario', 'Localização', 'ID', 'Sair']).then((result) => {
                if(result.init == 'Nome de Usuario'){
                    terminal('input', 'option', 'Nome de usuario (Ou digite Sair para voltar ao menu principal):').then(async (r)=>{
                        if(r?.option?.length > 0){
                            if(r?.option.toUpperCase() == "SAIR"){
                                stage = 0;
                                return init();
                            }
                            Routes.getUser(r.option).then((rows) => {
                                
                                if(rows?.code == 404){
                                    console.log(colors.red(`\n\n---------------------------------------------\n${rows.text}\n---------------------------------------------\n\n\n`));
                                    init();
                                }else{
                                    var table = new Table({ head: ["Login","ID GitHUB","Nome","Compania","Localização","Email","Seguidores","Seguindo"]});
                                    for (let i = 0; i < rows?.length; i++) {
                                        // console.log(rows[i].login);
                                        table.push([rows[i].login ?rows[i].login : 'false', rows[i].id_github ? rows[i].id_github :'false', rows[i].name ? rows[i].name : 'false', rows[i].company ? rows[i].company : 'false', rows[i].location ? rows[i].location : 'false', rows[i].email ?rows[i].email : 'false', rows[i].followers ? rows[i].followers : 'false', rows[i].following ? rows[i].following :'false']);
                                    }
                                    console.log(table.toString());
                                    terminal('list', 'exit', 'Oque Deseja Fazer?', ['Buscar novo Usuario', 'Voltar ao menu Anterior', 'Sair']).then((r)=>{
                                        switch (r.exit) {
                                            case 'Buscar novo Usuario':
                                                init();
                                                break;
                                            case 'Voltar ao menu Anterior':
                                                stage=2;
                                                init();
                                                break;
                                            case 'Sair':
                                                process.exit(1);
                                                break;
                                        }
                                    });
                                }
                            });
                        } else{
                            console.log(colors.red(`\n\n---------------------------------------------\nObrigatorio ter ao min 1 letra, vamos tentar novamente\n---------------------------------------------\n\n\n`));
                            init();
                        }
                    });
                }else if(result.init == 'Ver Todos'){
                    Routes.getUser().then((rows) => {
                        if(rows?.code == 404){
                            console.log(colors.red(`\n\n---------------------------------------------\n${rows.text}\n---------------------------------------------\n\n\n`));
                            init();
                        }else{
                            var table = new Table({ head: ["Login","ID GitHUB","Nome","Compania","Localização","Email","Seguidores","Seguindo"]});
                            for (let i = 0; i < rows?.length; i++) {
                                table.push([rows[i].login ?rows[i].login : 'false', rows[i].id_github ? rows[i].id_github :'false', rows[i].name ? rows[i].name : 'false', rows[i].company ? rows[i].company : 'false', rows[i].location ? rows[i].location : 'false', rows[i].email ?rows[i].email : 'false', rows[i].followers ? rows[i].followers : 'false', rows[i].following ? rows[i].following :'false']);
                            }
                            console.log(table.toString());
                            terminal('list', 'exit', 'Oque Deseja Fazer?', ['Voltar ao menu Anterior', 'Sair']).then((r)=>{
                                switch (r.exit) {
                                    case 'Voltar ao menu Anterior':
                                        stage=2;
                                        init();
                                        break;
                                    case 'Sair':
                                        process.exit(1);
                                        break;
                                }
                            });
                        }
                    });
                }else if(result.init == 'Localização'){
                    terminal('input', 'option', 'Localização do Usuario (Ou digite Sair para voltar ao menu principal):').then(async (r)=>{
                        if(r?.option?.length > 0){
                            if(r?.option?.toUpperCase() == "SAIR"){
                                stage = 0;
                                return init();
                            }
                            Routes.getUser(r.option,1).then((rows) => {
                                
                                if(rows?.code == 404){
                                    console.log(colors.red(`\n\n---------------------------------------------\n${rows.text}\n---------------------------------------------\n\n\n`));
                                    init();
                                }else{
                                    
                                    var table = new Table({ head: ["Login","ID GitHUB","Nome","Compania","Localização","Email","Seguidores","Seguindo"]});
                                        for (let i = 0; i < rows?.length; i++) {
                                            // console.log(rows[i].login);
                                            table.push([rows[i].login ?rows[i].login : 'false', rows[i].id_github ? rows[i].id_github :'false', rows[i].name ? rows[i].name : 'false', rows[i].company ? rows[i].company : 'false', rows[i].location ? rows[i].location : 'false', rows[i].email ?rows[i].email : 'false', rows[i].followers ? rows[i].followers : 'false', rows[i].following ? rows[i].following :'false']);
                                        }
                                    console.log(table.toString());
                                    terminal('list', 'exit', 'Oque Deseja Fazer?', ['Buscar Outra Localização', 'Voltar ao menu Anterior', 'Sair']).then((r)=>{
                                        switch (r.exit) {
                                            case 'Buscar Outra Localização':
                                                init();
                                                break;
                                            case 'Voltar ao menu Anterior':
                                                stage=2;
                                                init();
                                                break;
                                            case 'Sair':
                                                process.exit(1);
                                                break;
                                        }
                                    });
                                }
                            });
                        }  else{
                            console.log(colors.red(`\n\n---------------------------------------------\nObrigatorio ter ao min 1 letra, vamos tentar novamente\n---------------------------------------------\n\n\n`));
                            init();
                        }
                    });
                }else if(result.init == 'ID'){
                    terminal('input', 'option', 'ID NO GITHUB (Ou digite Sair para voltar ao menu principal):').then(async (r)=>{
                        if(r?.option?.length > 0){
                            if(r?.option?.toUpperCase() == "SAIR"){
                                stage = 0;
                                return init();
                            }
                            Routes.getUser(r.option).then((rows) => {
                                
                                if(rows?.code == 404){
                                    console.log(colors.red(`\n\n---------------------------------------------\n${rows.text}\n---------------------------------------------\n\n\n`));
                                    init();
                                }else{
                                    var table = new Table({ head: ["Login","ID GitHUB","Nome","Compania","Localização","Email","Seguidores","Seguindo"]});
                                    for (let i = 0; i < rows?.length; i++) {
                                        // console.log(rows[i].login);
                                        table.push([rows[i].login ?rows[i].login : 'false', rows[i].id_github ? rows[i].id_github :'false', rows[i].name ? rows[i].name : 'false', rows[i].company ? rows[i].company : 'false', rows[i].location ? rows[i].location : 'false', rows[i].email ?rows[i].email : 'false', rows[i].followers ? rows[i].followers : 'false', rows[i].following ? rows[i].following :'false']);
                                    }
                                    console.log(table.toString());
                                    terminal('list', 'exit', 'Oque Deseja Fazer?', ['Buscar Outro Id', 'Voltar ao menu Anterior', 'Sair']).then((r)=>{
                                        switch (r.exit) {
                                            case 'Buscar Outro Id':
                                                init();
                                                break;
                                            case 'Voltar ao menu Anterior':
                                                stage=2;
                                                init();
                                                break;
                                            case 'Sair':
                                                process.exit(1);
                                                break;
                                        }
                                    });
                                }
                            });
                        }  else{
                            console.log(colors.red(`\n\n---------------------------------------------\nObrigatorio ter ao min 1 letra, vamos tentar novamente\n---------------------------------------------\n\n\n`));
                            init();
                        }
                    });
                }else{
                    process.exit(1);
                }
            });
            break;
        case 3:
            terminal('input', 'option', 'Username do usuario que deseja deletar (Ou digite Sair para voltar ao menu principal):').then(async (r)=>{
                if(r?.option?.length > 0){
                    if(r?.option?.toUpperCase() == "SAIR"){
                        stage = 0;
                        return init();
                    }

                    Routes.deleteUser(r.option).then((del) => {
                        if(del?.code != 200){
                            console.log(colors.red(`\n\n---------------------------------------------\n${del?.text}\n---------------------------------------------\n\n\n`));
                            init();
                        }else{
                            console.log(colors.green(`\n\n---------------------------------------------\n${del?.text}\n---------------------------------------------\n\n\n`));
                            init();
                        }
                    });

                }else{
                    console.log(colors.red(`\n\n---------------------------------------------\nObrigatorio ter ao min 1 letra, vamos tentar novamente\n---------------------------------------------\n\n\n`));
                    init();
                }
            });
        break;
    
    }

}

function terminal(type, name,msg, choice:any = false){
    if(choice){
        return inquirer.prompt([
        {
            type: type,
            name: name,
            message: msg,
            choices: choice,
        }
        ]);
    }else{
        return inquirer.prompt([
            {
                type: type,
                name: name,
                message: msg,
            }
            ]);
    }

}

