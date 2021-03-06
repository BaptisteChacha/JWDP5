//Fonction  pour confirmer la commande
function confirm() {
    let quantificateur;
    let utilisateurs = JSON.parse(localStorage.getItem("user"));
    let price_total = JSON.parse(localStorage.getItem("cart"));
    let resume = document.getElementById('resume');
    let OrderId = JSON.parse(localStorage.getItem('orderId'))
    //On teste si il y a un ou plusieurs orderId
    if (OrderId.length == 1) {
        quantificateur = "votre"
    }
    else if (OrderId.length >= 2) {
        quantificateur = "vos"
    }
    //On crée un petit message recapitulatif pour l'utilisateur
    resume.innerHTML = `Bonjour ${utilisateurs.firstname} ${utilisateurs.lastName}. <br> 
    Nous vous confirmons votre commande pour un montant de <span> ${price_total.total / 100} € </span>. <br>
    Voici ${quantificateur} numero de commande: <br/> - ${OrderId.join('<br/> - ')}. <br> <br>
    <div class = "livraison"> <strong> Votre lieu de livraison: </strong> <br> ${utilisateurs.address} ${utilisateurs.city} </div> <br>
    Nous vous remerçions pour votre commande. A très bientôt <br> <br>
    <img id="fb" alt="fb" src="images/fb_logo.png">
    <img id="twitter" alt="twitter" src="images/twitter_logo.png">
    <img id="insta" alt="insta" src="images/insta_logo.png">`
    //Une fois arriver sur cette page et après avoir affiché le message on efface le localstorage
    localStorage.removeItem('cart')
    localStorage.removeItem('orderId')
    localStorage.removeItem('Ids')
}
//On appelle la fonction confirm
confirm()
