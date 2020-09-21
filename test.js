function displayProduct(url) {
    var httpRequest = new XMLHttpRequest()

httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4) {
        const results = JSON.parse(httpRequest.responseText)
        const productDiv = document.getElementById('product')
        results.forEach(element => {
            console.log(element)
            let product = document.createElement('H1')
            product.innerHTML = 
            "onClick=console.log(localS)>Voir le panier</button>"
            productDiv.appendChild(product)

        });
    }
}
httpRequest.open('GET', url, true)
httpRequest.send()
} 


function addToCart(name, price, id) {
    var localS = localStorage.getItem("cart")
    price=parseFloat(price)
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
