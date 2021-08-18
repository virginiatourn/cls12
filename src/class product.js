export let productos = [
    { id: 1, title: "Pan", price: 200, thumbnail: 'foto' },
    { id: 2, title: "Queso", price: 400, thumbnail: 'url' },
    { id: 3, title: "Jamon", price: 300, thumbnail: 'fotoo'},
  ];
  
  export class Producto {
    constructor(title, price, id) {
      this.title = title;
      this.price = price;
      this.thumbnail = thumbnail;
      this.id = id;
    }
  
    leer(array) {
      return array;
    }
  
    escribir(array) {
      productos.push({
        id: productos.length + 1,
        title: array.title,
        price: array.price,
        thumbnail: array.thumbnail,
      });
    }
  
    eliminar(id) {
      productos.splice(id - 1, 1);
    }
  }