import { Schema, model } from 'mongoose'

const DatosDispositivosFijosSchema = new Schema({
    _id: String,
    _co2: Number,
    _no: Number,
    _nh3: Number,
    _co: Number,
    _pm10: Number,
    _pm25: Number,
    _date: Date
},{
    collection:'DatosDispositivosFijos'
})

const CoordenadasSchema=new Schema({
    _latitud: Number,
    _longitud: Number,
})

const DatosDispositivosPortablesSchema = new Schema({
    _id: String,
    _co2: Number,
    _no: Number,
    _nh3: Number,
    _coordenadas: CoordenadasSchema,
    _date: Date
},{
    collection:'DatosDispositivosPortables'
})



export const DatosDispositivosFijos = model('DatosDispositivosFijos', DatosDispositivosFijosSchema  )
export const DatosDispositivosPortables = model('DatosDispositivosPortables', DatosDispositivosPortablesSchema  )
