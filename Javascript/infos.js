const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');
const id = urlParams.get('id');
console.log(type, id)


function info() {
    XHR = new XMLHttpRequest()
    //On ouvre une nouvelle connexion
    XHR.open('GET', 'http://localhost:3000/api/' + type + '/' + id, true)

    XHR.onreadystatechange = function () {
        if (XHR.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let choix = []
            //On parse la reponse JSON pour pouvoir la lire
            const resultats = JSON.parse(XHR.responseText)
            //On cree une condition; si le type est teddies, on cree un tableau avec le choix des couleurs
            if (type == "teddies") {
                choix = resultats.colors
            } else if (type == "cameras") {
                choix = resultats.lenses
            } else if (type == "furniture") {
                choix = resultats.varnish
            }

            //On recupère l'élément ayant pour ID "Info"
            const affichage = document.getElementById('Info')
            //On crée une nouvelle div
            let informations = document.createElement('div')
            //On crée la classe div comme on la souhaite

            let options = choix.map(option => {
                return `<option value="${option}">${option}</option>`
            })
            informations.innerHTML = `
        <div class="card border-primary shadow">
            <img class="card-img-top" src="${resultats.imageUrl}" alt="Présentation" width="100%">
            <div class="card-body">
                <h5 class="card-title">${resultats.name}</h5>
                <p class="card-text">Prix: ${resultats.price / 100} euros</p>
                <p class="card-text">Description: <br> ${resultats.description}</p>
                <p class="card-text" id="option"></p>
                
                <SELECT id="couleur" NAME="color">
                    ${options}
                </SELECT> <br>
               
                <button id="bouton" class="btn btn-secondary mb-4" role="button" 
               > Ajouter au panier </button>
            </div>
        </div>
        <hr>
    `
            //On crée la classe div comme on la souhaite
            informations.className = "col-12 col-lg-4";
            affichage.appendChild(informations);
            var bouton = document.getElementById("bouton");
            bouton.addEventListener('click', function () {
                let choice = document.getElementById('couleur').value;
                addToCart(resultats.name, resultats.price, resultats.id, resultats.imageUrl, choice);
           
            });
        }
    }
    XHR.send();
}

info()

if(type == "cameras") {
    document.getElementById("option").innerHTML = `lentilles`
} else if (type == "furniture") {
    document.getElementById("option").innerHTML = `vernis`
} else {
    document.getElementById("option").innerHTML = `couleur`
}