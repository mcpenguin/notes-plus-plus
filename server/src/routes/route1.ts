import express, {Router, Request, Response, Application, NextFunction}  from 'express'; 
export const router : Router = express.Router(); 

router.get('/', (req:Request,res:Response,next:NextFunction) =>{
    res.status(200).send("hello");
});