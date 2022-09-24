let parameters = new URLSearchParams(window.location.search);
const id = parameters.get('id');
console.log(id);
let url = `http://localhost:3000/api/products/${id}`;
console.log(url);



fetch(url)   
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data._id != id){
          console.log("ERREUR");
          return('Id non valide');
        }
        let options = `<option value="">--SVP, choisissez une couleur --</option>`;
        let picture = `<img src="${data.imageUrl}" alt="${data.altTxt}"> `;
        let nameProduit = `<h1 id='title'>${data.name}</h1>`;
        let price = `<span id="price">${data.price}</span>`;
        let desc = `<p id="description">${data.description}</p>`;
        for(let product of data.colors){
          options += `<option value="${product}">${product}</option>`
        }
        document.querySelector('.item__img').innerHTML = picture;
        document.querySelector('#title').innerHTML = nameProduit;
        document.querySelector('#price').innerHTML = price;
        document.querySelector('#description').innerHTML = desc;
        document.querySelector('#colors').innerHTML = options;
    }).catch(error => {console.log(error)});






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
