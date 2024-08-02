// Importa el módulo 'express' y crea una instancia de la aplicación Express.
const  express = require ('express');
const app = express();

// Importa el módulo 'mongoose' para conectarse a MongoDB.
const mongoose = require('mongoose');

// Importa el módulo 'body-parser' para analizar los cuerpos de las solicitudes.
const bodyParser = require('body-parser');

// Configura Express para analizar JSON en los cuerpos de las solicitudes.
app.use(express.json());

// Conecta a la base de datos MongoDB en Atlas usando Mongoose.
mongoose.connect('mongodb+srv://jhonnathanpabon394:pJf0ye8x179XYSK4@cluster0.paisv4a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
}).then(() => {
    console.log('Conectado a la base de datos'); // Si la conexión es exitosa, muestra un mensaje en la consola.
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error); // Si ocurre un error al conectar, muestra el error en la consola.
});

// Define un array de objetos 'students' que simula una base de datos en memoria.
const students = [
    {id: 1, name: 'Jorge', age: 20, enroll: true},
    {id: 2, name: 'Mariana', age: 30, enroll: false},
    {id: 3, name: 'Antonio', age: 25, enroll: false},
];

// Configura una ruta para la raíz del servidor. Responde con un mensaje simple.
app.get('/', (req, res) => {
    res.send('Node JS api');
});

// Configura una ruta para obtener todos los estudiantes. Responde con el array 'students'.
app.get('/api/students', (req, res) => {
    res.send(students);
});

// Configura una ruta para obtener un estudiante específico por su ID. Responde con el estudiante encontrado o un mensaje de error si no se encuentra.
app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado')
    else res.send(student);
})

// Configura una ruta para agregar un nuevo estudiante. Crea un nuevo estudiante a partir de los datos del cuerpo de la solicitud y lo agrega al array 'students'.
app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1, // Genera un nuevo ID basado en el tamaño del array.
        name: req.body.name,
        age: parseInt(req.body.age), // Convierte la edad a un entero.
        enroll: (req.body.enroll === 'true') // Convierte el valor de inscripción a booleano.
    };

    students.push(student); // Agrega el nuevo estudiante al array.
    res.send(student); // Responde con el estudiante creado.
});

// Configura una ruta para eliminar un estudiante por su ID. Elimina el estudiante del array 'students' si se encuentra y responde con el estudiante eliminado o un mensaje de error si no se encuentra.
app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('estudiante no encontrado');

    const index = students.indexOf(student);
    students.splice(index, 1); // Elimina el estudiante del array.
    res.send(student);  // Responde con el estudiante eliminado.
});

// Configura el servidor para escuchar en un puerto determinado. Usa el puerto especificado en la variable de entorno o el puerto 80 por defecto.
const port = process.env.port || 80;
app.listen(port,() => console.log(`Escuchando en puerto ${port}...`));








