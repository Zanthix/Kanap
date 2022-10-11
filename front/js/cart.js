//Récupération du local Storage
let products = JSON.parse(localStorage.getItem('products'));
console.log(products);
const productIds = products.map(product => product.id);
console.log(productIds);

//Comptage du nombre total d'objets
let totalItems = 0;
for (let items of products){
  totalItems += items.quantity;
  console.log(totalItems);
}

//Gestion du panier
let price = 0;

document.addEventListener('DOMContentLoaded', () => {
  display();
  console.log(price);
})



const display = () => {
  let affichage = "";
  let url = `http://localhost:3000/api/products`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        for(let product of data){
          if(productIds.find(id => id === product._id)){
            const storedProduct = products.find(item => item.id === product._id);
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
        </article>`
          }
        }
        document.querySelector('#cart__items').innerHTML = affichage;
        document.querySelectorAll('.itemQuantity').forEach(input => {
          addEventListener('change', (e) => {
          console.log(e.target.value);
        })})
      })
  /*for(let product of products){
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
        document.querySelector('#cart__items').innerHTML = affichage;
        document.querySelector('#totalQuantity').innerHTML = totalItems;
        document.querySelector('#totalPrice').innerHTML = price;
        console.log(document.querySelector(`.cart__item[data-id="${data._id}"] .itemQuantity`));
        document.querySelector(`.cart__item[data-id="${data._id}"] .itemQuantity`).addEventListener('change', (e) => {
          console.log(e.target.value);
        })    
      }
    )
  }*/
  
}

//Messages d'erreur du formulaire
document.querySelector('#firstName').addEventListener('change', () => {
  let check = "";
  let valeur = document.getElementById('firstName').value;
  if(valeur.match(/[0-9&"'(_ç)=]/)){
    check += `Erreur dans le prénom`; 
  }
  document.querySelector('#firstNameErrorMsg').innerHTML = check;
})
document.querySelector('#lastName').addEventListener('change', () => {
  let check = "";
  let valeur = document.getElementById('lastName').value;
  if(valeur.match(/[0-9&"'(_ç)=]/)){
    check += 'Erreur dans le nom';  
  }
  document.querySelector('#lastNameErrorMsg').innerHTML = check;
})
document.querySelector('#address').addEventListener('change', () => {
  let check = "";
  let valeur = document.getElementById('address').value;
  if(valeur.match(/["(_)=]/)){
    check += `Erreur dans l'adresse`; 
  }
  document.querySelector('#addressErrorMsg').innerHTML = check;
})
document.querySelector('#city').addEventListener('change', () => {
  let check = "";
  let valeur = document.getElementById('city').value;
  if(valeur.match(/[0-9&"(_)=]/)){
    check += `Erreur dans le nom de la ville`;  
  }
  document.querySelector('#cityErrorMsg').innerHTML = check;
})
document.querySelector('#email').addEventListener('change', () => {
  let check = "";
  let valeur = document.getElementById('email').value;
  if(!valeur.match(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/)){
    check += `Erreur dans l'email`;   
  }
  document.querySelector('#emailErrorMsg').innerHTML = check;
})


/*document.querySelectorAll('.itemQuantity').forEach(item => {
      addEventListener('change', (e) => {
        console.log(e.target.value);
      })
    })*/