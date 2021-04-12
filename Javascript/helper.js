function displayProduct(url) {
    httpRequest = new XMLHttpRequest()

    httpRequest.onreadystatechange = function () {
        const urlParams = new URLSearchParams(window.location.search);
        //Récuperer la variable produit depuis URL
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
                //On crée la div comme on la souhaite
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
    //Si un produit est different de undefined, on l'incrémente de 1
    if (localS.items[name + "__" + color] != undefined) {
        localS.items[name + "__" + color].quantity++;
    } else { //Sinon on ajoute ce produit au panier avec toutes les infos nécessaires
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
    //On calcule le prix total
    localS.total = localS.total + price
    localStorage.setItem("cart", JSON.stringify(
        localS
    ))
alert('Produit ajouté au panier')
}
//Test function removeCart
function removeToCart(name, price, id, imageUrl, color) {
    //On crée une variable avec les résultat du panier
    let localS = JSON.parse(localStorage.getItem("cart"));
    price = parseFloat(price)
    if (localS.items[name + "__" + color] != undefined) {
        localS.items[name + "__" + color].quantity--;
    } // On enlèvre le prix de l'element supprimé du prix total
    localS.total = localS.total - price;
    //Si la quantité du produit est egal a 0, on le supprime du panier
    if (localS.items[name + "__" + color].quantity == 0) {
        delete localS.items[name + "__" + color]
    } 
    if (localStorage.cart.total == '0'){
        localStorage.removeItem('cart')
        console.log(localStorage.cart.total)
    }
    //Si le panier est vide, on desactive la bouton confirmer
    localStorage.setItem("cart", JSON.stringify(localS))
}

//Fonction pour afficher le panier
const displayCart = () => {
    //On recupère le panier
    let localS = JSON.parse(localStorage.getItem("cart"))
    const cart = document.getElementById('resultat')
    cart.innerHTML = '';
    // On crée une boucle pour passer en revue tout les items
    for (let i in localS.items) {
        //On enregistre chaque item dans une variable element
        let element = localS.items[i];
        //On remplace tout les espace dans le nom et la couleur par des underscore et on enregistre dans la variable id
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

        produit.className = "col-12"
        cart.appendChild(produit)
        //On enregistre le bouton pour ajouter ainsi que la variable qui contient le produit dans une autre variable
        var add = document.getElementById("btn_add" + id);
        var less = document.getElementById("btn_less" + id);
        //On ecoute si l'evenement click a lieu sur le bouton add
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
    }
}



//Fonction pour calculer le prix total
const totalCart = () => {
    const totalPrice = document.getElementById('total')
    const cart = JSON.parse(localStorage.getItem("cart"))
    totalPrice.innerHTML = '';
    let prices = document.createElement('div')
    //On crée la classe div comme on la souhaite
    prices.innerHTML = ` <p class="card-text"> <strong>Prix total: </strong> ${cart.total / 100}€`
    prices.className = "col-12"
    totalPrice.appendChild(prices)
    if (cart.total == '0'){
        document.getElementById("envoi").disabled = true
    }
}