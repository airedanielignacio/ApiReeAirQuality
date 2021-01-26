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



export const DatosDispositivosFijos = model('DatosDispositivosFijos', DatosDispositivosFijosSchema  )
