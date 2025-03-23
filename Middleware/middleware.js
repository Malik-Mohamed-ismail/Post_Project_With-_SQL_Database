const jwt = require('jsonwebtoken')
const db = require('../database/db')



function requireAuth(req, res, next) {
    const token = req.cookies.jwt;
    if(token) {
        
        jwt.verify(token, 'Malik Mohamed' , async function(err, decodedToken)  {
            if(err) {
                console.log(err)
                res.redirect('/signIn');
            }else{
                console.log(decodedToken);
                next();
            }
        })
                
    }else{
        res.redirect('/signIn');
    }
}


//check current user
// function checkUser (req, res, next)  {
//     const token = req.cookies.jwt;
//     if(token) {
//         jwt.verify(token, 'Malik Mohamed' , (err, decodedToken) => {
//             if(err) {
//                 console.log(err)
//                 res.locals.user =  null;
//                 next();
//             }else{
//                 console.log(decodedToken);
//                 let sql = `SELECT * FROM posts_users WHERE id = '${decodedToken.id}';`;
//                 db.execute(sql, async function(err, rowData) {
//                     if(err) throw err;
//                     let [user,_] = await rowData;
//                     res.locals.user = await user;
//                     console.log(token);
//                     console.log(user);
//                 })
                
//                 next();
                
//             }
//         })
//     } else {
//         res.locals.user =  null;
//         next();
//     }

// }


module.exports = { requireAuth}
