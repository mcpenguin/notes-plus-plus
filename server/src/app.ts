import express, {Request, Response, Application, NextFunction} from 'express';
import { router } from './routes/route1';

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000; 
const app:Application = express(); 

// cors
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});

app.use(express.static('../client/build'));
app.use(bodyParser.json());
app.use('/router',router)

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));
