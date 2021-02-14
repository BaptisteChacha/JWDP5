
/*const urlParams = new URLSearchParams(window.location.search);
const types = urlParams.get('type');
document.addEventListener("DOMContentLoaded", function () {
    Info('http://localhost:3000/api/' + types + '/order')
})*/


function resumed() {
let utilisateurs = JSON.parse(localStorage.getItem("User"));
let price_total = JSON.parse(localStorage.getItem("cart"));
let resume = document.getElementById('resume');
console.log(utilisateurs.User.firstname)
    resume.innerHTML=`Bonjour ${utilisateurs.User.firstname} ${utilisateurs.User.lastName}. <br> 
    Nous vous confirmons votre commande pour un montant de ${price_total.total/100} €. <br>
    Votre numero de commande est le  `
}
resumed()