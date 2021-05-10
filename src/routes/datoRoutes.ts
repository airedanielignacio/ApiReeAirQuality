import {Request, Response, Router } from 'express'
import { DatosDispositivosFijos, DatosDispositivosPortables, DatosHistoricos } from '../model/dato'
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

    private getHistoricos = async (req: Request, res: Response) => {
        let {pais, anyo, mes, dia} = req.params
        let fecha= "^"+anyo+"-"+mes+"-"+dia
        let paisv = "Patra-2, Greece"
        if (pais=="spain"){
            paisv="Bermejales, Sevilla, Spain"
        } else if (pais=="bulgaria"){
            paisv="Druzhba, Sofia, Bulgaria (Дружба, Столична, Bulgaria)"
        }
        await db.conectarBD2()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query  = await DatosHistoricos.aggregate(
                [
                    {
                        $match: {
                            "data.city.name":paisv,
                            "data.time.s": {$regex: fecha}
                        }
                    },            
                    {
                        $group:
                        {
                            _id: null,
                            mediaO3: { $avg: "$data.iaqi.o3.v" },
                            mediaNO2: { $avg: "$data.iaqi.no2.v" },
                            mediaPM10: { $avg: "$data.iaqi.pm10.v" }
                        }
                    }
                ]
             )
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        db.desconectarBD2()
    }

    private getHistoricos2 = async (req: Request, res: Response) => {
        let {contaminante, pais, anyo} = req.params
        let fecha= "^"+anyo
        let paisv = "Patra-2, Greece"
        if (pais=="spain"){
            paisv="Bermejales, Sevilla, Spain"
        } else if (pais=="bulgaria"){
            paisv="Druzhba, Sofia, Bulgaria (Дружба, Столична, Bulgaria)"
        }
        let c = "$data.iaqi."+contaminante+".v"
        await db.conectarBD2()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query  = await DatosHistoricos.aggregate(
                [
                    {
                        $match: {
                            "data.city.name":paisv,
                            "data.time.s": {$regex: fecha}
                        }
                    },            
                    {
                        $group:
                        {
                            _id: {$substr: ["$data.time.s", 0, 10]},
                            v: { $avg: c }
                        }
                    }
                ]
             )
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        db.desconectarBD2()
    }
   
   

    misRutas(){
        this._router.get('/fijo/:id', this.getFijo),
        this._router.get('/portable', this.getPortables),
        this._router.get('/historicos/:pais&:anyo&:mes&:dia', this.getHistoricos),
        this._router.get('/historicos2/:contaminante&:pais&:anyo', this.getHistoricos2)
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const datoRoutes = obj.router
