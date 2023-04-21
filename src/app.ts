import express from "express";
import morgan from "morgan";
import cors from "cors"
import usersRoutes from './routes/users.routes'
import listsRoutes from './routes/list.routes'
import productsRoutes from './routes/product.routes'
import admin from 'firebase-admin'
import * as serviceAccount from './comprasapp.json';
import { ServiceAccount } from 'firebase-admin';

// initializations
const app = express();

//configs
app.set('port', process.env.PORT || 3000)

//firebase-admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });


//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api', usersRoutes)
app.use('/api', listsRoutes)
app.use('/api', productsRoutes)

//routes
app.get('/', (_req, res)=>{
    res.send(`THE API IS RUNNING ON PORT ${app.get('port')}`)
})

export default app;