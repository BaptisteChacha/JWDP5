const urlParams = new URLSearchParams(window.location.search);
//On cherche l'element product dans l'URL
const product = urlParams.get('product');
//On crée un ecouteur d'evenement pour verifier que le document HTML sois bien chargé 
document.addEventListener("DOMContentLoaded", function () {
    switch (product) {
        //Si l'element product de l'URL vaut teddies, on charge l'URL correspondante
        case "teddies":
            displayProduct('http://localhost:3000/api/teddies')
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
