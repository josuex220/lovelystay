"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _inquirer = require('inquirer'); var _inquirer2 = _interopRequireDefault(_inquirer);
var _Routes = require('./Routes'); var Routes = _interopRequireWildcard(_Routes);
var _colors = require('colors'); var _colors2 = _interopRequireDefault(_colors);
var _clitable = require('cli-table'); var _clitable2 = _interopRequireDefault(_clitable);


var stage = 0;
 function init(){
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
                if(_optionalChain([result, 'optionalAccess', _ => _.option, 'optionalAccess', _2 => _2.length]) > 0){
                    if(_optionalChain([result, 'optionalAccess', _3 => _3.option, 'access', _4 => _4.toUpperCase, 'call', _5 => _5()]) == "SAIR"){
                        stage = 0;
                        return init();
                    }
                  var row = await Routes.storeUser(_optionalChain([result, 'optionalAccess', _6 => _6.option]));
                    if(row.code != 200){
                        console.log(_colors2.default.red(`\n\n---------------------------------------------\n${row.text}, vamos tentar novamente\n---------------------------------------------\n\n\n`));

                        init();
                    }else{
                        console.log(_colors2.default.green(`\n\n---------------------------------------------\nUsuario encontrado e cadastrado com sucesso\n---------------------------------------------\n\n\n`));
                        
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
                    console.log(_colors2.default.red(`\n\n---------------------------------------------\nNecessario no min 1 Caractere, vamos tentar novamente\n---------------------------------------------\n\n\n`));
                    init();
                }
            });
        break;
        case 2:
            terminal('list', 'init', 'Buscar Por?',['Ver Todos','Nome de Usuario', 'Localização', 'ID', 'Sair']).then((result) => {
                if(result.init == 'Nome de Usuario'){
                    terminal('input', 'option', 'Nome de usuario (Ou digite Sair para voltar ao menu principal):').then(async (r)=>{
                        if(_optionalChain([r, 'optionalAccess', _7 => _7.option, 'optionalAccess', _8 => _8.length]) > 0){
                            if(_optionalChain([r, 'optionalAccess', _9 => _9.option, 'access', _10 => _10.toUpperCase, 'call', _11 => _11()]) == "SAIR"){
                                stage = 0;
                                return init();
                            }
                            Routes.getUser(r.option).then((rows) => {
                                
                                if(_optionalChain([rows, 'optionalAccess', _12 => _12.code]) == 404){
                                    console.log(_colors2.default.red(`\n\n---------------------------------------------\n${rows.text}\n---------------------------------------------\n\n\n`));
                                    init();
                                }else{
                                    var table = new (0, _clitable2.default)({ head: ["Login","ID GitHUB","Nome","Compania","Localização","Email","Seguidores","Seguindo"]});
                                    for (let i = 0; i < _optionalChain([rows, 'optionalAccess', _13 => _13.length]); i++) {
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
                            console.log(_colors2.default.red(`\n\n---------------------------------------------\nObrigatorio ter ao min 1 letra, vamos tentar novamente\n---------------------------------------------\n\n\n`));
                            init();
                        }
                    });
                }else if(result.init == 'Ver Todos'){
                    Routes.getUser().then((rows) => {
                        if(_optionalChain([rows, 'optionalAccess', _14 => _14.code]) == 404){
                            console.log(_colors2.default.red(`\n\n---------------------------------------------\n${rows.text}\n---------------------------------------------\n\n\n`));
                            init();
                        }else{
                            var table = new (0, _clitable2.default)({ head: ["Login","ID GitHUB","Nome","Compania","Localização","Email","Seguidores","Seguindo"]});
                            for (let i = 0; i < _optionalChain([rows, 'optionalAccess', _15 => _15.length]); i++) {
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
                        if(_optionalChain([r, 'optionalAccess', _16 => _16.option, 'optionalAccess', _17 => _17.length]) > 0){
                            if(_optionalChain([r, 'optionalAccess', _18 => _18.option, 'optionalAccess', _19 => _19.toUpperCase, 'call', _20 => _20()]) == "SAIR"){
                                stage = 0;
                                return init();
                            }
                            Routes.getUser(r.option,1).then((rows) => {
                                
                                if(_optionalChain([rows, 'optionalAccess', _21 => _21.code]) == 404){
                                    console.log(_colors2.default.red(`\n\n---------------------------------------------\n${rows.text}\n---------------------------------------------\n\n\n`));
                                    init();
                                }else{
                                    
                                    var table = new (0, _clitable2.default)({ head: ["Login","ID GitHUB","Nome","Compania","Localização","Email","Seguidores","Seguindo"]});
                                        for (let i = 0; i < _optionalChain([rows, 'optionalAccess', _22 => _22.length]); i++) {
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
                            console.log(_colors2.default.red(`\n\n---------------------------------------------\nObrigatorio ter ao min 1 letra, vamos tentar novamente\n---------------------------------------------\n\n\n`));
                            init();
                        }
                    });
                }else if(result.init == 'ID'){
                    terminal('input', 'option', 'ID NO GITHUB (Ou digite Sair para voltar ao menu principal):').then(async (r)=>{
                        if(_optionalChain([r, 'optionalAccess', _23 => _23.option, 'optionalAccess', _24 => _24.length]) > 0){
                            if(_optionalChain([r, 'optionalAccess', _25 => _25.option, 'optionalAccess', _26 => _26.toUpperCase, 'call', _27 => _27()]) == "SAIR"){
                                stage = 0;
                                return init();
                            }
                            Routes.getUser(r.option).then((rows) => {
                                
                                if(_optionalChain([rows, 'optionalAccess', _28 => _28.code]) == 404){
                                    console.log(_colors2.default.red(`\n\n---------------------------------------------\n${rows.text}\n---------------------------------------------\n\n\n`));
                                    init();
                                }else{
                                    var table = new (0, _clitable2.default)({ head: ["Login","ID GitHUB","Nome","Compania","Localização","Email","Seguidores","Seguindo"]});
                                    for (let i = 0; i < _optionalChain([rows, 'optionalAccess', _29 => _29.length]); i++) {
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
                            console.log(_colors2.default.red(`\n\n---------------------------------------------\nObrigatorio ter ao min 1 letra, vamos tentar novamente\n---------------------------------------------\n\n\n`));
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
                if(_optionalChain([r, 'optionalAccess', _30 => _30.option, 'optionalAccess', _31 => _31.length]) > 0){
                    if(_optionalChain([r, 'optionalAccess', _32 => _32.option, 'optionalAccess', _33 => _33.toUpperCase, 'call', _34 => _34()]) == "SAIR"){
                        stage = 0;
                        return init();
                    }

                    Routes.deleteUser(r.option).then((del) => {
                        if(_optionalChain([del, 'optionalAccess', _35 => _35.code]) != 200){
                            console.log(_colors2.default.red(`\n\n---------------------------------------------\n${_optionalChain([del, 'optionalAccess', _36 => _36.text])}\n---------------------------------------------\n\n\n`));
                            init();
                        }else{
                            console.log(_colors2.default.green(`\n\n---------------------------------------------\n${_optionalChain([del, 'optionalAccess', _37 => _37.text])}\n---------------------------------------------\n\n\n`));
                            init();
                        }
                    });

                }else{
                    console.log(_colors2.default.red(`\n\n---------------------------------------------\nObrigatorio ter ao min 1 letra, vamos tentar novamente\n---------------------------------------------\n\n\n`));
                    init();
                }
            });
        break;
    
    }

} exports.init = init;

function terminal(type, name,msg, choice = false){
    if(choice){
        return _inquirer2.default.prompt([
        {
            type: type,
            name: name,
            message: msg,
            choices: choice,
        }
        ]);
    }else{
        return _inquirer2.default.prompt([
            {
                type: type,
                name: name,
                message: msg,
            }
            ]);
    }

}

