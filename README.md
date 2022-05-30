<p align="center">
    <h1 align="center">Versão Josué Vidal</h1>
</p>

## Requisitos 
* PostgreSQL;
* Yarn
* Node >= 14+

## Recomendação
 *No Windows <strong>GIT BASH</strong>

# Instalação Rapida
<blockquote>
  <p>WINDOWS:</p>
</blockquote>
 <div class="highlight highlight-source-shell">
    <pre>
      # Iniciando Instalação
      $ cp exemple.env .env
      ## Se Estiver Usando Git Bash
      $ nano .env
      ## Caso contrario
      ##Abra o .env com notepad ou editor de sua preferencia
      ##Configure o arquivo .env
          HOST="localhost" //Host do postgres
          PORT=5432   //Porta do postgres
          DB="lovelystay" //Nome do Banco de dados (NECESSARIO NÃO EXISTIR)
          USER="postgres" //Usuario do Banco de dados
          PASS="123456"   //Senha do Postgres 
          MAX=30  // Max Connections
          PORT_ALT=3000 //Porta alternativa para o Node.js usar caso ambiente não seja produção
          AMB="DEV" // DEV => ambiente de desenvolvimento usa a porta alternativa e PROD => Usa process.env.PORT para setar a porta
      $ sh ./install-win.sh
      
      PS: Banco de dados e tabelas serão criadas automaticamente
   </pre>
  </div>


<blockquote>
  <p>LINUX:</p>
</blockquote>
<div class="highlight highlight-source-shell">
    <pre>
      # Iniciando Instalação
      $ sh ./install-linux.sh
      $ Seguir fluxo de instalação
      --------------------------------------
           ETAPA 1 CONFIGURAÇÃO DO BANCO
      --------------------------------------
      HOST:      //HOST do postgres
      PORTA:     //PORTA do postgres
      DBNAME:    //NOME DO BANCO DE DADOS do postgres (NECESSARIO NÃO EXISTIR)
      USER :     //Usuario Responsavel pelo banco de dados
      PASS :     // Senha do Usuario responsavel pelo banco de dados
      MAX  :     // Maximo de conexão
      PORT_ALT:  //Porta alternativa para o Node.js usar caso ambiente não seja produção
      AMB :      // DEV => ambiente de desenvolvimento usa a porta alternativa e PROD => Usa process.env.PORT para setar a porta
      
      
      PS: Banco de dados e tabelas serão criadas automaticamente
   </pre>
  </div>
  
## Rotas Importantes
* Cadastra novo usuario no banco [POST]: https://localhost:<_PORTA_>/<USERNAME_GITHUB> 
* Consulta todos os usuario salvos no banco [GET]: https://localhost:<_PORTA_>/users
* Consulta usuario no banco [GET]: https://localhost:<_PORTA_>/user/<USERNAME_GITHUB> OR <ID_GITHUB>
* DELETA USUARIO DO BANCO [DELETE]: https://localhost:<_PORTA_>/user/<USERNAME_GITHUB> OR <ID_GITHUB>
  
# LINKS IMPORTANTES
  <blockquote>
    ## COLLACTION POSTMAN
  <a href="https://www.postman.com/lunar-equinox-820031/workspace/lovelystay-test/collection/18839016-3acbdc7a-b5ab-477d-9865-93a201c5ee5d?action=share&creator=18839016" taget="_blank">AQUI</a>
  </blockquote>
  
 
 # APÓS FINALIZAÇÃO DA INSTALAÇÃO EXCLUIR OS ARQUIVOS .SH E AS PASTAS (INSTALL E BUILD-INSTALL)
