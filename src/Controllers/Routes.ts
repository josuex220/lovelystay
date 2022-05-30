import fetch from "node-fetch";
import * as UserModel from '../Models/UserModel';

export function err400(req,res){
    res.status(400);
    res.json({
        'code' : 400,
        "text" : "A rota que está tentando acessar não é permitida, você pode está verificando nossa collaction do postman para ver os Urls Validos Aqui: https://www.postman.com/lunar-equinox-820031/workspace/lovelystay-test/collection/18839016-3acbdc7a-b5ab-477d-9865-93a201c5ee5d?action=share&creator=18839016"
    })
}
export async function deleteUser(req,res){
    var user =false;
    if(req.params.user){
        user = req.params.user;
    }
        const rowCount = await UserModel.getUsers(true, user);
        if( rowCount[0]?.length == 0){
            res.status(208)
            res.json({
                'status' : 404,
                'text'   : 'Usuario não encontrado'
            });
        }else{
            await UserModel.deleteUser(true, user);
            res.status(200)
            res.json({
                'code':200,
                'text': 'Usuario deletado com sucesso'
            });
        }
}
export async function storeUser(req,res){
    var user  = req.params.user;
    
    const response = await fetch(`https://api.github.com/users/${user}`);
    const respApi = await response.json();

    if(!respApi?.id){
        res.status(404);
        res.json({
            'code' : 404,
            'text' : 'Usuario não encontrado no github'
        });
    }else{
        const rowCount = await UserModel.getUsers(false, respApi?.id , ['COUNT(*) as rowcount']);
        if( rowCount[0]?.rowcount == 0){
            UserModel.store(false,respApi);
        }else{
            res.status(208)
            res.json({
                'status' : 208,
                'text'   : 'Esse usuario já consta em nosso banco de dados'
            });
        }
        res.status(200)
        res.json({
            'status' : 200,
            'text'   : 'Usuario Salvo em banco de dados com sucesso'
        });
    }
}
export async function getUser(req,res){
    var user =false;
    if(req.params.user){
        user = req.params.user;
    }
        const rowCount = await UserModel.getUsers(true, user);
        if( rowCount[0]?.length == 0){
            res.status(208)
            res.json({
                'status' : 404,
                'text'   : 'Usuario não encontrado'
            });
        }else{
            res.status(200)
            res.json(rowCount);
        }
}


