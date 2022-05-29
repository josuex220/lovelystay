export function err400(req,res){
    res.status(400);
    res.json({
        'code' : 400,
        "text" : "A rota que está tentando acessar não é permitida"
    })
}


