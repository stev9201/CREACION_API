//IMPORTACION DE MONGOOSE:
//Aquí, estamos importando la biblioteca Mongoose. Mongoose es una herramienta de modelado de objetos para MongoDB en Node.js. Nos permite definir esquemas y modelos para interactuar con la base de datos MongoDB de manera más estructurada.
const mongoose = require('mongoose');

//Definición del Esquema (Schema):
//Creamos un nuevo esquema llamado PostSchema. El esquema define la estructura de los documentos que se almacenarán en la colección (tabla) relacionada con este esquema. En este caso, el esquema tiene tres campos: title: Un campo de tipo String que es obligatorio (require: true). description: Otro campo de tipo String también obligatorio. date: Un campo de tipo Date con un valor predeterminado (default) establecido en la fecha y hora actual (Date.now).
const PostSchema = mongoose.Schema({
 title: {
    type: String,
    require: true
 },
 description: {
    type: String,
    require: true
 },
 date: {
    type:Date,
    default: Date.now
 }
});

//Exportación del Modelo:
//Finalmente, exportamos el modelo creado a partir del esquema. El modelo se llama 'post' y se basa en el esquema PostSchema. Esto significa que cuando interactuemos con la colección de MongoDB relacionada con los posts, utilizaremos este modelo para crear, leer, actualizar o eliminar documentos.
module.exports = mongoose.model('post', PostSchema);