let parameters = new URLSearchParams(window.location.search);
const id = parameters.get('id');
if(id === null){
  window.location.replace("index.html");
}
console.log(id);
let url = `http://localhost:3000/api/products/${id}`;
console.log(url);


fetch(url)   
  .then(response => {
    //Vérification d'id de produit et si non conforme retour à la page d'accueil
    if (!response.ok){
      window.location.replace("index.html");
    }
    return response.json()
  } )
  .then(data => {
      console.log(data);
      //Création des différentes variables à injecter dans le DOM
      let option = `<option value="">--SVP, choisissez une couleur --</option>`;
      let picture = `<img src="${data.imageUrl}" alt="${data.altTxt}"> `;
      let nameProduit = `<h1 id='title'>${data.name}</h1>`;
      let price = `<span id="price">${data.price}</span>`;
      let desc = `<p id="description">${data.description}</p>`;

      //Création des différentes options pour les couleurs de chaque produit
      for(let product of data.colors){
        option += `<option value="${product}">${product}</option>`
      }

      //Injection des différentes variables dans le DOM
      document.querySelector('.item__img').innerHTML = picture;
      document.querySelector('#title').innerHTML = nameProduit;
      document.querySelector('#price').innerHTML = price;
      document.querySelector('#description').innerHTML = desc;
      document.querySelector('#colors').innerHTML = option;
      

      //Stockage des valeurs indiquées par l'utilisateur lors de "l'ajout au panier"
      document.querySelector('#addToCart').addEventListener('click', () =>{
        const color = getValueFromField('colors');
        const quantity = parseInt(getValueFromField('quantity'));
        console.log(color,quantity);
        const product = {id, color, quantity};
        console.log(product);        
        let products = JSON.parse(localStorage.getItem('products'));
        console.log(products);
        let index = null;
        if (products === null) {
          products = [];
          products.push(product);
        }else{
          for (let i = 0; i < (products.length); i++) {
            if (products[i].id === id && products[i].color === color){
              index = i;
            }
          }
          if(index === null){
            products.push(product);
          }else{
            products[index].quantity += quantity;
          }
        }
        localStorage.setItem('products', JSON.stringify(products));
      })
  }).catch(error => {console.log(error)});
  
const getValueFromField = (id) => {
  return document.getElementById(id).value;
}