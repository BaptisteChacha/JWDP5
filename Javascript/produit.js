
const urlParams = new URLSearchParams(window.location.search);
const product = urlParams.get('product');
document.addEventListener("DOMContentLoaded", function () {
    switch (product) {
        case "teddies":
            displayProduct(fetch('http://localhost:3000/api/teddies')
              .then(response => response.json())
              .then(response => alert(JSON.stringify(response)))
              .catch(alert("Une erreur est survenu, veuillez réessayer plus tard")));
            break;
        case "furniture":
            displayProduct(fetch('http://localhost:3000/api/furniture')
              .then(response => response.json())
              .then(response => alert(JSON.stringify(response)))
              .catch(alert("Une erreur est survenu, veuillez réessayer plus tard")));
            break;
        case "cameras":
            displayProduct(fetch('http://localhost:3000/api/cameras')
              .then(response => response.json())
              .then(response => alert(JSON.stringify(response)))
              .catch(alert("Une erreur est survenu, veuillez réessayer plus tard")));
            break;
        default:
            alert("aucun produit trouvé")
            break;
    }
})
