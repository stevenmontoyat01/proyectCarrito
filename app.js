//-------------------CREATE OF CARD AND SELECTS --------------------
const mainCards = document.querySelector("main");
const selectProducts = document.getElementById("select-products");
//--------------------CREATE OF SELECT FOR FILTER PRICE--------------------
const filterPrice = document.getElementById("select-price");
const contenetText = document.getElementById("textFilter");
//-------------------CREATE NEW PRODUCT-----------------------------
const contentProducts= document.getElementById("container_products");
const reloadProducts = document.getElementById("reload_products");
const deleteProducts= document.getElementById("close_button");
const inputName = document.getElementById("nameProduct");
const inputPrice = document.getElementById("priceProduct");
const imagenProduct = document.getElementById("imagenProduct");
const buttonAdd = document.getElementById("button_products");
const buttonDelete = document.getElementById("button_delete");
//--------------------------CREATE CARDSHOP--------------------------------
const contentBuy= document.getElementById("container_buy");
const buttonClose=document.getElementById("button_close");
const buttCardsShop=document.getElementById("buttonCardShop");


//-------------------------------------EVENTS----------------------------------------------
window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', renderCards);
filterPrice.addEventListener('change',renderPrice);
reloadProducts.addEventListener('click', renderpanth);
deleteProducts.addEventListener('click',renderpanth);
buttonAdd.addEventListener('click',renderproducts);
buttonDelete.addEventListener('click',renderproducts);
imagenProduct.addEventListener('change', renderImg);
buttCardsShop.addEventListener('click',renderbuy);
buttonClose.addEventListener('click',renderbuy);

//----------------------------------------------------------------------------------------
//-------------------------------LOAD ELEMENTS OF CARDS------------------------------------
function renderCards() {
  tecnology.find((element)=>{
    element.id === selectProducts.value ? createCards(element):null;
  })
}
//-----------------------------------------------------------------------------------------
//--------------------------------LOAD CHANGE ELEMENTS-------------------------------------
function listSelect() {
  selectProducts.innerHTML=''; // permite limpar el select de products.
  tecnology.map(products=>{
    let element= document.createElement('option');
    element.value=products.id;
    element.textContent=products.product;
    selectProducts.appendChild(element);
  });
  filterPrice.innerHTML='';
  prices.map((filter)=>{
    let element = document.createElement('option');
    element.value = filter.id;
    element.textContent = filter.price
    filterPrice.appendChild(element);
  })
}

//------------------------------------------------------------------------------------
//-----------------------------------CREATE CARDS--------------------------------------
function createCards(tecnology) {
  const {product, image,id,price} = tecnology;

  const card = document.createElement('div');
  card.setAttribute('id',id);
  card.classList.add('card-product');
  const imgCard = document.createElement('img');
  imgCard.setAttribute('src',image);
  imgCard.setAttribute('alt',product);
  imgCard.classList.add('img-product');
  const namecard = document.createElement('p');
  namecard.textContent=product;
  namecard.classList.add('name-product');
  const priceCard = document.createElement('p');
  priceCard.textContent=`$${price}`;
  priceCard.classList.add('price-product');
  const buttonCard = document.createElement('button');
  buttonCard.setAttribute('id',id);
  buttonCard.classList.add('btn-add');
  buttonCard.textContent='BUY NOW';
  buttonCard.addEventListener('click',productsShop)
  const buttonDelete = document.createElement('button');
  buttonDelete.setAttribute('id',id);
  buttonDelete.classList.add('btn-add')
  buttonDelete.textContent= 'DELETED';
  buttonDelete.addEventListener('click',deleteCard);

  card.appendChild(imgCard);
  card.appendChild(namecard);
  card.appendChild(priceCard);
  card.appendChild(buttonCard);
  card.appendChild(buttonDelete);

  mainCards.appendChild(card);

  function deleteCard() {
    card.remove();
  }
}

//El método Node.removeChild() elimina un nodo hijo del DOM y puede devolver el nodo eliminado.
//child es el nodo hijo a eliminar del DOM.
//elemento es el nodo padre de hijo.(ver nota mas abajo)
//antiguoHijo tiene una referencia al hijo eliminado. antiguoHijo === child.
//El hijo(child) eliminado aún existe en memoria pero ya no es parte del DOM. Con la primera forma 
//de sintaxis mostrada, se puede reutilizar el nodo eliminado más tarde en el código, por medio de 
//la referencia al objeto antiguoHijo.

//function deleteCard(event) {
    //const id = event.target.id;
    //const del = document.getElementById(id);
   // mainCards.removeChild(del);
//}

//--------------------------------------------------------------------------------------
//---------------------------------CREATE PRODUCTS NEW ---------------------------------

//------------------------------OPEN AND CLOSE OF BATH --------------------------------

function renderpanth (event){
  if(event.target.id === "reload_products"){
    return contentProducts.style.display = 'flex';
  }
  return contentProducts.style.display = 'none';
}

let imgUrl='';
let contador= 10

//------------------------------URL MODIFY -----------------------------------------------------------
function renderImg(event){
  const curretImg = event.target.files[0];
  const objectUrl = URL.createObjectURL(curretImg);
  imgUrl = objectUrl;
  console.log(imgUrl);
}


function renderproducts(event){
  if(event.target.id === "button_products"){
    const name = inputName.value;
    const price = inputPrice.value;
    tecnology.map((element,index) => {
      if(element.product === name){
        inputName.value = '';
        inputPrice.value = '';
        imagenProduct.value = '';
        return alert("producto, ya existente.")
      }
      else{
        if(tecnology.length === index+1){
        const newProduct= {id : `tecnology-${contador}`,product : name, price : price, image : imgUrl};
        tecnology.push(newProduct);
        tecnology.forEach(elements =>console.log(elements));
        inputName.value = '';
        inputPrice.value = '';
        imagenProduct.value = '';
        listSelect();
        contador++;
        }
      }
    })
  }
  else{
    inputName.value = '';
    inputPrice.value = '';
    imagenProduct.value = '';
  }
}

//------------------------------------------------------------------------------------------------------------

function renderPrice(event) {
  mainCards.innerHTML=''; // permite limpar el select de products.
  contenetText.innerHTML='';
  let id= event.target.value;
  let mensaje = document.createElement('h2');
  mensaje.textContent='RESULTADOS DE BUSQUEDA:';
  contenetText.appendChild(mensaje);
  let contador = 0;
  switch(id){
    case "price-01":
      tecnology.map((element)=>{
        Number(element.price) >= 1 && Number(element.price) <= 500000 ?
        createCards(element):contador++;
        if(tecnology.length == contador){
          mensaje.textContent = 'UPS, NO SE ENCONTRARON RESULTADOS';
          mainCards.appendChild(mensaje);
          contador=0;
        }
      })
    break;
    case "price-02":
      tecnology.map((element)=>{
        Number(element.price) >=500001  && Number(element.price) <= 1000000 ?
        createCards(element):contador++;
        if(tecnology.length == contador){
          mensaje.textContent = 'UPS, NO SE ENCONTRARON RESULTADOS';
          mainCards.appendChild(mensaje);
          contador=0;
        }
      })
    break;
    case "price-03":
      tecnology.map((element)=>{
        Number(element.price) >=1000001 && Number(element.price) <= 1500000  ?
        createCards(element):contador++;
        if(tecnology.length == contador){
          mensaje.textContent = 'UPS, NO SE ENCONTRARON RESULTADOS';
          mainCards.appendChild(mensaje);
          contador=0;
        }
      })
    break;
    case "price-04":
      tecnology.map((element)=>{
        Number(element.price) >=1500001 && Number(element.price) <= 2000000  ?
        createCards(element):contador++;
        if(tecnology.length == contador){
          mensaje.textContent = 'UPS, NO SE ENCONTRARON RESULTADOS';
          mainCards.appendChild(mensaje);
          contador=0;
        }
      })
    break;
    case "price-05":
      tecnology.map((element)=>{
        Number(element.price) >=2000001 && Number(element.price) <= 2500000  ?
        createCards(element):contador++;
        if(tecnology.length == contador){
          mensaje.textContent = 'UPS, NO SE ENCONTRARON RESULTADOS';
          mainCards.appendChild(mensaje);
          contador=0;
        }
      })
    break;
    case "price-06":
      tecnology.map((element)=>{
        Number(element.price) >=2500001 && Number(element.price) <= 3000000  ?
        createCards(element):contador++;
        if(tecnology.length == contador){
          mensaje.textContent = 'UPS, NO SE ENCONTRARON RESULTADOS';
          mainCards.appendChild(mensaje);
          contador=0;
        }
      })
    break;
    case "price-07":
      tecnology.map((element)=>{
        Number(element.price) >=3000001 ?
        createCards(element):contador++;
        if(tecnology.length == contador){
          mensaje.textContent = 'UPS, NO SE ENCONTRARON RESULTADOS';
          mainCards.appendChild(mensaje);
          contador=0;
        }
      })
    break;
  }
}

//---------------------------------------------------------------------------------------------------
//-------------------------------------CARD BUY------------------------------------------------------
function renderbuy (event){
  if(event.target.id === "buttonCardShop"){
    return contentBuy.style.display = 'flex';
  }
  return contentBuy.style.display = 'none';
}

function productsShop(event){
  console.log(event.target.id);
  tecnology.find(element =>{
    element.id === event.target.id ? createShop(element):null;
  })
}

let array_products = [];
let elements=0;
function createShop(tecnology){
  const {product,id,price} = tecnology;
  array_products.push(id);
  console.log(array_products);
  //-------- validacion para eliminacion de texto en carrito
  if(array_products.length === 1){
    const del = document.getElementById('notificacion');
    contentBuy.removeChild(del);
  }
  array_products.map((element)=>{
    if(element === id){
      elements++;
    }
  })
  console.log(elements);
  const contentFather = document.createElement('div');
  contentFather.setAttribute('id',`content${id}`)
  contentFather.classList.add("content_objects");
  /*---------------------------------------------*/
  const content1 = document.createElement('div');
  content1.classList.add('contendor');
  const title1 = document.createElement('h3');
  title1.textContent = 'PRODUCT';
  const nomProduct = document.createElement('p');
  nomProduct.textContent = product;
  /*----------------------------------------------*/
  const content2 = document.createElement('div');
  content2.classList.add('contendor');
  content2.setAttribute('id',`content-price${id}`);
  const title2 = document.createElement('h3');
  title2.textContent = 'PRICE';
  let precioPro = document.createElement('p');
  precioPro.setAttribute('id',`price${id}`);
  precioPro.textContent= `$${Number(price)*elements}`;
  /*----------------------------------------------*/
  const content3 = document.createElement('div');
  content3.classList.add('contendor');
  content3.setAttribute('id',`content-units${id}`);
  const title3 = document.createElement('h3');
  title3.textContent= 'UNITS';
  const unidades = document.createElement('p');
  unidades.setAttribute('id',`units${id}`);
  unidades.textContent = elements;
  /*---------------------------------------------*/
  const content4 = document.createElement('div');
  content4.classList.add('contendor')
  const title4 = document.createElement('h3');
  title4.textContent= 'DESC UNITS'
  const buttonDs = document.createElement('button');
  buttonDs.classList.add('btn-desc')
  buttonDs.setAttribute('id',id);
  buttonDs.textContent = '-'
  buttonDs.addEventListener('click',descUnit);
  /*---------------------------------------------*/
  const content5 = document.createElement('div');
  content5.classList.add('contendor')
  const title5 = document.createElement('h3');
  title5.textContent = 'DELETE'
  const buttonDl = document.createElement('button');
  buttonDl.classList.add('btn-product')
  buttonDl.setAttribute('id',id);
  buttonDl.textContent =  'eliminar';
  //buttonDl.addEventListener('click',renderDelete);
  /*---------------------------------------------*/
  if(elements === 1){
    content1.appendChild(title1);
    content1.appendChild(nomProduct);
    contentFather.appendChild(content1);
    content2.appendChild(title2);
    content2.appendChild(precioPro);
    contentFather.appendChild(content2);
    content3.appendChild(title3);
    content3.appendChild(unidades);
    contentFather.appendChild(content3)
    content4.appendChild(title4);
    content4.appendChild(buttonDs);
    contentFather.appendChild(content4);
    content5.appendChild(title5);
    content5.appendChild(buttonDl);
    contentFather.appendChild(content5);
    contentBuy.appendChild(contentFather);
  }

  if(elements > 1){
    const newContent2 = document.getElementById(`content-price${id}`);
    let oldPrice = document.getElementById(`price${id}`);
    let newPrice = document.createElement('p');
    newPrice.setAttribute('id',`price${id}`);
    let createPrice = document.createTextNode(`$${Number(price)*elements}`);
    newPrice.appendChild(createPrice);
    newContent2.replaceChild(newPrice,oldPrice);
    /*-------------------------------------------------------------------------*/
    const newContent3 = document.getElementById(`content-units${id}`);
    let oldUnits = document.getElementById(`units${id}`);
    let newUnits = document.createElement('p');
    newUnits.setAttribute('id',`units${id}`);
    let createUnits = document.createTextNode(elements);
    newUnits.appendChild(createUnits);
    newContent3.replaceChild(newUnits,oldUnits);
  }
  /*---------------------------------------------*/
    elements=0
}

function descUnit(event){
  let saved_price ;
  tecnology.find(element =>{
    if(element.id === event.target.id){
      saved_price = element.price;
    }
  })
  /*----------------------------------------------------------------*/
  const newContent2 = document.getElementById(`content-price${event.target.id}`);
  const newContent3 = document.getElementById(`content-units${event.target.id}`);
  /*----------------------------------------------------------------*/
  let oldUnits = document.getElementById(`units${event.target.id}`);
  let detallunits = oldUnits.innerHTML;
  let newUnits = document.createElement('p');
  newUnits.setAttribute('id',`units${event.target.id}`);
  let createUnits = document.createTextNode(Number(detallunits)-1);
  newUnits.appendChild(createUnits);
  newContent3.replaceChild(newUnits,oldUnits);
  /*----------------------------------------------------------------*/
  let oldPrice = document.getElementById(`price${event.target.id}`);
  let detallpri = oldPrice.innerHTML;
  let arreglado = "";
  for (let step = 1; step < detallpri.length; step++) {
    if(step === 1){
      arreglado = detallpri.charAt(step);
    }else{
      arreglado = arreglado + detallpri.charAt(step)
    }
  }
  console.log(Number(arreglado-saved_price));
  let newPrice = document.createElement('p');
  newPrice.setAttribute('id',`price${event.target.id}`);
  let createPrice = document.createTextNode(`$${Number(arreglado-saved_price)}`);
  console.log(createPrice);
  newPrice.appendChild(createPrice);
  newContent2.replaceChild(newPrice,oldPrice);
  console.log(array_products);
  /*------------------------------------------------------------------*/
  if(Number(detallunits-1) === 0){
    console.log("hola");
    const tarjeta_product = document.getElementById(`content${event.target.id}`);
    contentBuy.removeChild(tarjeta_product);
  }
  array_products.find((elements,index)=>{
    if(elements === event.target.id){
      array_products.pop(elements,index)
      if(array_products.length === 0){
        const retry = document.createElement('p');
        retry.setAttribute('id','notificacion')
        retry.classList.add('notification');
        let text = document.createTextNode('ACTUALMENTE NO HAY PRODUCTOS EN EL CARRITO')
        retry.appendChild(text);
        contentBuy.appendChild(retry);
      }
    }
  })
}














