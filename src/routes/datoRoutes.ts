import {Request, Response, Router } from 'express'
import { Datos, Dato, tDato } from '../model/dato'
import { db } from '../database/database'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getDatos = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query = await Datos.findOne({ID:"Spain"}).sort({date:-1})
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }
  

   

    misRutas(){
        this._router.get('/', this.getDatos)
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const datoRoutes = obj.router
