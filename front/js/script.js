let url = `http://localhost:3000/api/products`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        let affichage = "";
        for (let product of data){
            affichage += `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`
        }
        document.querySelector("#items").innerHTML = affichage;
    })
    .catch(error => {console.error(error)});
