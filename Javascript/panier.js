let OrderId = []
let loader = document.getElementById("loader");
loader.style.visibility = "hidden"

function completedForm() {
    let form = JSON.parse(localStorage.getItem('user'));
    console.log(form.firstname);
    document.getElementById("completedFirstname").value = form.firstname;
    document.getElementById("completedLastname").value = form.lastName;
    document.getElementById("completedAddress").value = form.address;
    document.getElementById("completedCity").value = form.city;
    document.getElementById("completedMail").value = form.email;
}


if (localStorage.getItem("user") != null) {
    completedForm()
}
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
function mySubmitForm() {
    let myForm = document.getElementById('formOrder');
    loader.style.visibility = "visible"
    let formData = new FormData(myForm);
    document.getElementById('envoi').disabled = 'disabled';

    var message = document.getElementById("completedMail").value
    var regex = new RegExp(`var regex = ^[^\W][a-zA-Z0-9\-\._]+[^\W]@[^\W][a-zA-Z0-9\-\._]+[^\W]\.[a-zA-Z]{2,6}$`)
    console.log(message)
    if (message.match(regex)) {
        console.log('Salut')
    } else {
        console.log('Faux')
    }

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
    OrderId = [];
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
    window.location = "confirmation.html"
}

async function contactForm(url, submitValue) {
    let result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(submitValue),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    //.catch(error => alert("Erreur : " + error));
    if (Response.ok == true) {
        let response = await result.json()
        console.log(response)
        OrderId.push(response.orderId);
        localStorage.setItem("orderId", JSON.stringify(OrderId))
    }
    else {
        alert("Une erreur est survenue, veuillez réessayer plus tard.")
        console.log(result)
    }
}

let form = document.getElementById("formOrder")
document.addEventListener("DOMContentLoaded", function () {
    displayCart()
    totalCart()
})
form.addEventListener("submit", function (e) {
    e.preventDefault()
    mySubmitForm()
})