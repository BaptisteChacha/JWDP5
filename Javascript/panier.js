function addUser(contact) {
    //On crée une variable avec les résultat du panier
    let user = {
        firstname: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        city: contact.city,
        email: contact.email
    }
    localStorage.setItem("user", JSON.stringify(
        user))

}
function MonSubmitForm() {
    let myForm = document.getElementById('formOrder');
    let formData = new FormData(myForm);

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

    let arrayTeddies = [];
    let arrayFurniture = [];
    let arrayCameras = [];

    for (var i in types.items) {
        let type = types.items[i].type
        console.log(type)
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
    if (arrayTeddies != 0) {
        submitValue.products = arrayTeddies
        contactForm('http://localhost:3000/api/teddies/order', submitValue)
    }
    if (arrayFurniture != 0) {
        submitValue.products = arrayFurniture
        contactForm('http://localhost:3000/api/furniture/order', submitValue)
    }
    if (arrayCameras != 0) {
        submitValue.products = arrayCameras
        contactForm('http://localhost:3000/api/cameras/order', submitValue)
    }
    addUser(submitValue.contact)
    console.log(submitValue)
}

function contactForm(url, submitValue) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(submitValue),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

    })
        .then(response => response.json())
        .then(response => localStorage.setItem("orderId", response.orderId))
        .catch(error => alert("Erreur : " + error));

}
/*var send = document.getElementById('envoi');
send.addEventListener('click', function () {
    addUser();
});*/
let form = document.getElementById("formOrder")
document.addEventListener("DOMContentLoaded", function () {
    displayCart()
    totalCart()
})
form.addEventListener("submit", function (e) {
   // e.preventDefault()
    MonSubmitForm()
})