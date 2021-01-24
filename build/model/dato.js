"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datos = exports.Dato = void 0;
const mongoose_1 = require("mongoose");
class Dato {
    constructor(id, co2, no, nh3, co, pm10, pm25, date) {
        this._id = id;
        this._co2 = co2;
        this._no = no;
        this._nh3 = nh3;
        this._co = co;
        this._pm10 = pm10;
        this._pm25 = pm25;
        this._date = date;
    }
}
exports.Dato = Dato;
// Definimos el Schema
const datoSchema = new mongoose_1.Schema({
    _id: String,
    _co2: Number,
    _no: Number,
    _nh3: Number,
    _co: Number,
    _pm10: Number,
    _pm25: Number,
    _date: Date
});
exports.Datos = mongoose_1.model('datos', datoSchema);
