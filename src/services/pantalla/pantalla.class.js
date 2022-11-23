const { Service } = require('feathers-memory');

exports.Pantalla = class Pantalla extends Service {
    async patch(id, data, params) {
        var alteracion = {id : id};
        console.log(data);
        alteracion[req.body.nombre] = data.valor;
        return alteracion;
    }
};
