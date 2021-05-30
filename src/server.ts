import express from 'express'
import morgan from 'morgan'

import { datoRoutes } from './routes/datoRoutes'

class Server {
    private app: express.Application
    constructor(){
        this.app = express()
        this.config()
        this.routes()
    }
    private async config(){

        this.app.set('port', process.env.PORT || 3000)

        this.app.use(express.json()) // para que nuestro servidor entienda
        // los formatos json desde clientes
        this.app.use(morgan('dev'))  // Para que muestre las url invocadas

        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            next();
        });

    }

    private routes(){
        this.app.use('/', datoRoutes)
    }
    start(){
        this.app.listen(this.app.get('port'), 
        () => {
            console.log(`Server on port: ${this.app.get('port')}`)
        })
    }
}

const server = new Server()
server.start()
