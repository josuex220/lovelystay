#!/bin/bash
whiptail --title "Instalação LovelyStay" --msgbox "Aperte ENTER para iniciar a instalação do Test LovelyStay" --fb 10 70

yarn
yarn build
yarn buildInstall

whiptail --title "Vamos Iniciar a configuração do seu banco de dados" --msgbox "Aperte ENTER para continuar" --fb 10 70
    host=$(whiptail --title "Qual HOST do seu banco de dados?" --inputbox "Digite o HOST :" --fb 10 80 3>&1 1>&2 2>&3)
    port=$(whiptail --title "Qual PORTA do seu banco de dados?" --inputbox "Digite a PORTA :" --fb 10 60 3>&1 1>&2 2>&3)
    dbname=$(whiptail --title "Qual NOME deseja dar a sua base de dados?" --inputbox "Digite o nome da sua base de dados :" --fb 10 80 3>&1 1>&2 2>&3)
    user=$(whiptail --title "Qual o USUARIO do seu Banco de dados?" --inputbox "Digite o user :" --fb 10 60 3>&1 1>&2 2>&3)
    pass=$(whiptail --title "Qual a Senha do seu Banco de dados?" --inputbox "Digite a password:" --fb 10 80 3>&1 1>&2 2>&3)
    max=$(whiptail --title "Qual Maximo de conexão?" --inputbox "Digite o Max de conexao:" --fb 10 60 3>&1 1>&2 2>&3)
whiptail --title "Banco Configurado" --msgbox "Guardei todas as informações necessarias para a criação do seu banco de dados, Aperte ENTER para continuar" --fb 10 70
whiptail --title "Ambiente" --msgbox "Vamos agora configurar as variaveis que definem seu ambiente" --fb 10 70
    AMB=$(whiptail --title "Voce esta usando ambiente produção ou local?" --inputbox "Digite PROD para produção e DEV para local: " --fb 10 60 3>&1 1>&2 2>&3)
    portAlt=$(whiptail --title "Configuração da Porta Express Listen" --inputbox "Digite a porta que usará no listen do express: " --fb 10 60 3>&1 1>&2 2>&3)

###### SALVO .ENV

# echo 'HOST="'$host'"
# PORT='$port'
# DB="'$dbname'"
# USER="'$user'"
# PASS="'$pass'"
# MAX='$max'
# PORT_ALT='$portAlt'
# AMB="'$AMB'"' >> ./.env

############

yarn initInstall
echo "----------------------------------------------------------------"
echo "----------------------------------------------------------------"
echo "---------------Instalação Concluida com Sucesso!----------------"
echo "----------------------------------------------------------------"
echo "----------------------------------------------------------------"
echo "RECOMENDO EXCLUIR A PASTA INSTALL!!!!"
echo ""
echo "RECOMENDO EXCLUIR A PASTA INSTALL!!!!"
echo "----------------------------------------------------------------"
echo "----------------------------------------------------------------"
echo ""
echo "----------------------------[ROTAS]-----------------------------"
echo ""
echo "Cadastra novo usuario no banco [POST]: https://localhost:"$portAlt"/<USERNAME_GITHUB>"
echo "Consulta todos os usuario salvos no banco [GET]: https://localhost:"$portAlt"/users"
echo "Consulta usuario no banco [GET]: https://localhost:"$portAlt"/user/<USERNAME_GITHUB> OR <ID_GITHUB>"
echo "DELETA USUARIO DO BANCO [DELETE]: https://localhost:"$portAlt"/user/<USERNAME_GITHUB> OR <ID_GITHUB>"
echo "TODOS OS DETALHES DA API CONSTA NA COLLACTION CRIADA NO POSTMAN: https://www.postman.com/lunar-equinox-820031/workspace/lovelystay-test/collection/18839016-3acbdc7a-b5ab-477d-9865-93a201c5ee5d?action=share&creator=18839016"
echo ""
echo "----------------------------------------------------------------"

node ./build/index.js