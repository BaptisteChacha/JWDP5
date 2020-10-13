function afficherResultat() {
    console.log(localStorage.getItem("cart"))
}


function displayProduct(url) {
    httpRequest = new XMLHttpRequest()

    httpRequest.onreadystatechange = function () {
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
                    <img class=”card-img-top” src="${element.imageUrl}" alt="Présentation" width="100%">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">Prix: ${element.price / 100} euros</p>
                        <button class="btn btn-secondary mb-4" role="button" 
                        onClick="addToCart('${element.name}', '${element.price}', '${element._id}'); afficherResultat()">Ajouter au panier</button>
                        
                    </div>
                </div>
            `
                product.className = "col-12 col-lg-4"
                productDiv.appendChild(product)

                let total = document.createElement('div')
                //On crée la classe div comme on la souhaite
                total.innerHTML = (localStorage.getItem('cart'))
                total.className = "col-12 col-lg-4"
                productDiv.appendChild(total)
            });

        }
    }
    //On ouvre une nouvelle connexion
    httpRequest.open('GET', url, true)
    httpRequest.send()
}


function addToCart(name, price, id) {
    //On crée une variable avec les résultat du panier
    const localS = localStorage.getItem("cart")
    price = parseFloat(price)
    //Condition si panier vide, le créer
    if (localS == null) {
        localStorage.setItem("cart", JSON.stringify({
            items: [],
            total: 0
        }))
        //On enregistre le panier
        localS = localStorage.getItem("cart")
    }

    var data = JSON.parse(localS)
    data.items.push({
        name: name,
        price: price,
        id: id
    }
    )
    data.total = data.total + price
    localStorage.setItem("cart", JSON.stringify(
        data

    ))
}
const displayCart = () => {
    let localS = JSON.parse(localStorage.getItem("cart"))
    const panier = document.getElementById('resultat')
    //affichage du panier sur la page panier
    localS.items.forEach(element => {
        //On affiche ces éléments dans la console
        console.log(element)
        //On crée une nouvelle div
        let produit = document.createElement('div')
        //On crée la classe div comme on la souhaite
        produit.innerHTML = `
    <div class="card border-primary shadow">
        <img class=”card-img-top” src="${element.imageUrl}" alt="Présentation" width="100%">
        <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">Prix: ${element.price / 100} euros</p>
        </div>
    </div>
`
        produit.className = "col-12 col-lg-4"
        panier.appendChild(produit)
    })
}

const totalPrice = document.getElementById('total')
let prices = document.createElement('div')
prices.innerHTML = data.total