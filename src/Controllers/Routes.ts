import fetch from "node-fetch";
import * as UserModel from '../Models/UserModel';

export async function deleteUser(user){
        const rowCount = await UserModel.getUsers(false, user);
        if( rowCount?.length == 0){
            return {
                'code' : 404,
                'text'   : 'Usuario não encontrado'
            };
        }else{
            await UserModel.deleteUser(false, rowCount[0]?.id_github);
            return {
                'code':200,
                'text': 'Usuario deletado com sucesso'
            };
        }
}
export async function storeUser(user){ 
    const response = await fetch(`https://api.github.com/users/${user}`);
    const respApi = await response.json();

    if(!respApi?.id){
        return {
            'code' : 404,
            'text' : 'Usuario não encontrado no github'
        };
    }else{
        const rowCount = await UserModel.getUsers(false, respApi?.login , ['COUNT(*) as rowcount']);
        if( rowCount[0]?.rowcount == 0){
            UserModel.store(false,respApi);
            return {
                'code' : 200,
                'text'   : `O usuario ${respApi?.login} foi encontrado e salvo no banco de dados`
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
}
export async function getUser(us = false, type=0){
    var user =false;
    if(us){
        user = us;
    }
    
        const rowCount = await UserModel.getUsers(false, user, [], type);
        if( rowCount[0]?.length == 0){
            return {
                'code' : 404,
                'text'   : 'Usuario não encontrado'
            };
        }else{
            return rowCount;
        }
}


