const db = require('../database/db');
const jwt = require('jsonwebtoken')


exports.viwHome = async (req, res) => {
    // let sql = `SELECT * FROM posts ORDER BY id DESC;`;
    let sql = `SELECT * FROM posts limit 3;`;
    db.execute(sql,  function(err, DataRow) {
        if(err) throw err;
        if(!DataRow) {
            return res.status(200).json({error: 'There No Posts Right No'});
        }

        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, 'Malik Mohamed' , (err, decodedToken) => {
                if(err) {
                    next();
                }else{
                    let sql = `SELECT * FROM posts_users WHERE id = '${decodedToken.id}';`;
                    db.execute(sql, async function(err, rowData) {
                        if(err) throw err;
                        let [user,_] = await rowData;
                        // console.log(user);
                        res.status(200).render('index', {DataRow, user});
                    })
                    
                }
                
            })
        }

        // res.status(200).render('index', {DataRow});
        // console.log(post)
    })
   
}


//Find Post By ID
exports.findPostById = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM posts WHERE id = ${id};`;
    db.execute(sql, function(err, DataRow) {
        if(err) throw err;
        const [post,_] = DataRow
        if(!post) {
            return res.status(200).json({error: 'There No Posts Right No'});
        }

        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, 'Malik Mohamed' , (err, decodedToken) => {
                if(err) {
                    next();
                }else{
                    let sql = `SELECT * FROM posts_users WHERE id = '${decodedToken.id}';`;
                    db.execute(sql, async function(err, rowData) {
                        if(err) throw err;
                        let [user,_] = await rowData;
                        // console.log(user);
                        res.status(200).render('post', {post, user});
                    })
                    
                }
                
            })
        }

        // res.status(200).render('post' , {post})
    })
    
}

exports.viwAll = (req, res) => {
    let sql = `SELECT * FROM posts;`;
    db.execute(sql,  function(err, DataRow) {
        if(err) throw err;
        if(!DataRow) {
            return res.status(200).json({error: 'There No Posts Right No'});
        }

        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, 'Malik Mohamed' , (err, decodedToken) => {
                if(err) {
                    next();
                }else{
                    let sql = `SELECT * FROM posts_users WHERE id = '${decodedToken.id}';`;
                    db.execute(sql, async function(err, rowData) {
                        if(err) throw err;
                        let [user,_] = await rowData;
                        // console.log(user);
                        res.status(200).render('viwAllPosts', {DataRow, user});
                    })
                    
                }
                
            })
        }

        // res.status(200).render('viwAllPosts', {DataRow});
        
    })
}

exports.searchPost = async (req, res) => {
    const { search } = req.body;
    let sql = `SELECT * FROM posts WHERE title LIKE '%${search}%' OR body LIKE '%${search}%' ;`;
    db.execute(sql,  function(err, DataRow) {
        if(err) throw err;
        if(!DataRow) {
            return res.status(200).json({error: 'There No Posts Right No'});
        }

        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, 'Malik Mohamed' , (err, decodedToken) => {
                if(err) {
                    next();
                }else{
                    let sql = `SELECT * FROM posts_users WHERE id = '${decodedToken.id}';`;
                    db.execute(sql, async function(err, rowData) {
                        if(err) throw err;
                        let [user,_] = await rowData;
                        // console.log(user);
                        res.status(200).render('viwAllPosts', {DataRow, user});
                    })
                    
                }
                
            })
        }

        // res.status(200).render('viwAllPosts', {DataRow});
        // console.log(DataRow)
    })
}




exports.viwAdmin = async function(req, res, next)  {
    let sql = `SELECT * FROM posts ORDER BY id DESC;`;
    db.execute(sql,  function(err, DataRow) {
        if(err) throw err;
        if(!DataRow) {
            return res.status(200).json({error: 'There No Posts Right No'});
        }
        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, 'Malik Mohamed' , (err, decodedToken) => {
                if(err) {
                    next();
                }else{
                    let sql = `SELECT * FROM posts_users WHERE id = '${decodedToken.id}';`;
                    db.execute(sql, async function(err, rowData) {
                        if(err) throw err;
                        let [user,_] = await rowData;
                        // console.log(user);
                        res.status(200).render('admin', {DataRow, user});
                    })
                    
                }
                
            })
        }
        
        
    })
}

exports.adminSearchPost = async (req, res) => {
    const {search} = req.body;
    let sql = `SELECT * FROM posts WHERE title LIKE '%${search}%';`;
    db.execute(sql,  function(err, DataRow) {
        if(err) throw err;
        if(!DataRow) {
            return res.status(200).json({error: 'There No Posts Right No'});
        }

        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, 'Malik Mohamed' , (err, decodedToken) => {
                if(err) {
                    next();
                }else{
                    let sql = `SELECT * FROM posts_users WHERE id = '${decodedToken.id}';`;
                    db.execute(sql, async function(err, rowData) {
                        if(err) throw err;
                        let [user,_] = await rowData;
                        // console.log(user);
                        res.status(200).render('admin', {DataRow, user});
                    }) 
                } 
            })
        }

        
    })
}


exports.viwAdminPost = async function(req, res) {
    const { id } = req.params;
    let sql = `SELECT * FROM posts WHERE id = ${id};`;
    db.execute(sql, function(err, DataRow) {
        if(err) throw err;
        const [post,_] = DataRow
        if(!post) {
            return res.status(200).json({error: 'There No Posts Right No'});
        }

        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, 'Malik Mohamed' , (err, decodedToken) => {
                if(err) {
                    next();
                }else{
                    let sql = `SELECT * FROM posts_users WHERE id = '${decodedToken.id}';`;
                    db.execute(sql, async function(err, rowData) {
                        if(err) throw err;
                        let [user,_] = await rowData;
                        // console.log(user);
                        res.status(200).render('adminViewPost', {post, user});
                    })
                    
                }
                
            })
        }

        // res.status(200).render('adminViewPost' , {post})
    })
}

function creatTime() {
    let d = new Date();
    return  `${d.getFullYear()}-${d.getMonth() + 1 }-${d.getDay() + 1}`;
}

exports.adminAddPost_get = function(req, res, next) {
    const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, 'Malik Mohamed' , (err, decodedToken) => {
                if(err) {
                    next();
                }else{
                    let sql = `SELECT * FROM posts_users WHERE id = '${decodedToken.id}';`;
                    db.execute(sql, async function(err, rowData) {
                        if(err) throw err;
                        let [user,_] = await rowData;
                        // console.log(user);
                        res.status(200).render('adminAddPost', { user});
                    })
                    
                }
                
            })
        }

    // res.status(200).render('adminAddPost', {user})
}

exports.adminAddPost_post = async function(req, res) {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({err: 'Fill All the Filed'})
    }
    
    let sql = `INSERT INTO posts(title, body, creatAt, uptateAt)
    VALUE('${title}', '${body}', '${creatTime()}','${creatTime()}');`;

    db.execute(sql, function(err, dataRow) {
        if(err) throw err;
        let minId = dataRow.insertId;
        let sql = `SELECT * FROM posts WHERE id = '${minId}';`;
        db.execute(sql, (err, rows)=>{
            if(err) throw err;
            let [minRows,_] = rows;

            res.status(201).json({Massage: 'Post Inserted', minRows })
        })
    })

}


exports.updateAdminPost_get = async function(req, res) {
    const { id } = req.params;
    let sql = `SELECT * FROM posts WHERE id = ${id};`;
    db.execute(sql, function(err, DataRow) {
        if(err) throw err;
        const [post,_] = DataRow
        if(!post) {
            return res.status(200).json({error: 'There No Posts Right No'});
        }

        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, 'Malik Mohamed' , (err, decodedToken) => {
                if(err) {
                    next();
                }else{
                    let sql = `SELECT * FROM posts_users WHERE id = '${decodedToken.id}';`;
                    db.execute(sql, async function(err, rowData) {
                        if(err) throw err;
                        let [user,_] = await rowData;
                        // console.log(user);
                        res.status(200).render('adminUpdatePost', {post, user});
                    })
                    
                }
                
            })
        }

        // res.status(200).render('adminUpdatePost' , {post})
    })
}




exports.updateAdminPost = async function(req, res) {
    const { title, body } = req.body;
    const { id } = req.params;

    if (!title || !body) {
        return res.status(400).json({err: 'Fill All the Filed'})
    }

    let sql = `UPDATE posts SET 
        title = '${title}',
        body  = '${body}',
        uptateAt = '${creatTime()}'
        WHERE id = ${id};`;
    db.execute(sql, function(err, dataRow) {
        if(err) throw err;
        res.status(201).json({Massage: 'Post Updated', dataRow })
    })    
}



exports.deleteAdminPost = async function(req, res) {
    const { id } = req.params;
    let sql = `DELETE  FROM posts WHERE id = ${id};`;
    db.execute(sql, function(err, dataRow) {
        if(err) throw err;
        res.status(200).json({Massage: 'Post Deleted', dataRow })
    })    

}








