import {Request, Response, Router } from 'express'
import { DatosDispositivosFijos, DatosDispositivosPortables } from '../model/dato'
import { db } from '../database/database'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getFijo = async (req: Request, res: Response) => {
        let {id}=req.params
        let idv="Spain"
        if (id=="GREECE"||id=="greece"||id=="Greece"){
            idv="Greece"
        } else if (id=="BULGARIA"||id=="bulgaria"||id=="Bulgaria"){
            idv="Bulgaria"
        }
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query  = await DatosDispositivosFijos.findOne({ID:idv}).sort({date:-1})
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }

    private getPortables = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query  = await DatosDispositivosPortables.find()
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }
   

    misRutas(){
        this._router.get('/fijo/:id', this.getFijo),
        this._router.get('/portable', this.getPortables)
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const datoRoutes = obj.router
