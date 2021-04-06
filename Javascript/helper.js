function displayProduct(url) {
    httpRequest = new XMLHttpRequest()

    httpRequest.onreadystatechange = function () {
        //Récuperer la variable produit depuis URL en type GET
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('product');
        if (httpRequest.readyState == 4) {
            //On parse la reponse JSON pour pouvoir la lire
            const results = JSON.parse(httpRequest.responseText)
            //On recupère l'élément ayant pour ID "product"
            const productDiv = document.getElementById('product')
            //On créé une boucle pour chaque éléments dispo
            results.forEach(element => {
                //On affiche ces éléments dans la console
                console.log(element)
                //On crée une nouvelle div
                let product = document.createElement('div')
                //On crée la classe div comme on la souhaite
                product.innerHTML = `
                <div class="card border-primary shadow">
                    <img class="card-img-top" src="${element.imageUrl}" alt="Présentation" width="100%">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">Prix: ${element.price / 100} euros</p>
                        <a class="btn btn-secondary mb-4" role="button" 
                        href="infos.html?type=${type}&id=${element._id}"> Voir les détails </a>
                    </div>
                </div>
                <hr>
            `

                product.className = "col-12 col-lg-4"
                productDiv.appendChild(product)
                console.log(element)
                console.log(url)
            });

        }
    }
    //On ouvre une nouvelle connexion
    httpRequest.open('GET', url, true)
    httpRequest.send()
}
let localS = localStorage.getItem("cart");
let data = JSON.parse(localS)
function addToCart(name, price, id, imageUrl, color) {
    //On crée une variable avec les résultat du panier
    let localS = JSON.parse(localStorage.getItem("cart"))
    price = parseFloat(price)
    //Condition si panier vide, le créer
    if (localS == null) {
        localS = {
            items: {},
            total: 0
        };
    }
    console.log(localS.items)
    if (localS.items[name + "__" + color] != undefined) {
        localS.items[name + "__" + color].quantity++;
    } else {
        localS.items[name + "__" + color] = {
            name: name,
            price: price,
            id: id,
            imageUrl: imageUrl,
            color: color,
            quantity: 1,
            type: type,
        }
    }
    localS.total = localS.total + price
    localStorage.setItem("cart", JSON.stringify(
        localS
    ))

}
//Test function removeCart
function removeToCart(name, price, id, imageUrl, color) {
    //On crée une variable avec les résultat du panier
    let localS = JSON.parse(localStorage.getItem("cart"));
    price = parseFloat(price)
    if (localS.items[name + "__" + color] != undefined) {
        localS.items[name + "__" + color].quantity--;
    }
    localS.total = localS.total - price;
    if (localS.items[name + "__" + color].quantity == 0) {
        delete localS.items[name + "__" + color]
    }
    localStorage.setItem("cart", JSON.stringify(localS))
}


const displayCart = () => {
    let localS = JSON.parse(localStorage.getItem("cart"))
    const cart = document.getElementById('resultat')
    cart.innerHTML = '';
    //affichage du panier sur la page panier
    for (let i in localS.items) {
        //On affiche ces éléments dans la console
        let element = localS.items[i];
        let id = element.name.replace(" ", "") + "__" + element.color.replace(" ", "");
        console.log(element)
        //On crée une nouvelle div
        let produit = document.createElement('div')
        //On crée la classe div comme on la souhaite
        produit.innerHTML = `
        <div class="row">
            <div class="col-4">
             <img src="${element.imageUrl}">  </div>
                <div class="col-4">
                <h2>${element.name}</h2> <br> <h3>${element.price / 100}€</h3> <br> <h4>${element.color} <br>
                <h4 class="quantité"> quantité:  ${element.quantity}
                </div>

                <div class="col-2">
                <button  id="btn_add${id}">
                <img src="images/img_+.jpg">
                </button>
                </div>

                <div class="col-2">
                <button id="btn_less${id}">
                <img src="images/img_-.jpg">
                </button>
                </div>

                </div>  
                <hr>
`

        //Recuperation de l'ID
        //    console.log(id)
        produit.className = "col-12"
        cart.appendChild(produit)
        //test ajout quantité
        var add = document.getElementById("btn_add" + id);
        var less = document.getElementById("btn_less" + id);
        add.addEventListener("click", function () {
            addToCart(element.name, element.price, element.id, element.imageUrl, element.color)
            displayCart();
            totalCart();
        })
        less.addEventListener("click", function () {
            removeToCart(element.name, element.price, element.id, element.imageUrl, element.color)
            displayCart();
            totalCart();
        })
        let typo = element.type
        console.log(typo)
    }
}


//Test
function Info(url) {
    Request = new XMLHttpRequest()

    Request.onreadystatechange = function () {
        if (Request.readyState == 4) {
            //On parse la reponse JSON pour pouvoir la lire
            const infoResults = JSON.parse(Request.responseText)
            //On recupère l'élément ayant pour ID "product"
            const infoDiv = document.getElementById('resume')
            //On crée une nouvelle div
            let info = document.createElement('div')
            //On crée la classe div comme on la souhaite
            info.innerHTML = `
                <div class="card border-primary shadow">
                    Bonjour monsieur ${infoResults.firstname}
                    </div>
                </div>
                <hr>
            `
            info.className = "col-12 col-lg-4"
            infoDiv.appendChild(info)
        }

    }

    //On ouvre une nouvelle connexion
    Request.open('GET', url, true)
    Request.send()
}
//Fin de test

const totalCart = () => {
    const totalPrice = document.getElementById('total')
    const cart = JSON.parse(localStorage.getItem("cart"))
    totalPrice.innerHTML = '';
    let prices = document.createElement('div')
    //On crée la classe div comme on la souhaite
    prices.innerHTML = ` <p class="card-text"> <strong>Prix total: </strong> ${cart.total / 100}€`
    prices.className = "col-12"
    totalPrice.appendChild(prices)
}