import express, {Router, Request, Response, Application, NextFunction}  from 'express'; 
import pool from "../dbConfig";
import bcrypt from 'bcrypt';

export const userRoute : Router = express.Router(); 

const MIN_PASS_LENGTH = 4;
const ROUNDS = 10; // for encryption

userRoute.get('/login', (req:Request,res:Response,next:NextFunction) =>{
    res.render('login');
});
userRoute.post('/login' , (req, res) => {
    let {username, password} = req.body
    pool.query(
        `SELECT * from users WHERE uid=$1`, [username],
        (err, result) => {
            if(err){
                throw err;
            }
            else{
                console.log(result.rows);
                if(result.rowCount > 0){
                    const user = result.rows[0];
                    bcrypt.compare(password,user['password'])
                    .then((auth) => {
                        if(auth){
                            res.send('Login sucess');
                        }
                        else{
                            res.send('Wrong username/password');
                        }
                    });
                }
                else{
                    res.send('Wrong username/password');
                }
            }
        }
    )
})

userRoute.get('/reg', (req:Request,res:Response,next:NextFunction) =>{
    res.render('reg');
});
userRoute.post('/reg', (req,res) =>{
    let {username, password , password2} = req.body
    let errors = [];
    if(password.length < MIN_PASS_LENGTH){
        errors.push(`Password should atleast be ${MIN_PASS_LENGTH} chars long`);
    }
    if(password != password2){
        errors.push("Passwords do not match");
    }
    if(errors.length > 0){
        res.render("reg", {errors : errors});
    }
    else{
        bcrypt.hash(password, ROUNDS)
        .then((hashedPassword) => {
            pool.query(
                `SELECT * FROM users 
                WHERE uid= $1`, [username], (err, result) =>{
                   if(err){
                       throw err;
                   }
                   else{
                       if(result.rowCount > 0){
                           errors.push("User alreay registered");
                           res.render("reg", {errors : errors});
                       }
                       else{
                           pool.query(
                               `INSERT INTO users (uid, password) VALUES ($1, $2) RETURNING id, password`
                           , [username,hashedPassword], (err, result) => {
                               if(err){
                                   throw err;
                               }
                               else{
                                   console.log(result.rows);
                                   res.redirect('/user/login')
                               }
                           })
                       }
                   }
               });
        })
    }
})


userRoute.get('/dashboard', (req:Request,res:Response,next:NextFunction) =>{
    res.render('dashboard', {user: "thaqib"});
});


