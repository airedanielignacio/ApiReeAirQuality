import mongoose from 'mongoose';

class DataBase {

    private _cadenaConexion: string = `mongodb+srv://myair:air@cluster0.mms5n.mongodb.net/DatosCalidadAire?retryWrites=true&w=majority`
    private _cadenaConexion2:string= `mongodb+srv://aire:aire@cluster0.sentg.mongodb.net/test?retryWrites=true&w=majority`
    constructor(){

    }
    set cadenaConexion(_cadenaConexion: string){
        this._cadenaConexion = _cadenaConexion
    }

    conectarBD = async () => {
        const promise = new Promise<string>( async (resolve, reject) => {
            await mongoose.connect(this._cadenaConexion, {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useCreateIndex: true,   // Para que cree el índice único asociado al campo unique
                useFindAndModify: false  // para usar findOneAndDelete y findAndModify
            })
            .then( () => resolve(`Conectado a ${this._cadenaConexion}`) )
            .catch( (error) => reject(`Error conectando a ${this._cadenaConexion}: ${error}`) ) 
        })
        return promise

    }

    desconectarBD = async () => {

        const promise = new Promise<string>( async (resolve, reject) => {
            await mongoose.disconnect() 
            .then( () => resolve(`Desconectado de ${this._cadenaConexion}`) )
            .catch( (error) => reject(`Error desconectando de ${this._cadenaConexion}: ${error}`) )     
        })
        return promise
    }

    conectarBD2 = async () => {
        const promise = new Promise<string>( async (resolve, reject) => {
            await mongoose.connect(this._cadenaConexion2, {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useCreateIndex: true,   // Para que cree el índice único asociado al campo unique
                useFindAndModify: false  // para usar findOneAndDelete y findAndModify
            })
            .then( () => resolve(`Conectado a ${this._cadenaConexion2}`) )
            .catch( (error) => reject(`Error conectando a ${this._cadenaConexion2}: ${error}`) ) 
        })
        return promise

    }

    desconectarBD2 = async () => {

        const promise = new Promise<string>( async (resolve, reject) => {
            await mongoose.disconnect() 
            .then( () => resolve(`Desconectado de ${this._cadenaConexion2}`) )
            .catch( (error) => reject(`Error desconectando de ${this._cadenaConexion2}: ${error}`) )     
        })
        return promise
    }
}

export const db = new DataBase()


