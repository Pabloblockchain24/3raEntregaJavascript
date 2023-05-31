// Creo inventario vacio
let inventario = [];
// creo un id y lo inicializo en 7 dado que cree 6 objetos por defecto en mi proyecto; cada vez que se agregue un nuevo producto se creara con un nuevo id
let id = 7;

// Creo un constructor de producto que llamare cada vez que se cree un producto nuevo
const Producto = function (id, nombre, marca, categoria, imagen, precio) {
  this.id = id,
    this.nombre = nombre,
    this.marca = marca,
    this.categoria = categoria,
    this.imagen = imagen,
    this.precio = precio
}

// Creo 6 productos que estaran por defecto en el inventario
let producto1 = new Producto(1, "Chaqueta TNF Hombre", "The North Faace", "Hombre", "./img/chaquetaTNF.jpg", 150000)
let producto2 = new Producto(2, "Polera Calvin Klein Hombre", "Calvin Klein", "Hombre", "./img/poleraCalvinKlein.jpg", 30000)
let producto3 = new Producto(3, "Polera Ploma Gap Hombre", "Gap", "Hombre", "./img/poleraGap.jpg", 20000)
let producto4 = new Producto(4, "Poleron TH Hombre", "Tommy Hilfiger", "Hombre", "./img/poleronTommy.jpg", 55000)
let producto5 = new Producto(5, "Chaqueta TH Mujer", "Tommy Hilfiger", "Mujer", "./img/chaquetaTommy.jpg", 155000)
let producto6 = new Producto(6, "Poleron Calvin Klein Mujer", "Calvin Klein", "Mujer", "./img/poleronCalvin.jpg", 55000)
// Agrego estos 6 productos al inventario usando push
inventario.push(producto1, producto2, producto3, producto4, producto5, producto6);

// Creo funcion cargarProductos que ira al localStorage a buscar el array "productos" y el id "id" y si existe, lo cargaremos a la variable inventario; guarde tambien el id, porque si recargo la pagina y no lo tengo almacenado, se devuelve a 7.
function cargarProductos() {
  // Voy a buscar los elementos guardados y los almaceno en variables
  let elementosGuardados = localStorage.getItem("productos");
  let idGuardado = localStorage.getItem("id");
  // Si existen estos elementos en el localStorage, los asigno a sus variables correspondientes en el proyecto
  if (elementosGuardados) {
    inventario = JSON.parse(elementosGuardados);
    id = idGuardado;
  }
}
//Creo funcion que guarda el nuevo array y el id en el localStorage, despues de agregar o borrar elementos
function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(inventario));
  localStorage.setItem("id", id);
}

//Llamo a la funcion cargarProductos; esta funcion solo carga los elementosGuardados si estos existen; por tanto, en la primera iteracion no cambiara el inventario original; en las llamadas que si haya algo en el localStorage, si cambiara el inventario.
cargarProductos();
//Ahora muestro en la grilla el inventario, que ya esta actualizado segun lo que estaba guardado en el localStorage
mostrarInventario(inventario);


// creo funcion mostrarInventario que cargara el array inventario al html en el id "productos"; le paso por parametro el inventario que quiero mostrar;
function mostrarInventario(arr) {
  //Lo primero que hago es limpiar la grilla o tabla de inventario para que no se carguen los elementos sobre los ya existentes.
  let productos = document.querySelector("#productos");
  productos.innerHTML = "";
  let tablaInventario = document.querySelector("#tablaInventario");
  tablaInventario.innerHTML = "";

  //Recorro el array y para cada producto de inventario, creo un nuevo div, y le modifico el html, luego lo agrego a la grilla productos.
  for (const producto of arr) {
    let nuevoProducto = document.createElement("div");
    nuevoProducto.innerHTML =
      `<div class="productos__card">
      <img src= ${producto.imagen} class="productos__card__image" alt="${producto.nombre}s">
      <div class="productos__card__descripcion">
          <div class="productos__card__descripcion__brand"> ID: ${producto.id}</div>
          <div class="productos__card__descripcion__brand"> ${producto.marca}</div>
          <p class="productos__card__descripcion__name"> ${producto.nombre}</p>
          <p class="productos__card__descripcion__price"> $ ${producto.precio} </p>
      </div>
      </div>`
    // cuando ya esta creado el elemento "nuevoProducto", lo agrego a su padre "productos".
    productos.appendChild(nuevoProducto);
  }
}

/// Ahora voy a crear las funciones que haran que se desplieguen cada uno de los botones del aside.
 
// Creo una funcion que cuando le demos click, despliegue un menu para agregar elementos
function desplegarAgregar() {
  // creo variable que recoge lo que ocurra en el id "menuAgregar"
  let menu = document.getElementById("menuAgregar");
  // despliego el div menu, usando un style.display flex
  menu.style.display = "flex";
  menu.classList.add("formularioEnColumna");
}

// Creo una funcion que cuando le demos click, despliegue un menu para borrar elementos
function desplegarBorrar() {
  // creo variable que recoge lo que ocurra en el id "menuBorrar"
  let menu = document.getElementById("menuBorrar");
  // despliego el div menu, usando un display flex
  menu.style.display = "flex";
  menu.classList.add("formularioEnColumna");
}

// Creo una funcion que cuando le demos click, despliegue un menu para buscar elementos
function desplegarBuscar() {
  // creo variable que recoge lo que ocurra en el id "menuBuscar"
  let menu = document.getElementById("menuBuscar");
  // despliego el div menu, usando un display flex
  menu.style.display = "flex";
  menu.classList.add("formularioEnColumna");
}

// Creo funcion que recoge todos los elementos ingresados, crea un objeto y lo agrega al inventario
function agregarProducto() {
  let nombre = document.querySelector("#nombre").value;
  let marca = document.querySelector("#marca").value;
  let categoria = document.querySelector("#categoria").value;
  let precio = Number(document.querySelector("#precio").value);
  // Valido que los datos ingresados, sean correctos, de lo contrario mando un alert y corto la funcion. 
  if (isNaN(precio) || nombre == "" || marca == "" || categoria == "") {
    alert("Por favor, ingresa datos validos");
    return;
  }

  // Creo nuevo producto con el constructor Producto y lo agrego al inventario con el metodo push
  let nuevoProducto = new Producto(id, nombre, marca, categoria, "./img/nuevoProducto.jpg", precio);
  inventario.push(nuevoProducto);

  /// Muestro el nuevo inventario con el elemento agregado y mando un  alert que fue agregado exitosamente
  mostrarInventario(inventario);
  alert("Producto agregado correctamente:\n\nID: " + (id) + "\nNombre: " + nombre + "\nMarca: " + marca + "\nCategoria: " + categoria + "\nPrecio: " + precio);

  /// Le agrego una unidad al id, para seguir con la correlacion en el siguiente elemento que se cree y guardo el inventario y el id en el localStorage
  id++;
  guardarProductos();

  // Ahora hago que una vez que aprieto el boton agregar, este ya no aparezca desplegado.
  let menu = document.getElementById("menuAgregar");
  menu.style.display = "none";

  // Finalmente, vacio los campos luego de que se agrego el elemnto
  document.querySelector("#nombre").value = "";
  document.querySelector("#marca").value = "";
  document.querySelector("#categoria").value = "";
  document.querySelector("#precio").value = "";
}


// Creo funcion que borra productos segun el id
function borrarProducto() {
  // solicito id del producto mediante el html con id "id".
  let idABorrar = Number(document.querySelector("#id").value);
  //Valido que efectivamente exista el producto, en caso contrario mando un alert
  if (inventario.some(producto => idABorrar == producto.id)) {
    // En caso que exista, creo un nuevo array igual al anterior pero que no contenga dicho producto.
    let arrayFiltrado = inventario.filter((producto) => producto.id != idABorrar);
    // El nuevo inventario es ahora el array filtrado.
    inventario = arrayFiltrado;

    // Ahora guardo el nuevo array con el elemento borrado, lo muestro en la grilla y mando un alert que el producto se elimino
    guardarProductos();
    mostrarInventario(inventario);
    alert("Producto ID: " + idABorrar + " eliminado correctamente.");

    // Hago que el menu borrar ya no aparezca desplegado y elimino el contenido que se habia ingresado
    let menu = document.getElementById("menuBorrar");
    menu.style.display = "none";
    document.querySelector("#id").value = "";
  } else {
    // Mando alert
    alert("Producto ingresado no existe")
    // Hago que el menu borrar ya no aparezca desplegado y elimino el contenido que se habia ingresado
    let menu = document.getElementById("menuBorrar");
    menu.style.display = "none";
    document.querySelector("#id").value = "";
  }
}

// Creo funcion que busca producto segun palabra ingresada 
function buscarProducto() {
  // Recupero palabra ingresada en HTML y la almaceno en mayuscula
  let palabraABuscar = document.querySelector("#buscarInput").value.toUpperCase();
  // Creo nuevo array que contenga solo productos que en su nombre incluyan la misma palabra que fue ingresada en el html.
  let arrayFiltrado = inventario.filter((producto) => producto.nombre.toUpperCase().includes(palabraABuscar));
  // Si encuentro coincidencias muestro el inventario filtrado, en caso contrario, inserto en el html un mensaje que dice que no se encontraron coincidencias
  if (arrayFiltrado.length > 0) {
    mostrarInventario(arrayFiltrado);
  } else {
    let productos = document.querySelector("#productos");
    productos.innerHTML = "";
    let mensaje = document.createElement("div");
    mensaje.innerText = "NO SE ENCONTRARON COINCIDENCIAS"
    productos.appendChild(mensaje)
  }
    // Hago que el menu buscar ya no aparezca desplegado y elimino el contenido que se habia ingresado
    let menu = document.getElementById("menuBuscar");
  menu.style.display = "none";
  document.querySelector("#buscarInput").value = "";
}


// Creo funcion que mostrara el inventario en formato table.
function mostrarTablaInventario() {
  // En primer luegar, vacio la grilla o la tabla inventario
  let productos = document.querySelector("#productos");
  productos.innerHTML = "";
  // Guardo en la variable tablaInventario, el elemento que contiene el id tablaInventario en el html
  let tablaInventario = document.querySelector("#tablaInventario");
  // Luego creo el encabezado de la tabla inventario
  tablaInventario.innerHTML = `
    <tr>
    <th scope="col">ID</th>
    <th scope="col">NOMBRE</th>
    <th scope="col">MARCA</th>
    <th scope="col">CATEGORIA</th>
    <th scope="col">PRECIO</th>
  </tr>
  `
  // Posteriormente recorro cada elemento del inventario
  for (let i = 0; i < inventario.length; i++) {
    // Por cada elemento del inventario creo una fila
    let fila = document.createElement("tr"); 
    // Luego para cada atributo de los objetos, creo una celda "td", le inserto el texto de lo que contiene el atributo del producto y la agrego a la fila con un appendChild
    let celdaId = document.createElement("td"); 
    celdaId.textContent = inventario[i].id;
    fila.appendChild(celdaId)
    let celdaNombre = document.createElement("td");
    celdaNombre.textContent = inventario[i].nombre;
    fila.appendChild(celdaNombre)
    let celdaMarca = document.createElement("td");
    celdaMarca.textContent = inventario[i].marca;
    fila.appendChild(celdaMarca)
    let celdaCategoria = document.createElement("td");
    celdaCategoria.textContent = inventario[i].categoria;
    fila.appendChild(celdaCategoria)
    let celdaPrecio = document.createElement("td");
    celdaPrecio.textContent = inventario[i].precio;
    fila.appendChild(celdaPrecio)

    // Cuando ya esta la fila del producto creada completamente , la agrego a la tablaInventario
    tablaInventario.appendChild(fila);
  }

  // Creo boton que me permita cambiar a vista como grilla y lo agrego al final de la tabla inventario
  let botonGrilla = document.createElement("div");
  botonGrilla.innerHTML = `<button type="submit" class="btn btn-primary" onclick="ejecutarMostrarInventario()">MOSTRAR INVENTARIO COMO GRILLA</button>`
  tablaInventario.appendChild(botonGrilla);
}
// Creo funcion que se ejecuta cuando le doy click al boton "MOSTRAR INVENTARIO COMO GRILLA"
function ejecutarMostrarInventario() {
  mostrarInventario(inventario);
}


// Escuchar el evento submit del menu Agregar
let menuAgregar = document.getElementById("menuAgregar");
menuAgregar.addEventListener("submit", function (event) {
  event.preventDefault();
  agregarProducto();
});

// Escuchar el evento submit del menu Borrar
let menuBorrar = document.getElementById("menuBorrar");
menuBorrar.addEventListener("submit", function (event) {
  event.preventDefault();
  borrarProducto();
});

// Escuchar el evento submit del menu buscar
let menuBuscar = document.getElementById("menuBuscar");
menuBuscar.addEventListener("submit", function (event) {
  event.preventDefault();
  buscarProducto();
});


