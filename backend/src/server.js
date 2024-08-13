// Requerir los módulos
import express from 'express'
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv'
import cors from 'cors';

import { fileURLToPath } from 'url'
import { dirname } from 'path';

//IMPORTACIÓN DE RUTAS
import routerComisiones from './routers/comisiones_routes.js';
import routerLotes from './routers/lotes_routes.js'
import routerAdmin from './routers/administrador_routes.js'
import routerUsuarios from './routers/usuarios_routes.js'

const app = express()
//ES6 Modules que obtiene el nombre del directorio
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

app.set('port', process.env.port || 3000)
app.use(cors())

app.use(express.json())
app.use(express.static(__dirname))
app.use('/files', express.static(__dirname + "/files"))

app.use(fileUpload({createParentPath: true}))

app.use('/api', routerComisiones)
app.use('/api', routerLotes)
app.use('/api', routerAdmin)
app.use('/api', routerUsuarios)

//Si no encuentra la página envia un 404
app.use((req,res) => {res.status(404).send("Enpoint no encontrado - 404")})

export default app