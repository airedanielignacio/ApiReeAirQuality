"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatosDispositivosFijos = void 0;
const mongoose_1 = require("mongoose");
const DatosDispositivosFijosSchema = new mongoose_1.Schema({
    _id: String,
    _co2: Number,
    _no: Number,
    _nh3: Number,
    _co: Number,
    _pm10: Number,
    _pm25: Number,
    _date: Date
}, {
    collection: 'DatosDispositivosFijos'
});
exports.DatosDispositivosFijos = mongoose_1.model('DatosDispositivosFijos', DatosDispositivosFijosSchema);
