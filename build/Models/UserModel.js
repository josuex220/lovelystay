"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _conexao = require('../conexao');

const defaultTable = "users_github";
 async function deleteUser(debug=false,id_github = false){
    var sql = `DELETE FROM ${defaultTable} `;
    id_github = escapeHtml(id_github);
    if(id_github && id_github != 'false'){
        sql += `WHERE id_github='${id_github}'`;
    }else{
        return {'status' : 0};
    }

    var delet = await _conexao.db.query(sql);
    return delet;
} exports.deleteUser = deleteUser;
 async function store(debug=false, user = []){
    var sql = '';
    var set = `
    login,
    id_github,
    node_id,
    avatar_url,
    gravatar_id,
    url,
    html_url,
    followers_url,
    following_url,
    gists_url,
    starred_url,
    subscriptions_url,
    organizations_url,
    repos_url,
    events_url,
    received_events_url,
    type,
    site_admin,
    name,
    company,
    blog,
    location,
    email,
    hireable,
    bio,
    twitter_username,
    public_repos,
    public_gists,
    followers,
    following,
    created_at,
    updated_at`;

    var res = `
    $/login/,
    $/id_github/,
    $/node_id/,
    $/avatar_url/,
    $/gravatar_id/,
    $/url/,
    $/html_url/,
    $/followers_url/,
    $/following_url/,
    $/gists_url/,
    $/starred_url/,
    $/subscriptions_url/,
    $/organizations_url/,
    $/repos_url/,
    $/events_url/,
    $/received_events_url/,
    $/type/,
    $/site_admin/,
    $/name/,
    $/company/,
    $/blog/,
    $/location/,
    $/email/,
    $/hireable/,
    $/bio/,
    $/twitter_username/,
    $/public_repos/,
    $/public_gists/,
    $/followers/,
    $/following/,
    $/created_at/,
    $/updated_at/`;
   
    sql += `INSERT INTO ${defaultTable} (${set}) VALUES (${res})`;

    if(debug){
        console.log(sql);
    }

    var result = [];
     result = await _conexao.db.any(sql, {'login': _optionalChain([user, 'optionalAccess', _ => _.login]),
                                'id_github': _optionalChain([user, 'optionalAccess', _2 => _2.id]),
                                'node_id': _optionalChain([user, 'optionalAccess', _3 => _3.node_id]),
                                'avatar_url': _optionalChain([user, 'optionalAccess', _4 => _4.avatar_url]),
                                'gravatar_id': _optionalChain([user, 'optionalAccess', _5 => _5.gravatar_id]),
                                'url': _optionalChain([user, 'optionalAccess', _6 => _6.url]),
                                'html_url': _optionalChain([user, 'optionalAccess', _7 => _7.html_url]),
                                'followers_url': _optionalChain([user, 'optionalAccess', _8 => _8.followers_url]),
                                'following_url': _optionalChain([user, 'optionalAccess', _9 => _9.following_url]),
                                'gists_url': _optionalChain([user, 'optionalAccess', _10 => _10.gists_url]),
                                'starred_url': _optionalChain([user, 'optionalAccess', _11 => _11.starred_url]),
                                'subscriptions_url': _optionalChain([user, 'optionalAccess', _12 => _12.subscriptions_url]),
                                'organizations_url': _optionalChain([user, 'optionalAccess', _13 => _13.organizations_url]),
                                'repos_url': _optionalChain([user, 'optionalAccess', _14 => _14.repos_url]),
                                'events_url': _optionalChain([user, 'optionalAccess', _15 => _15.events_url]),
                                'received_events_url': _optionalChain([user, 'optionalAccess', _16 => _16.received_events_url]),
                                'type': _optionalChain([user, 'optionalAccess', _17 => _17.type]),
                                'site_admin': _optionalChain([user, 'optionalAccess', _18 => _18.site_admin]) ? 1 : 0,
                                'name': _optionalChain([user, 'optionalAccess', _19 => _19.name]),
                                'company': _optionalChain([user, 'optionalAccess', _20 => _20.company]),
                                'blog': _optionalChain([user, 'optionalAccess', _21 => _21.blog]),
                                'location': _optionalChain([user, 'optionalAccess', _22 => _22.location]),
                                'email': _optionalChain([user, 'optionalAccess', _23 => _23.email]),
                                'hireable': _optionalChain([user, 'optionalAccess', _24 => _24.hireable]),
                                'bio': _optionalChain([user, 'optionalAccess', _25 => _25.bio]),
                                'twitter_username': _optionalChain([user, 'optionalAccess', _26 => _26.twitter_username]),
                                'public_repos': _optionalChain([user, 'optionalAccess', _27 => _27.public_repos]),
                                'public_gists': _optionalChain([user, 'optionalAccess', _28 => _28.public_gists]),
                                'followers': _optionalChain([user, 'optionalAccess', _29 => _29.followers]),
                                'following': _optionalChain([user, 'optionalAccess', _30 => _30.following]),
                                'created_at': _optionalChain([user, 'optionalAccess', _31 => _31.created_at]),
                                'updated_at': _optionalChain([user, 'optionalAccess', _32 => _32.updated_at]),});
    return result;

} exports.store = store;

 async function getUsers(debug=false,user_id_or_username = false, fields = [],location=0){
    var field = "";
    var where = "";
    var sql = "";

    if(fields.length > 0){
        field = fields.join(', ');
    }else{
        field = "*";
    }
    
    user_id_or_username = escapeHtml(user_id_or_username);
    if(location == 0){
        if(user_id_or_username && user_id_or_username != 'false'){
            if(/^[0-9]+$/.test(user_id_or_username)){
                where = `WHERE id_github='${user_id_or_username}'`;
            }else{
                where = `WHERE login LIKE '%${user_id_or_username}%'`;
            }
            
        }
    }else if(location == 1){
            where  = `WHERE location LIKE '%${user_id_or_username}%'`;
    }

    sql = `SELECT ${field} FROM ${defaultTable} ${where}`;
    if(debug){
        console.log(sql);
    }

    var result = [];
     result = await _conexao.db.any(sql);
     if(/^[0-9]+$/.test(user_id_or_username)){
         result = result[0];
     }
    return result;
} exports.getUsers = getUsers;

  function escapeHtml (string) {
    var entityMap = {
        '&': '&',
        '<': '<',
        '>': '>',
        '"': '"',
        "'": "'",
        '/': '/',
        '`': '`',
        '=': '='
      };
      
      var replaced = String(string).replace("'", '');
      replaced = String(replaced).replace("&", '');
      replaced = String(replaced).replace("<", '');
      replaced = String(replaced).replace(">", '');
      replaced = String(replaced).replace('"', '');
      replaced = String(replaced).replace('/', '');
      replaced = String(replaced).replace('=', '');

      return replaced;
  }