
import express from "express"
import productos from '/Users/virgi tourn/OneDrive/Escritorio/coder backend/clase 10/src/class productos';
const router = express.Router();

router.get('/listar', (req, res) => {
  if (productos.length === []) {
    return res.status(404).render('Error');
  }
  res.render('listar', { productos });
});

router.get('/listar/:id', (req, res) => {
  const idSearch = req.params.id;
  const producto = productos.find((idProd) => idProd.id === idSearch);

  if (!producto) {
    return res.status(404).json({
      Error: 'Producto no encontrado',
    });
  }
  res.json({
    data: producto,
  });
});
router.get('/guardar', (req, res) => {
  res.render('ingresar');
});

router.post('/guardar', (req, res) => {
  const body = req.body;
  console.log(JSON.stringify(body));

  if (body == undefined) {
    return res.status(400).json({
      Error: 'Producto no encontrado',
    });
  }

  const newProduct = {
    title: body.title,
    thumbnail: body.thumbnail,
    price: body.price,
    id: productos.length + 1,
  };

  productos.push(newProduct);

  res.status(201).json({
    mensaje: 'Producto agregado',
    data: newProduct,
  });
});

router.put('/actualizar/:id', (req, res) => {
  const idActualizar = parseInt(req.params.id);
  const body = req.body;
  const idProductos = productos.findIndex((index) => index.id === idActualizar);

  if (idProductos !== -1) {
    productos.splice(idProductos, 1, body);
  } else {
    return res.status(400).json({
      Error: 'El ID no existe',
      idActualizar,
    });
  }
  res.status(201).json({
    mensaje: 'Producto actualizado',
    data: body,
    productos,
  });
});

router.delete('/borrar/:id', (req, res) => {
  const idBorrar = parseInt (req.params.id);
  const idProductos = productos.findIndex((index) => index.id === idBorrar);

  if (idProductos !== -1) {
    productos.splice(idProductos, 1);
  } else {
    return res.status(400).json({
      Error: 'El ID no existe',
      idBorrar,
    });
  }
  res.status(201).json({
    mensaje: 'Se borro el producto',
    data: productos,
  });
});

export default router;
