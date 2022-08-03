const cards = document.getElementById("cards"); // obtenemos el elemento cards
const templateCard = document.getElementById("template-card").content; // obtenemos el template

const fragment = document.createDocumentFragment(); //memoria volatil que no genera reflow

document.addEventListener("DOMContentLoaded", () => {
  fechApi();
});

const fechApi = async () => {
  try {
    const response = await fetch("./api.json");
    const data = await response.json();
    dibujarCard(data);
  } catch (error) {
    console.log(error);
  }
};

const dibujarCard = (data) => {
  data.forEach((objeto)   => {
    templateCard.querySelector("h5").textContent = objeto.title; 
    templateCard.querySelector("p").textContent = objeto.precio;
    templateCard.querySelector("img").src = objeto.imagen;
    templateCard.querySelector(".btn-dark").dataset.id = objeto.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

cards.addEventListener("click", (e) => {
    // console.log(e, "click");
})


const setCarrito = (objeto) => {
    const producto = {
        id: objeto.querySelector(".btn-dark").dataset.id, // asignamos un nuevo id al producto
        title: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1,
    }

    if( carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1; // Carrito es toda la coleccion de objeto. accedemos solo al elemento que se esta repitiendo, una vez que entramos tomamos solo la cantidad y le sumamos uno. AUMENTAMOS LA CANTIDAD DEL OBJETO
        
    }
    carrito[producto.id] = {...producto}; // agregamos el objeto al carrito
    renderizarCarrito();
}



