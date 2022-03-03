//DOM
console.dir(document);
console.dir(document.head);
console.dir(document.body);

//get element by id
const titulo = document.getElementById("titulo");
console.log(titulo);
console.log(titulo.innerHTML);

const footer = document.getElementById ("footer");
console.log(footer);
console.log(footer.innerHTML);

const formulariodecontacto =document.getElementById("formulariodecontacto");
console.log(formulariodecontacto);
console.log(formulariodecontacto.innerHTML);


//CARRITO DE COMPRAS 
const botonesCarrito = document.querySelectorAll('.aniadirCarrito');
botonesCarrito.forEach((aniadirCarritoButton) => {
  aniadirCarritoButton.addEventListener('click', aniadirCarritoClicked);
});

const comprarButton = document.querySelector('.comprarButton');


const borrarButton = document.querySelector('.borrarButton');


const itemsCarritoContainer = document.querySelector(
  '.itemsCarritoContainer'
);

function aniadirCarritoClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitulo = item.querySelector('.titulo').textContent;
  const itemPrecio = item.querySelector('.precio').textContent;
  const itemImagen = item.querySelector('.imagen').src;

  addItemsCarrito(itemTitulo, itemPrecio, itemImagen);
}

function addItemsCarrito(itemTitulo, itemPrecio, itemImagen) {
  const elementsTitulo = itemsCarritoContainer.getElementsByClassName(
    'itemsTitulo'
  );
  for (let i = 0; i < elementsTitulo.length; i++) {
    if (elementsTitulo[i].innerText === itemTitulo) {
      let elementCantidad = elementsTitulo[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.cantidadItemsCarrito'
      );
      elementCantidad.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const seleccionDeCarrito = document.createElement('div');
  const contenidoDelCarrito = `
  <div class="row ItemsCarritoCompleto">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImagen} class="shopping-cart-imagen">
                <h6 class="shopping-cart-item-titulo itemsTitulo text-truncate ml-3 mb-0">${itemTitulo}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-precio d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-precio mb-0 ItemsCarritoCompletoPrecio">${itemPrecio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input cantidadItemsCarrito" type="number"
                    value="1">
                <button class="btn btn-danger buttonBorrar" type="button">X</button>
            </div>
        </div>
    </div>`;
    seleccionDeCarrito.innerHTML = contenidoDelCarrito;
  itemsCarritoContainer.append(seleccionDeCarrito);

  seleccionDeCarrito
    .querySelector('.buttonBorrar')
    .addEventListener('click', removeShoppingCartItem);

    seleccionDeCarrito
    .querySelector('.cantidadItemsCarrito')
    .addEventListener('change', quantityChanged);

  updateTotalDelCarritol();
}

function updateTotalDelCarrito() {
  let total = 0;
  const totalDelCarrito = document.querySelector('.totalDelCarrito');

  const ItemsCarritoCompletoII = document.querySelectorAll('.ItemsCarritoCompleto');

  ItemsCarritoCompletoII.forEach((ItemsCarritoCompleto) => {
    const ItemsCarritoCompletoPrecioElement = ItemsCarritoCompleto.querySelector(
      '.ItemsCarritoCompletoPrecio'
    );
    const ItemsCarritoCompletoPrecio = Number(
      ItemsCarritoCompletoPrecioElement.textContent.replace('€', '')
    );
    const cantidadItemsCarritoElement = ItemsCarritoCompleto.querySelector(
      '.cantidadItemsCarrito'
    );
    const cantidadItemsCarrito = Number(
      cantidadItemsCarritoElement.value
    );
    total = total + ItemsCarritoCompletoPrecio * cantidadItemsCarrito;
  });
  totalDelCarrito.innerHTML = `${total.toFixed(2)}$`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.ItemsCarritoCompleto').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  itemsCarritoContainer.innerHTML = '';
  updateShoppingCartTotal();
}
function borrarButtonClicked() {
  itemsCarritoContainer.innerHTML = '';
  updateShoppingCartTotal();
}

comprarButton.addEventListener('click', () =>{
  Swal.fire({
      icon: 'success',
      title: 'Tu compra se realizo con exito',
      text: 'Nos contactaremos en caso de necesitar envio',
    })
}
);
borrarButton.addEventListener('click', () =>{
  Swal.fire({
      title: 'Está seguro de vaciar el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'No, no quiero'
  }).then((result) => {
console.log(result);
      if (result.isConfirmed) {
          Swal.fire({
              title: 'Borrado!',
              icon: 'success',
              text: 'El carrito ha sido vaciado'
          })
      }
  })
})


