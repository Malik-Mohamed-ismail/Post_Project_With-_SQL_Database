require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const expressLayout = require('express-ejs-layouts');

// function creatTime() {
//     let d = new Date();
//     return  `${d.getFullYear()}-${d.getMonth() + 1 }-${d.getDay() + 1}`;
// }

// console.log(creatTime())

const app = express();

//Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(expressLayout);
app.use(cookieParser())
app.use(express.json())


//Engine
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')



app.use('/', require('./router/postRouter'))
app.use('/', require('./router/userRouter'))



app.listen(process.env.PORT, ()=>{
    console.log(`app Listening On Port ${process.env.PORT}`)
})