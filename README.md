<p align="center">
    <h1 align="center">Versão Josué Vidal</h1>
</p>

## Requisitos 
* PostgreSQL;
* Yarn
* Node >= 14+


# Instalação Rapida
<blockquote>
  <p>WINDOWS, Linux, MacOS:</p>
</blockquote>
 <div class="highlight highlight-source-shell">
    <pre>
      ## Se Estiver Usando Git Bash
      $ nano .env
      ## Caso contrario
      ##Abra o .env com notepad ou editor de sua preferencia
      ##Configure o arquivo .env
          HOST="localhost" //Host do postgres
          PORT=5432   //Porta do postgres
          DB="lovelystay" //Nome do Banco de dados (NECESSARIO NÃO EXISTIR, POIS SERÁ CRIADO NO MOMENTO DA INSTALAÇÃO)
          USER="postgres" //Usuario do Banco de dados
          PASS="123456"   //Senha do Postgres 
          MAX=30  // Max Connections
      $ sh ./install.sh
      
      PS: Banco de dados e tabelas serão criadas automaticamente
   </pre>
  </div>
# Iniciar
<blockquote>
  <p>WINDOWS, Linux, MacOS:</p>
</blockquote>
 <div class="highlight highlight-source-shell">
    <pre>
      $ sh ./init.sh
      OU
      $ cd /build
      $ node index.js
   </pre>
  </div>

 
  
 
 # APÓS FINALIZAÇÃO DA INSTALAÇÃO VOCÊ PODERÁ INICIAR O APP DENTRO DA PASTA BUILD COM $ node index.js OU EXECUTANDO O ARQUIVO init.sh
