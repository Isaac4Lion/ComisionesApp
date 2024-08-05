import app from './server.js'

// Importar la función connection()
import connection from './database.js';

// Función connection()
connection()

app.listen(app.get('port'),()=>{
    console.log(`Server ok on port: ${app.get('port')}`);
})

