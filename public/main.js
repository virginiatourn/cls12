const socket = io.connect();

function sendMsg (e) {
    let mensaje = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        imagen: document.getElementById('imagen').value,
    }
    socket.emit('new-message', mensaje);
}

function render(data) {
    var html = data
        .map(function (elem, index){
            return `<div>
                        <strong>${elem.nombre}</strong>
                        <em>${elem.precio}</em>
                        <em>${elem.imagen}</em>
                    </div>`;
        })
        .join (' ');

        document.getElementById('messages').innerHTML = html;
}

socket.on('messages',  (data) => {
    console.log('Recibi Mensaje');
 
    render(data);

});
