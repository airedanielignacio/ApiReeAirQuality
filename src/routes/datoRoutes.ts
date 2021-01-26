import {Request, Response, Router } from 'express'
import { DatosDispositivosFijos } from '../model/dato'
import { db } from '../database/database'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getSpain = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query  = await DatosDispositivosFijos.findOne({ID:"Spain"}).sort({date:-1})
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }

    private getGreece = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query  = await DatosDispositivosFijos.findOne({ID:"Greece"}).sort({date:-1})
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }
  
    private getBulgaria = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query  = await DatosDispositivosFijos.findOne({ID:"Bulgaria"}).sort({date:-1})
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }
   

    misRutas(){
        this._router.get('/spain', this.getSpain),
        this._router.get('/greece', this.getGreece),
        this._router.get('/bulgary', this.getBulgaria)
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const datoRoutes = obj.router
