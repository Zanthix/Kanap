//Récupération du local Storage
let products = JSON.parse(localStorage.getItem('products'));
console.log(products);

//Comptage du nombre total d'objets
let totalItems = 0;
for (let items of products){
  totalItems += items.quantity;
  console.log(totalItems);
}

const errors = "";

//Gestion du panier
let price = 0;
let affichage = "";
document.addEventListener('DOMContentLoaded', async() => {
  const test = await display();
  console.log(price);
})



const display = async() => {
  for(let product of products){
  let url = `http://localhost:3000/api/products/${product.id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {     
        console.log(product);
        affichage += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
          <div class="cart__item__img">
          <img src="${data.imageUrl}" alt="${data.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${data.name}</h2>
              <p>${product.color}</p>
              <p>${data.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
      </article>`    
    price += data.price * product.quantity;
    console.log(price);
    document.querySelector('#cart__items').innerHTML = affichage;
    document.querySelector('#totalQuantity').innerHTML = totalItems;
    document.querySelector('#totalPrice').innerHTML = price;    
  })}
}


/*document.querySelectorAll('.itemQuantity').forEach(item => {
      addEventListener('change', (e) => {
        console.log(e.target.value);
      })
    })*/
     
              //<p id="firstNameErrorMsg"><!-- ci est un message d'erreur --></p>

/*<!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> -->*/
         //<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>