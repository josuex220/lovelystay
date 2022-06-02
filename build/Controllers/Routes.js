"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _nodefetch = require('node-fetch'); var _nodefetch2 = _interopRequireDefault(_nodefetch);
var _UserModel = require('../Models/UserModel'); var UserModel = _interopRequireWildcard(_UserModel);

 async function deleteUser(user){
        const rowCount = await UserModel.getUsers(false, user);
        if( _optionalChain([rowCount, 'optionalAccess', _ => _.length]) == 0){
            return {
                'code' : 404,
                'text'   : 'Usuario não encontrado'
            };
        }else{
            await UserModel.deleteUser(false, _optionalChain([rowCount, 'access', _2 => _2[0], 'optionalAccess', _3 => _3.id_github]));
            return {
                'code':200,
                'text': 'Usuario deletado com sucesso'
            };
        }
} exports.deleteUser = deleteUser;
 async function storeUser(user){ 
    const response = await _nodefetch2.default.call(void 0, `https://api.github.com/users/${user}`);
    const respApi = await response.json();

    if(!_optionalChain([respApi, 'optionalAccess', _4 => _4.id])){
        return {
            'code' : 404,
            'text' : 'Usuario não encontrado no github'
        };
    }else{
        const rowCount = await UserModel.getUsers(false, _optionalChain([respApi, 'optionalAccess', _5 => _5.login]) , ['COUNT(*) as rowcount']);
        if( _optionalChain([rowCount, 'access', _6 => _6[0], 'optionalAccess', _7 => _7.rowcount]) == 0){
            UserModel.store(false,respApi);
            return {
                'code' : 200,
                'text'   : `O usuario ${_optionalChain([respApi, 'optionalAccess', _8 => _8.login])} foi encontrado e salvo no banco de dados`
            };
        }else{
            return {
                'code' : 208,
                'text'   : 'Esse usuario já consta em nosso banco de dados'
            };
        }
        return {
            'code' : 200,
            'text'   : 'Usuario Salvo em banco de dados com sucesso'
        };
    }
} exports.storeUser = storeUser;
 async function getUser(us = false, type=0){
    var user =false;
    if(us){
        user = us;
    }
    
        const rowCount = await UserModel.getUsers(false, user, [], type);
        if( _optionalChain([rowCount, 'access', _9 => _9[0], 'optionalAccess', _10 => _10.length]) == 0){
            return {
                'code' : 404,
                'text'   : 'Usuario não encontrado'
            };
        }else{
            return rowCount;
        }
} exports.getUser = getUser;


