let OrderId = []
let loader = document.getElementById("loader");
loader.style.visibility = "hidden"
let cartVerification = localStorage.getItem('cart')
console.log(cartVerification)
if (cartVerification == null) {
    document.getElementById('envoi').disabled = true
}


//On crée une fonction pour recuperer les données utilisateur du localstorage et remplir automatiquement le formulaire
function completedForm() {
    let form = JSON.parse(localStorage.getItem('user'));
    console.log(form.firstname);
    //On se place dans le champ ayant pour id completedFirstname et on lui assigne la valeur de form.firstname
    document.getElementById("completedFirstname").value = form.firstname;
    document.getElementById("completedLastname").value = form.lastName;
    document.getElementById("completedAddress").value = form.address;
    document.getElementById("completedCity").value = form.city;
    document.getElementById("completedMail").value = form.email;
}

//Si il y a une entrée user dans le localstorage on appelle la fonction completedForm
if (localStorage.getItem("user") != null) {
    completedForm()
}
//Fonction pour ajouter un utilisateur dans le localstorage
function addUser(contact) {
    //On crée un objet user avec les résultat du formulaire
    let user = {
        firstname: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        city: contact.city,
        email: contact.email
    }
    //On l'enregistre dans le localstorage
    localStorage.setItem("user", JSON.stringify(
        user))

}
//Fonction pour envoyer le formulaire
function mySubmitForm() {
    let myForm = document.getElementById('formOrder');
    loader.style.visibility = "visible"
    let formData = new FormData(myForm);
    document.getElementById('envoi').disabled = true;

    var message = document.getElementById("completedMail").value
    //On crée une regex
    var regex = new RegExp(`^[^\W][a-zA-Z0-9\-\._]+[^\W]@[^\W][a-zA-Z0-9\-\._]+[^\W]\.[a-zA-Z]{2,6}$`)
    console.log(message)
    //On verifie que l'adresse mail est valide grâce a la regex
    if (message.match(regex)) {
    } else {
        alert('Votre adrese mail n\'est pas valide')
    }
    //On crée un objet submitValue avec les données rempli par l'utilisateur
    const submitValue = {
        contact: {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            address: formData.get("address"),
            city: formData.get("city"),
            email: formData.get("email"),
        },

    }
    let types = JSON.parse(localStorage.getItem('cart'))
    //On crée 3 tableaux pour enregistrer les id des produits
    let arrayTeddies = [];
    let arrayFurniture = [];
    let arrayCameras = [];
    //On utilise une boucle pour récupérer chaque types de produit 
    for (var i in types.items) {
        let type = types.items[i].type
        console.log(type)
        //Condition pour verifier chaque type et ajouter l'id au tableau correspondant
        if (types.items[i].type == 'furniture') {
            arrayFurniture.push(types.items[i].id)
            localStorage.setItem("Ids", JSON.stringify(
                arrayFurniture
            ))
            console.log(arrayFurniture)
        }
        else if (types.items[i].type == 'teddies') {
            arrayTeddies.push((types.items[i].id))
            localStorage.setItem("Ids", JSON.stringify(
                arrayTeddies
            ))
            console.log(arrayTeddies)
        }
        else if (types.items[i].type == 'cameras') {
            arrayCameras.push((types.items[i].id))
            localStorage.setItem("Ids", JSON.stringify(
                arrayCameras
            ))
            console.log(arrayCameras)
        }
    }
    OrderId = [];
    //Si le tableau arrayTeddies n'est pas vide
    if (arrayTeddies != 0) {
        //On enregistre le tableau arrayTeddies dans un nouvel objet products du submitValue
        submitValue.products = arrayTeddies
        console.log(submitValue)
        //On appelle la fonction contactForm avec l'URL en paramètre ainsi que l'objet submitValue
        contactForm('http://localhost:3000/api/teddies/order', submitValue)
    }
    if (arrayFurniture != 0) {
        submitValue.products = arrayFurniture
        console.log(submitValue)
        contactForm('http://localhost:3000/api/furniture/order', submitValue)
    }
    if (arrayCameras != 0) {
        submitValue.products = arrayCameras
        console.log(submitValue)
        contactForm('http://localhost:3000/api/cameras/order', submitValue)
    }
    //On appelle la fonction addUser avec l'objet contact en paramètre
    addUser(submitValue.contact)
    console.log(submitValue)
    if (document.getElementById('total') == undefined){
        document.getElementById('envoi').disabled = false
        alert('Vous n\'avez aucun produit dans votre panier')
    }
    loader.style.visibility = "hidden"
}
//Fonction contactForm
async function contactForm(url, submitValue) {
    try {
        let result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(submitValue),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if (result.ok) {
            console.log(result);
            let response = await result.json()
            console.log(response)
            //On push l'orderId dans le tableau du même nom
            OrderId.push(response.orderId);
            console.log(OrderId)
            //On enregistre ce tableau dans le localstorage
            localStorage.setItem("orderId", JSON.stringify(OrderId))
            console.log(result)
            //On dirige l'utilisateur vers la page de confirmation
            window.location = "confirmation.html"
        } else { //Si le serveur renvoi une erreur, on previent l'utilisateur
            alert('Une erreur est survenu pendant la réponse du serveur, veuillez réessayer')
            loader.style.visibility = "hidden"
            document.getElementById('envoi').disabled = false;
        }
    } catch (error) { //Si il y a une erreur au niveau du réseau on previent l'utilisateur aussi
        loader.style.visibility = "hidden"
        document.getElementById('envoi').disabled = false;
        alert("Une erreur est survenue, veuillez réessayer plus tard.")
    }
}


let form = document.getElementById("formOrder")
//On ajoute un ecouteur d'evenement pour verifier que le document HTMl sois completement chargé
document.addEventListener("DOMContentLoaded", function () {
    displayCart()
    totalCart()
    //On verifie que la panier existe
})
//On ajoute un autre ecouteur d'evenement sur la variable form pour ecouter le submit du formulaire
form.addEventListener("submit", function (e) {
    e.preventDefault()
    mySubmitForm()
})