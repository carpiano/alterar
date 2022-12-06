const { Service } = require('feathers-nedb');

const pantallas = [
    {
        "id": 1,
        "descripcion": "video de perfomer",
        "ancho": 42,
        "altura": 66,
        "sonido": false,
        "manipulable": false
      },
      {
        "id": 2,
        "descripcion": "video abstracto",
        "ancho": 42,
        "altura": 66,
        "sonido": true,
        "manipulable": true
      }
];
exports.Pantalla = class Pantalla extends Service {

    async find(params){
        return pantallas;
    }

    async get(id,params){
        var p = null;
        try {
            p = pantallas.find(el=> el.id=id);
        } catch (error) {
            console.log(error);
            return null;
        }
        return p;
    }


    async patch(id, data, params) {
        var alteracion = {id : id, valor: data.valor};
        return alteracion;
    }
};
