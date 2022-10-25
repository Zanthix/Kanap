//Récupération du local Storage
let products = JSON.parse(localStorage.getItem("products"));
if(products === null){
  window.location.replace('index.html');
}
const productIds = products.map((product) => product.id);
const productsWithPrice = [];

//Comptage du nombre total d'objets
let totalItems = 0;
for (let items of products) {
  totalItems += items.quantity;
}

//Initialisation de la variable prix
let price = 0;

//Affichage du contenu de la page quand tout est chargé
document.addEventListener("DOMContentLoaded", () => {
  display();
});


//Affichage de la page panier
const display = () => {
  let affichage = "";
  let url = `http://localhost:3000/api/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      
      for (let product of data) {
        productsWithPrice.push({id: product._id, price: product.price});
      }
      for(let storedProduct of products){
        const product = data.find(item => item._id === storedProduct.id); 
        affichage += `<article class="cart__item" data-id="${storedProduct.id}" data-color="${storedProduct.color}">
            <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${storedProduct.color}</p>
                <p>${product.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${storedProduct.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
            </article>`;
          price += product.price * storedProduct.quantity;
      }
      //Injection des différentes variables dans le DOM
      document.querySelector("#totalQuantity").innerHTML = totalItems;
      document.querySelector("#totalPrice").innerHTML = price;
      document.querySelector("#cart__items").innerHTML = affichage;
      //Détection et changements des quantités des différents articles présents dans le panier
      document.querySelectorAll(".itemQuantity").forEach((input) => {
        input.addEventListener("change", (e) => {
          const newQuantity = parseInt(e.target.value);
          const article = e.target.closest('.cart__item');
          const id = article.dataset.id;
          const color = article.dataset.color;
          const index = products.findIndex(item => id === item.id && color === item.color);
          products[index].quantity = newQuantity;
          calculatePriceAndQuantity();
          localStorage.setItem('products', JSON.stringify(products));
        });
      });
     //Bouton delete
      document.querySelectorAll(".deleteItem").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          if(confirm('Souhaitez-vous réellement supprimer ce produit de votre panier ?')){
            const article = e.target.closest('.cart__item');
            article.remove();
            const id = article.dataset.id;
            const color = article.dataset.color;
            const index = products.findIndex(item => id === item.id && color === item.color);
            const removedProduct = products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            calculatePriceAndQuantity();      
          }         
        });
      });
    });
};
//Calcul du prix et de la quantité totale des articles présents
const calculatePriceAndQuantity = () => {
  let totalItems = 0;
  let price = 0;
  for (let item of products) {
    totalItems += item.quantity;
    const productWithPrice = productsWithPrice.find(productItem => productItem.id === item.id);
    price += productWithPrice.price * item.quantity;
  }
  
  document.querySelector("#totalQuantity").innerHTML = totalItems;
  document.querySelector("#totalPrice").innerHTML = price;
}

//Messages d'erreur du formulaire
document.querySelector("#firstName").addEventListener("change", () => {
  let check = "";
  let valeur = document.getElementById("firstName").value;
  if (valeur.match(/[0-9&"'(_ç)=]/)) {
    check += `Erreur dans le prénom`;
  }
  document.querySelector("#firstNameErrorMsg").innerHTML = check;
});
document.querySelector("#lastName").addEventListener("change", () => {
  let check = "";
  let valeur = document.getElementById("lastName").value;
  if (valeur.match(/[0-9&"'(_ç)=]/)) {
    check += "Erreur dans le nom";
  }
  document.querySelector("#lastNameErrorMsg").innerHTML = check;
});
document.querySelector("#address").addEventListener("change", () => {
  let check = "";
  let valeur = document.getElementById("address").value;
  if (valeur.match(/["(_)=]/)) {
    check += `Erreur dans l'adresse`;
  }
  document.querySelector("#addressErrorMsg").innerHTML = check;
});
document.querySelector("#city").addEventListener("change", () => {
  let check = "";
  let valeur = document.getElementById("city").value;
  if (valeur.match(/[0-9&"(_)=]/)) {
    check += `Erreur dans le nom de la ville`;
  }
  document.querySelector("#cityErrorMsg").innerHTML = check;
});
document.querySelector("#email").addEventListener("change", () => {
  let check = "";
  let valeur = document.getElementById("email").value;
  if (!valeur.match(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/)) {
    check += `Erreur dans l'email`;
  }
  document.querySelector("#emailErrorMsg").innerHTML = check;
});

//Récupération des infos du client et l'Id des produits choisis
document.querySelector('.cart__order__form').addEventListener('submit', (event) => {
  event.preventDefault();
  const client = {
    contact: {
      firstName: document.querySelector('#firstName').value,
      lastName: document.querySelector('#lastName').value,
      address: document.querySelector('#address').value,
      city: document.querySelector('#city').value,
      email: document.querySelector('#email').value
    },
    products: productIds
  }
  sendData(client);
})
  
//Envoi vers API pour numéro de commande
  const sendData = async (client) =>{
    let promise = fetch("http://localhost:3000/api/products/order", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json'
      },
      body: JSON.stringify(client) 
    });
    promise.then(response => response.json())
    .then(data => {
      window.location.replace("confirmation.html?orderId="+ data.orderId);
    })
  }