#!/bin/bash
whiptail --title "Instalação LovelyStay" --msgbox "Aperte ENTER para iniciar a instalação do Test LovelyStay" --fb 10 50
cp ./exemplo.env ./.env
yarn
whiptail --title "Vamos Iniciar a configuração do seu banco de dados" --msgbox "Aperte ENTER para continuar" --fb 10 50
    host=$(whiptail --title "Qual HOST do seu banco de dados?" --inputbox "Digite o HOST :" --fb 10 60 3>&1 1>&2 2>&3)
    port=$(whiptail --title "Qual PORTA do seu banco de dados?" --inputbox "Digite a PORTA :" --fb 10 60 3>&1 1>&2 2>&3)
    dbname=$(whiptail --title "Qual NOME deseja dar a sua base de dados?" --inputbox "Digite o nome da sua base de dados :" --fb 10 60 3>&1 1>&2 2>&3)
    user=$(whiptail --title "Qual o USUARIO do seu Banco de dados?" --inputbox "Digite o user :" --fb 10 60 3>&1 1>&2 2>&3)
    pass=$(whiptail --title "Qual a Senha do seu Banco de dados?" --inputbox "Digite a password:" --fb 10 60 3>&1 1>&2 2>&3)
    max=$(whiptail --title "Qual Maximo de conexão?" --inputbox "Digite o Max de conexao:" --fb 10 60 3>&1 1>&2 2>&3)
###### SALVO .ENV
echo 'HOST="'$host'"
PORT="'$port'"
DB="'$dbname'"
USER="'$user'"
PASS="'$pass'"
MAX='$max >> ./.env
#####

whiptail --title "Banco Configurado" --msgbox "Guardei todas as informações necessarias para a criação do seu banco de dados, Aperte ENTER para continuar" --fb 10 50
whiptail --title "Ambiente" --msgbox "Vamos agora configurar as variaveis que definem seu ambiente" --fb 10 50
AMB=$(whiptail --title "Voce esta usando ambiente produção ou local?" --inputbox "Digite PROD para produção e DEV para local: " --fb 10 60 3>&1 1>&2 2>&3)
portAlt==$(whiptail --title "Configuração da Porta Express Listen" --inputbox "Digite a porta que usará no listen do express: " --fb 10 60 3>&1 1>&2 2>&3)
###### SALVO .ENV
echo '
PORT_ALT="'$portAlt'"
AMB="'$AMB
>> ./.env
#####

echo "Instalação Concluida com Sucesso!"
echo ""
echo "----------------------------------------------------------------"
echo ""
echo "Cadastra novo usuario no banco [GET]: https://localhost/<USERNAME_GITHUB>"
echo ""
echo "----------------------------------------------------------------"

