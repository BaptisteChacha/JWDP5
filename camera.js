var httpRequest = new XMLHttpRequest()

httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4) {
        const results = JSON.parse(httpRequest.responseText)
        const productDiv = document.getElementById('product')
        results.forEach(element => {
            console.log(element)
            let product = document.createElement('div')
            product.innerHTML = `
                <div class="card border-primary shadow">
                    <img class=”card-img-top” src="${element.imageUrl}" alt="Présentation" width="100%">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">Prix: ${element.price/100} euros</p>
                        <button class="btn btn-secondary mb-4" role="button" 
                        onClick="addToCart('${element.name}', '${element.price}', '${element._id}')">Ajouter au panier</button>
                    </div>
                </div>
            `
            product.className = "col-12 col-lg-4"
            productDiv.appendChild(product)

        });
    }
}
httpRequest.open('GET', 'http://localhost:3000/api/furniture', true)
httpRequest.send()


function addToCart(name, price, id) {
    var localS = localStorage.getItem("cart")
    parseFloat(element.price)
    if (localS == null) {
        localStorage.setItem("cart", JSON.stringify({
            items: [],
            total: 0
        }))

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