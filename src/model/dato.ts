import {Schema, model } from 'mongoose'

export class Dato{
    private _id: string
    private _co2: number
    private _no: number
    private _nh3: number
    private _co: number
    private _pm10: number
    private _pm25: number
    private _date: Date

    constructor(id:string, co2:number, no:number, nh3:number, co:number, pm10:number, pm25:number, date:Date){
        this._id=id
        this._co2=co2
        this._no=no
        this._nh3=nh3
        this._co=co
        this._pm10=pm10
        this._pm25=pm25
        this._date=date
    }
    
}

// Definimos el type

export type tDato = {
    _id: string
    _co2: number
    _no: number
    _nh3: number
    _co: number
    _pm10: number
    _pm25: number
    _date: Date

}

// Definimos el Schema
const datoSchema = new Schema({
    _id: String,
    _co2: Number,
    _no: Number,
    _nh3: Number,
    _co: Number,
    _pm10: Number,
    _pm25: Number,
    _date: Date
})

export const Datos = model('datos', datoSchema)
