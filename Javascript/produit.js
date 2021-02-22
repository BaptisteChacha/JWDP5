
const urlParams = new URLSearchParams(window.location.search);
const product = urlParams.get('product');
document.addEventListener("DOMContentLoaded", function () {
    switch (product) {
        case "teddies":
            displayProduct(/*fetch(*/'http://localhost:3000/api/teddies')
          /*  .then(response => response.json())
            .then(response => alert(JSON.stringify(response)))
            .catch(error => alert("Erreur : " + error)));*/
            break;
        case "furniture":
            displayProduct('http://localhost:3000/api/furniture')
            break;
        case "cameras":
            displayProduct('http://localhost:3000/api/cameras')
            break;
        default:
            alert("aucun produit trouvé")
            break;
    }
})
