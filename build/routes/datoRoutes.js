"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.datoRoutes = void 0;
const express_1 = require("express");
const dato_1 = require("../model/dato");
const database_1 = require("../database/database");
class DatoRoutes {
    constructor() {
        this.getFijo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let idv = "Spain";
            if (id == "GREECE" || id == "greece" || id == "Greece") {
                idv = "Greece";
            }
            else if (id == "BULGARIA" || id == "bulgaria" || id == "Bulgaria") {
                idv = "Bulgaria";
            }
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield dato_1.DatosDispositivosFijos.findOne({ ID: idv }).sort({ date: -1 });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getPortables = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield dato_1.DatosDispositivosPortables.find();
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getHistoricos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let { pais, anyo, mes, dia } = req.params;
            let fecha = "^" + anyo + "-" + mes + "-" + dia;
            let paisv = 12410;
            if (pais == "spain") {
                paisv = 8495;
            }
            else if (pais == "bulgaria") {
                paisv = 8084;
            }
            yield database_1.db.conectarBD2()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield dato_1.DatosHistoricos.aggregate([
                    {
                        $match: {
                            "data.idx": paisv,
                            "data.time.s": { $regex: fecha }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            mediaO3: { $avg: "$data.iaqi.o3.v" },
                            mediaNO2: { $avg: "$data.iaqi.no2.v" },
                            mediaPM10: { $avg: "$data.iaqi.pm10.v" }
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD2();
        });
        this.getHistoricos2 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let { contaminante, pais, anyo } = req.params;
            let fecha = "^" + anyo;
            let paisv = 12410;
            if (pais == "spain") {
                paisv = 8495;
            }
            else if (pais == "bulgaria") {
                paisv = 8084;
            }
            let c = "$data.iaqi." + contaminante + ".v";
            yield database_1.db.conectarBD2()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield dato_1.DatosHistoricos.aggregate([
                    {
                        $match: {
                            "data.idx": paisv,
                            "data.time.s": { $regex: fecha }
                        }
                    },
                    {
                        $group: {
                            _id: { $substr: ["$data.time.s", 0, 10] },
                            v: { $avg: c }
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD2();
        });
        this.getHistoricos3 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let { pais, anyo, mes } = req.params;
            let fecha = "^" + anyo + "-" + mes;
            let paisv = 12410;
            if (pais == "spain") {
                paisv = 8495;
            }
            else if (pais == "bulgaria") {
                paisv = 8084;
            }
            yield database_1.db.conectarBD2()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield dato_1.DatosHistoricos.aggregate([
                    {
                        $match: {
                            "data.idx": paisv,
                            "data.time.s": { $regex: fecha }
                        }
                    },
                    {
                        $group: {
                            _id: { $substr: ["$data.time.s", 0, 10] },
                            vpm10: { $avg: "$data.iaqi.pm10.v" },
                            vo3: { $avg: "$data.iaqi.o3.v" },
                            vno2: { $avg: "$data.iaqi.no2.v" }
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD2();
        });
        this.anyos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD2()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield dato_1.DatosHistoricos.aggregate([
                    {
                        $group: {
                            _id: { $substr: ["$data.time.s", 0, 3] },
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD2();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/fijo/:id', this.getFijo),
            this._router.get('/portable', this.getPortables),
            this._router.get('/historicos/:pais&:anyo&:mes&:dia', this.getHistoricos),
            this._router.get('/historicos2/:contaminante&:pais&:anyo', this.getHistoricos2),
            this._router.get('/historicos3/:pais&:anyo&:mes', this.getHistoricos3);
        this._router.get('/anyos', this.anyos);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.datoRoutes = obj.router;
