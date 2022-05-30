#!/bin/bash

echo "----------------------------------------------------------------"
echo "----------------------------------------------------------------"
echo "----------------------------------------------------------------"
echo "----------------------INICIANDO INSTALAÇÃO----------------------"
echo "----------------------------------------------------------------"
echo "----------------------------------------------------------------"
yarn
echo "----------------------------------------------------------------"
echo "-------------------------CRIANDO BUILD--------------------------"
echo "----------------------------------------------------------------"
yarn build
echo "----------------------------------------------------------------"
echo "------------------CRIANDO BUILD DO INSTALL----------------------"
echo "----------------------------------------------------------------"
yarn buildInstall

echo "----------------------------------------------------------------"
echo "-----------------CONFIGURANDO BANCO DE DADOS--------------------"
echo "----------------------------------------------------------------"
yarn initInstall
echo "----------------------------------------------------------------"
echo "---------------Instalação Concluida com Sucesso!----------------"
echo "----------------------------------------------------------------"
echo "RECOMENDO EXCLUIR A PASTA BUILD-INSTALL!!!!"
echo "----------------------------------------------------------------"
echo ""
echo "----------------------------[ROTAS]-----------------------------"
echo ""
echo "Cadastra novo usuario no banco [POST]: https://localhost:<PORT>/<USERNAME_GITHUB>"
echo "Consulta todos os usuario salvos no banco [GET]: https://localhost:<PORT>/users"
echo "Consulta usuario no banco [GET]: https://localhost:<PORT>/user/<USERNAME_GITHUB> OR <ID_GITHUB>"
echo "DELETA USUARIO DO BANCO [DELETE]: https://localhost:<PORT>/user/<USERNAME_GITHUB> OR <ID_GITHUB>"
echo "TODOS OS DETALHES DA API CONSTA NA COLLACTION CRIADA NO POSTMAN: https://www.postman.com/lunar-equinox-820031/workspace/lovelystay-test/collection/18839016-3acbdc7a-b5ab-477d-9865-93a201c5ee5d?action=share&creator=18839016"
echo ""
echo "-------------------------INICIANDO SERVIÇO------------------------------"

node ./build/index.js