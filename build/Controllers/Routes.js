"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _nodefetch = require('node-fetch'); var _nodefetch2 = _interopRequireDefault(_nodefetch);
var _UserModel = require('../Models/UserModel'); var UserModel = _interopRequireWildcard(_UserModel);

 function err400(req,res){
    return res.status(400).json({
        'code' : 400,
        "text" : "A rota que está tentando acessar não é permitida, você pode está verificando nossa collaction do postman para ver os Urls Validos Aqui: https://www.postman.com/lunar-equinox-820031/workspace/lovelystay-test/collection/18839016-3acbdc7a-b5ab-477d-9865-93a201c5ee5d?action=share&creator=18839016"
    })
} exports.err400 = err400;
 async function deleteUser(req,res){
    var user =false;
    if(req.params.user){
        user = req.params.user;
    }
        const rowCount = await UserModel.getUsers(false, user);
        if( _optionalChain([rowCount, 'access', _ => _[0], 'optionalAccess', _2 => _2.length]) == 0){
            return res.status(404).json({
                'status' : 404,
                'text'   : 'Usuario não encontrado'
            });
        }else{
            await UserModel.deleteUser(false, _optionalChain([rowCount, 'access', _3 => _3[0], 'optionalAccess', _4 => _4.id_github]));
            return res.status(200).json({
                'code':200,
                'text': 'Usuario deletado com sucesso'
            });
        }
} exports.deleteUser = deleteUser;
 async function storeUser(req,res){
    var user  = req.params.user;
    
    const response = await _nodefetch2.default.call(void 0, `https://api.github.com/users/${user}`);
    const respApi = await response.json();

    if(!_optionalChain([respApi, 'optionalAccess', _5 => _5.id])){
        return res.status(404).json({
            'code' : 404,
            'text' : 'Usuario não encontrado no github'
        });
    }else{
        const rowCount = await UserModel.getUsers(false, _optionalChain([respApi, 'optionalAccess', _6 => _6.login]) , ['COUNT(*) as rowcount']);
        if( _optionalChain([rowCount, 'access', _7 => _7[0], 'optionalAccess', _8 => _8.rowcount]) == 0){
            UserModel.store(false,respApi);
        }else{
            return res.status(208).json({
                'status' : 208,
                'text'   : 'Esse usuario já consta em nosso banco de dados'
            });
        }
        return res.status(200).json({
            'status' : 200,
            'text'   : 'Usuario Salvo em banco de dados com sucesso'
        });
    }
} exports.storeUser = storeUser;
 async function getUser(req,res){
    var user =false;
    if(req.params.user){
        user = req.params.user;
    }
        const rowCount = await UserModel.getUsers(true, user);
        if( _optionalChain([rowCount, 'access', _9 => _9[0], 'optionalAccess', _10 => _10.length]) == 0){
            return res.status(404).json({
                'status' : 404,
                'text'   : 'Usuario não encontrado'
            });
        }else{
            return res.status(200).json(rowCount);
        }
} exports.getUser = getUser;


