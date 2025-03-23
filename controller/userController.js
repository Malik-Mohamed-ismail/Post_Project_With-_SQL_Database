const db  = require('../database/db')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Creat The Token
const createToken = (id) => {
    return jwt.sign({id}, 'Malik Mohamed', {expiresIn: 3*24*60*60})
}



//SINGIN
exports.signIn_get = async function(req, res) {
    
    res.status(200).render('singin');
}

exports.signIn_post = async function(req, res, next) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({err: 'Fill All the Filed'})
    }

    // Check Email In Database
    let sql = `SELECT * FROM posts_users WHERE email = '${email}';`;
    db.execute(sql, async(err, result) => {
        if(err) throw err;
        if(result.length ==  0) {
            return res.status(400).json({err: 'Email Not Register'})
        }
      
    })


    // Check Password In Database
    let sql2 = `SELECT * FROM posts_users WHERE email = '${email}';`;
    db.execute(sql, async(err, result) => {
        if(err) throw err;
        let [minResult,_] = result;

        const match = await bcrypt.compare(password, minResult.password)

        if(!match){
            return res.status(400).json({err: 'Password Not Match'})
        }

        let token = createToken(minResult.id)
        res.cookie('jwt', token, {httpOnly:true, maxAge: 1000 * 60 * 60 * 24 })
        res.status(201).json( { name: minResult.username, token } )
    })
}



//SINGUP
exports.singUp_get = async function(req, res) {
    res.status(200).render('singup');
}


exports.singUp_post = async function(req, res) {
    const { username, email, password } = req.body;

    if(!username ||!email ||!password) {
        return res.status(400).json({err: 'Fill All the Filed'})
    }

    if(!validator.isEmail(email)) {
        return res.status(400).json({err: 'Email is Not Valid'})
    }

    // Check Email In Database
    let sql = `SELECT * FROM posts_users WHERE email = '${email}';`;
    db.execute(sql, async(err, result) => {
        // if(err) throw err;
        if(result.length > 0) {
            return res.status(400).json({err: 'Email Register In Database'})
        }
    })

    if(!validator.isStrongPassword(password)) {
        return res.status(400).json({err: 'Password is Not Strong'})
    }

    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);

    // Insert into database
    let sql2 = `INSERT INTO posts_users( username, email, password )
    VALUE('${username}', '${email}', '${hashPassword}');`;

    db.execute(sql2, (err, result) => {
        if(err) throw err;
        let minId = result.insertId;
        let sql = `SELECT * FROM posts_users WHERE id = '${minId}';`;
        db.execute(sql, (err, rows)=>{
            if(err) throw err;
            let [minRows,_] = rows;
            let token = createToken(minRows.id)
            res.cookie('jwt', token, { httpOnly:true, maxAge: 1000 * 60 * 60 * 24 })
            res.status(201).json({message: 'User Created', name: minRows.username, token })
        })
        
    })
}


exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/signIn')
}


// const db = require('../database/db')
// const validator = require('validator')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// //Creat The Token
// const createToken = (id) => {
//     return jwt.sign({id}, 'Malik Mohamed', {expiresIn: 3*24*60*60})
// }



// // Singin Page
// // //SINGIN
// exports.signIn_get = async function(req, res) {
//     res.status(200).render('singin');
// }
// exports.signIn_post  = async(req, res) => {
//     const { email, password } = req.body;

//     if(!email || !password) {
//         return res.status(400).json({err: 'Fill All the Filed'})
//     }

//     // Check Email In Database
//     let sql = `SELECT * FROM users WHERE email = '${email}';`;
//     db.execute(sql, async(err, result) => {
//         // if(err) throw err;
//         if(result.length ==  0) {
//             return res.status(400).json({err: 'Email Not Register'})
//         }
//     })

//     // Check Password In Database
//     let sql2 = `SELECT * FROM users WHERE email = '${email}';`;
//     db.execute(sql, async(err, result) => {

//         let [minResult,_] = result;

//         const match = await bcrypt.compare(password, minResult.password)

//         if(!match){
//             return res.status(400).json({err: 'Password Not Match'})
//         }

//         let token = createToken(minResult.id)
//         res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24})
//         res.status(201).json( {name:minResult.full_name, token} )
//     })
// }






// // SingUp page
// exports.singUp_get = (req, res) =>{
//         res.status(200).render('singup')
// }

// exports.singUp_post = async(req,res) => {
//     const { full_name, email, password } = req.body;

//     if( !full_name || !email || !password ) {
//         return res.status(400).json({err: 'Fill All the Filed'})
//     }

//     if(!validator.isEmail(email)) {
//         return res.status(400).json({err: 'Email is Not Valid'})
//     }

//     // Check Email In Database
//     let sql = `SELECT * FROM users WHERE email = '${email}';`;
//     db.execute(sql, async(err, result) => {
//         // if(err) throw err;
//         if(result.length > 0) {
//             return res.status(400).json({err: 'Email Orady In use'})
//         }
//     })

//     if(!validator.isStrongPassword(password)) {
//         return res.status(400).json({err: 'Password is Not Strong'})
//     }

//     let salt = await bcrypt.genSalt(10);
//     let hashPassword = await bcrypt.hash(password, salt);

//     // Insert into database
//     let sql2 = `INSERT INTO users(full_name, email, password)
//     VALUE('${full_name}', '${email}', '${hashPassword}');`;

//     db.execute(sql2, (err, result) => {
//         if(err) throw err;
//         let minId = result.insertId;
//         let sql = `SELECT * FROM users WHERE id = '${minId}';`;
//         pool.execute(sql, (err, rows)=>{
//             if(err) throw err;
//             let [minRows,_] = rows;
//             let token = createToken(minRows.id)
//             res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24})
//             res.status(201).json({message: 'User Created', name: minRows.full_name, token })
//         })
        
//     })
// }