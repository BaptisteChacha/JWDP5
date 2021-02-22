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
    let cart = JSON.stringify(localStorage.getItem("cart"))
    /*let itemsID = cart.items.map((item) => {
        return item.id

    })*/
    const submitValue = {
        contact: {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            address: formData.get("address"),
            city: formData.get("city"),
            email: formData.get("email"),
        },
        //   products: [...itemsID]
        //  console.log(contact, products)
    }
    //contactForm("http://localhost:3000/api/" + type + "/order", submitValue)
    addUser(submitValue.contact)
    console.log(submitValue)
}

function contactForm(url, submitValue) {
    XHR = new XMLHttpRequest()
    //On ouvre une nouvelle connexion
    XHR.open('POST', url, true)


    XHR.onreadystatechange = function () {
        if (XHR.readyState == XMLHttpRequest.DONE && this.status == 200) {
            console.log("connexion reussi")

        }
    }

    XHR.send(JSON.stringify(submitValue))
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
    e.preventDefault()
    MonSubmitForm()
})

let types = localStorage.getItem('cart')
let test = JSON.parse(localS)
//console.log(test.items.type)
/*
if (obj.items.type == 'teddies'){
    var arrayTeddies = []
    console.log(arrayTeddies)
 } else if ( localS.items.type == 'furniture'){
     var arrayFurniture = []
     console.log(arrayFurniture)
 } else if ( localS.items.type == 'cameras') {
     var arrayCameras = []
     console.log(arrayCameras)
 }*/

 for(var i in types){
if(types.items[i].type == 'furniture'){
    var arrayFurniture = []
     console.log(arrayFurniture)
}
 }