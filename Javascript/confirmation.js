
function confirm() {
    let utilisateurs = JSON.parse(localStorage.getItem("user"));
    let price_total = JSON.parse(localStorage.getItem("cart"));
    let resume = document.getElementById('resume');
    let orderId = JSON.parse(localStorage.getItem('orderId'))
    console.log(utilisateurs)
    resume.innerHTML = `Bonjour ${utilisateurs.firstname} ${utilisateurs.lastName}. <br> 
    Nous vous confirmons votre commande pour un montant de <span> ${price_total.total / 100} € </span>. <br>
    Votre numero de commande est le "${orderId.join(', ')}".`
}
confirm()
