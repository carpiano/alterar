const NeDB = require('@seald-io/nedb');
const path = require('path');

module.exports = function (app) {
    const dbPath = app.get('nedb');
    console.log('path a la base: ' + dbPath);
    const Model = new NeDB({
	filename: path.join(dbPath, 'pantalla.db'),
	autoload: true
    });
    
    return Model;
};
