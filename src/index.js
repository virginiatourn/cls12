import express  from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import routesproduct from '/Users/virgi tourn/OneDrive/Escritorio/coder backend/clase 10/ruta/routesproduct';
import * as http from 'http';
import io from 'socket.io;'


const app = express();
const puerto = 5080;

const server = app.listen(puerto, () =>
  console.log('SERVER UP en puerto', puerto)
);

const publicFolderPath = path.resolve(__dirname, '../public');
app.use(express.static(publicFolderPath));

const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/index');
const partialsDirPath = path.resolve(__dirname, '../views/partials');


app.set('view engine', 'handlebars');
app.engine(
  'handlebars',
  handlebars({
    layoutDir: layoutFolderPath,
    defaultLayout: defaultLayerPth,
     partialsDir: partialsDirPath,
    })
);

const myServer = http.Server(app);
myServer.listen(puerto, () => console.log('SERVER UP en puerto', puerto));
const myWSServer = io(myServer);
const messages = [];

myWSServer.on('conecction', (socket) => {
    console.log('Cliente Conectado');
    console.log(`Cliente SID => ${socket.client.id}`);
    console.log(`SERVER SID ===> ${socket.id}`);

    socket.on('new-message',  (data) => {
        console.log('RECIBI UN MSJ NUEVO');
        console.log(data);
        messages.push(data);
        socket.emit('messages',messages);
       });
});

app.get('/', (req, res) => {
  res.render('main', { layout: 'index' });
});

app.use("./api/productos", routesproduct);



app.get('/', (req, res) => {
  
  res.sendFile (__dirname + './public/html.html');
}
);
