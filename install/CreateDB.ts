import {dbS} from './conexao';
import {db} from './conexao_completa';
const dotenv = require('dotenv').config({ path: __dirname+'/../.env' });
var sqlDb = [];
sqlDb.push(`
    CREATE DATABASE ${dotenv.parsed.DB} OWNER ${dotenv.parsed.USER} 
    ENCODING 'UTF8'
    TABLESPACE pg_default
`);
var Tables = [];
Tables.push(`
CREATE TABLE "public"."users_github" (
    "id" SERIAL NOT NULL,
    "login" varchar(255) COLLATE "pg_catalog"."default",
    "id_github" int4,
    "node_id" varchar(200) COLLATE "pg_catalog"."default",
    "avatar_url" varchar(255) COLLATE "pg_catalog"."default",
    "gravatar_id" varchar(100) COLLATE "pg_catalog"."default",
    "url" varchar(255) COLLATE "pg_catalog"."default",
    "html_url" varchar(255) COLLATE "pg_catalog"."default",
    "followers_url" varchar(255) COLLATE "pg_catalog"."default",
    "following_url" varchar(255) COLLATE "pg_catalog"."default",
    "gists_url" varchar(255) COLLATE "pg_catalog"."default",
    "starred_url" varchar(255) COLLATE "pg_catalog"."default",
    "subscriptions_url" varchar(255) COLLATE "pg_catalog"."default",
    "organizations_url" varchar(255) COLLATE "pg_catalog"."default",
    "repos_url" varchar(255) COLLATE "pg_catalog"."default",
    "events_url" varchar(255) COLLATE "pg_catalog"."default",
    "received_events_url" varchar(255) COLLATE "pg_catalog"."default",
    "type" varchar(50) COLLATE "pg_catalog"."default",
    "site_admin" int2,
    "name" varchar(255) COLLATE "pg_catalog"."default",
    "company" varchar(255) COLLATE "pg_catalog"."default",
    "blog" varchar(255) COLLATE "pg_catalog"."default",
    "location" varchar(100) COLLATE "pg_catalog"."default",
    "email" varchar(150) COLLATE "pg_catalog"."default",
    "hireable" varchar(255) COLLATE "pg_catalog"."default",
    "bio" text COLLATE "pg_catalog"."default",
    "twitter_username" varchar(50) COLLATE "pg_catalog"."default",
    "public_repos" int4,
    "public_gists" int4,
    "followers" int4,
    "following" int4,
    "created_at" varchar(50) COLLATE "pg_catalog"."default",
    "updated_at" varchar(50) COLLATE "pg_catalog"."default",
    "json_ext" json,
    CONSTRAINT "users_github_pkey" PRIMARY KEY ("id")
  );
  
  ALTER TABLE "public"."users_github" 
    OWNER TO ${dotenv.parsed.USER};
`);

for (let i = 0; i < sqlDb.length; i++) {
    dbS.query(sqlDb[i]).then((result)=>{
        //Após Criado o Banco Vamos Criar a tabela.
        setTimeout(function(){
            for (let t = 0; t < Tables.length; t++) {
                db.query(Tables[t]).then((resp)=>{
                    console.log("Seu Banco de dados está pronto para ser usado");
                    process.exit();
                });
            }
        },1000);
    });
}