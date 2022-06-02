import {db} from '../conexao';

const defaultTable = "users_github";
export async function deleteUser(debug=false,id_github:any = false){
    var sql = `DELETE FROM ${defaultTable} `;
    id_github = escapeHtml(id_github);
    if(id_github && id_github != 'false'){
        sql += `WHERE id_github='${id_github}'`;
    }else{
        return {'status' : 0};
    }

    var delet = await db.query(sql);
    return delet;
}
export async function store(debug=false, user:any = []){
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
     result = await db.any(sql, {'login': user?.login,
                                'id_github': user?.id,
                                'node_id': user?.node_id,
                                'avatar_url': user?.avatar_url,
                                'gravatar_id': user?.gravatar_id,
                                'url': user?.url,
                                'html_url': user?.html_url,
                                'followers_url': user?.followers_url,
                                'following_url': user?.following_url,
                                'gists_url': user?.gists_url,
                                'starred_url': user?.starred_url,
                                'subscriptions_url': user?.subscriptions_url,
                                'organizations_url': user?.organizations_url,
                                'repos_url': user?.repos_url,
                                'events_url': user?.events_url,
                                'received_events_url': user?.received_events_url,
                                'type': user?.type,
                                'site_admin': user?.site_admin ? 1 : 0,
                                'name': user?.name,
                                'company': user?.company,
                                'blog': user?.blog,
                                'location': user?.location,
                                'email': user?.email,
                                'hireable': user?.hireable,
                                'bio': user?.bio,
                                'twitter_username': user?.twitter_username,
                                'public_repos': user?.public_repos,
                                'public_gists': user?.public_gists,
                                'followers': user?.followers,
                                'following': user?.following,
                                'created_at': user?.created_at,
                                'updated_at': user?.updated_at,});
    return result;

}

export async function getUsers(debug=false,user_id_or_username:any = false, fields = [],location=0){
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
     result = await db.any(sql);
     if(/^[0-9]+$/.test(user_id_or_username)){
         result = result[0];
     }
    return result;
}

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