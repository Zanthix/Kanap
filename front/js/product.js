let parameters = new URLSearchParams(window.location.search);
const id = parameters.get('id');
console.log(id);
let url = `http://localhost:3000/api/products/${id}`;
console.log(url);



fetch(url)   
  .then(response => response.json())
  .then(data => {
      console.log(data);
      //Check si l'id de la barre recherche correspond à l'id du produit
      if(data._id != id){
        console.log("ERREUR");
        return('Id non valide');
      }
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
      


      document.querySelector('#addToCart').addEventListener('click', () =>{
        const color = getValueFromField('colors');
        const quantity = parseInt(getValueFromField('quantity'));
        console.log(color,quantity);
        const product = {id, color, quantity}        
        let products = JSON.parse(localStorage.getItem('products'));
        if (products === null) {
          products = [];
        }
        for (let i = 0; i <products.length; i++) {
          if (products[i].id === id && products[i].color === color){
            console.log('Présent');
            products[i].quantity += quantity;
          }else{
            console.log('Absent');
            products.push(product);
          }
        }
        localStorage.setItem('products', JSON.stringify(products));
      })
  }).catch(error => {console.log(error)});

const getValueFromField = (id) => {
  return document.getElementById(id).value;
}






//         <div class="item__img">
           //<!--  <img src="../images/logo.png" alt="Photographie d'un canapé"> --> 
        //    </div>

             // <div class="item__content__titlePrice">
              //  <h1 id="title"><!-- Nom du produit --></h1>
               // <p>Prix : <span id="price"><!-- 42 --></span>€</p>
             // </div>

              //  <p id="description"><!-- Dis enim malesuada risus sapien gravida nulla nisl arcu. --></p>

             //     <select name="color-select" id="colors">
                     // <option value="">--SVP, choisissez une couleur --</option>
//<!--                       <option value="vert">vert</option>
                     // <option value="blanc">blanc</option> -->
                  //</select>
