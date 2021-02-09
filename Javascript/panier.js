const urlParam = new URLSearchParams(window.location.search);
const type = urlParam.get('type');
const id = urlParam.get('id');
console.log(type)

function addUser(contact) {
    //On crée une variable avec les résultat du panier
    const Users = localStorage.getItem("User")
    //Condition si panier vide, le créer
    if (Users == null) {
        localStorage.setItem("User", JSON.stringify({
            Users: [],
        }))
        //On enregistre le panier
        Users = localStorage.getItem("User")
    }

    let datas = JSON.parse(Users)
    datas.User = {
        firstname: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        city: contact.city,
        email: contact.email
    }
    localStorage.setItem("User", JSON.stringify(
        datas))

    console.log(contact/*, products*/)
    //console.log(datas)
}
function MonSubmitForm() {
    let myForm = document.getElementById('products');
    let formData = new FormData(myForm);
    let cart = JSON.parse(localStorage.getItem("cart"))
    /* let itemsID = cart.items.map((item) => {
         return item.id*/

    //})
    const submitValue = {
        contact: {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            address: formData.get("address"),
            city: formData.get("city"),
            email: formData.get("email"),
        },
        //   products: [...itemsID]
    }
    contactForm("http://localhost:3000/api/" + type + "/order", submitValue)
    addUser(submitValue.contact)
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

document.addEventListener("DOMContentLoaded", function () {
    displayCart()
    totalCart()
})
