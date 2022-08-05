const cards = document.getElementById("cards"); // obtenemos el elemento cards
const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content; // obtenemos el template
const templateCarrito = document.getElementById("template-carrito").content;

const fragment = document.createDocumentFragment(); //memoria volatil que no genera reflow
let carrito = {}

document.addEventListener("DOMContentLoaded", () => {
  fechApi();
  
  if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
    renderizarCarrito();
  }
});
 items.addEventListener("click", (e) => {
  btnAccion(e)
  } );

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
agregarCarrito(e);
 btnAccion(e)
})

const agregarCarrito = (e) => {
  // console.log(e.target.classList.contains("btn-dark"));
  if(e.target.classList.contains("btn-dark")) {
    e.target.parentElement;
    // console.log(e.target.parentElement);
    setCarrito(e.target.parentElement);
  }
    e.stopPropagation();// para que no se ejecute el evento padre.
}


const setCarrito = (objeto) => {
    const producto = {
        id: objeto.querySelector(".btn-dark").dataset.id, // asignamos un nuevo id al producto
        title: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1,
    }

    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1; // Carrito es toda la coleccion de objeto. accedemos solo al elemento que se esta repitiendo, una vez que entramos tomamos solo la cantidad y le sumamos uno. AUMENTAMOS LA CANTIDAD DEL OBJETO
        
    }
    carrito[producto.id] = {...producto}; // agregamos el objeto al carrito
    renderizarCarrito();
  //  console.log(carrito)
}

const renderizarCarrito = () => {
  Object.values(carrito).forEach((producto) => {
    items.innerHTML = "";
    templateCarrito.querySelector("th").textContent = producto.id
    templateCarrito.querySelectorAll("td")[0].textContent = producto.title
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id
    templateCarrito.querySelector("span").textContent = producto.cantidad * producto.precio

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone)
  })
items.appendChild(fragment);
localStorage.setItem("carrito", JSON.stringify(carrito)); // guardamos el carrito en el localStorage

}

const btnAccion = (e) => {
  if(e.target.classList.contains("btn-info")){
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[producto.id] = {...producto};
   renderizarCarrito()
  }
  if(e.target.classList.contains("btn-danger")){
    // carrito[e.target.dataset.id] 
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if(producto.cantidad === 0){
      delete carrito[producto.id];
     
    }else {
      carrito[e.target.dataset.id] = {...producto};
    }
    
    renderizarCarrito()
  }
}


localStorage("carrito", carrito); // guardamos el carrito en el localStorage
