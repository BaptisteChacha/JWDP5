
function confirm() {
    let utilisateurs = JSON.parse(localStorage.getItem("user"));
    let price_total = JSON.parse(localStorage.getItem("cart"));
    let resume = document.getElementById('resume');
    let OrderId = JSON.parse(localStorage.getItem('orderId'))
    console.log(utilisateurs)
    console.log(OrderId)
    resume.innerHTML = `Bonjour ${utilisateurs.firstname} ${utilisateurs.lastName}. <br> 
    Nous vous confirmons votre commande pour un montant de <span> ${price_total.total / 100} € </span>. <br>
    Votre numero de commande est le "${OrderId.join(', ')}". <br> <br>
    <div class = "livraison"> <strong> Votre lieu de livraison: </strong> <br> ${utilisateurs.address} ${utilisateurs.city} </div> <br>
    Nous vous remerçions pour votre commande, a très bientôt <br> <br>
    <img id="fb" alt="fb" src="images/fb_logo.png">
    <img id="twitter" alt="twitter" src="images/twitter_logo.png">
    <img id="insta" alt="insta" src="images/insta_logo.png">`
    
    
    /* localStorage.removeItem('cart')
     localStorage.removeItem('orderId')
     localStorage.removeItem('Ids')*/
}
confirm()
