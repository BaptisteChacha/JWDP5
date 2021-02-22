const urlParams = new URLSearchParams(window.location.search);
let type = urlParams.get('type');
let id = urlParams.get('id');
console.log(type, id)


function info() {

    XHR = new XMLHttpRequest()
    //On ouvre une nouvelle connexion
    XHR.open('GET', 'http://localhost:3000/api/' + type + '/' + id , true)

    XHR.onreadystatechange = function () {
        if (XHR.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let choice = []
            //On parse la reponse JSON pour pouvoir la lire
            const resultats = JSON.parse(XHR.responseText)
            console.log(resultats)
            //On cree une condition; si le type est teddies, on cree un tableau avec le choix des couleurs
            if (type == "teddies") {
                choice = resultats.colors
            } else if (type == "cameras") {
                choice = resultats.lenses
            } else if (type == "furniture") {
                choice = resultats.varnish
            }

            //On recupère l'élément ayant pour ID "Info"
            const display = document.getElementById('Info')
            //On crée une nouvelle div
            let informations = document.createElement('div')
            //On crée la classe div comme on la souhaite

            let options = choice.map(option => {
                return `<option value="${option}">${option}</option>`
            })
            informations.innerHTML = `
        <div class="card border-primary shadow">
            <img class="card-img-top" src="${resultats.imageUrl}" alt="Présentation" width="100%">
            <div class="card-body">
                <h5 class="card-title">${resultats.name}</h5>
                <p class="card-text">Prix: ${resultats.price / 100} euros</p>
                <p class="card-text">Description: <br> ${resultats.description}</p>
                <p class="card-text" id="option">Personnalisation:</p>
                
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
            display.appendChild(informations);
            var bouton = document.getElementById("bouton");
            bouton.addEventListener('click', function () {
                let choice = document.getElementById('couleur').value;
                addToCart(resultats.name, resultats.price, resultats._id, resultats.imageUrl, choice);

            });
        }
    }
    XHR.send();
}
/*let obj = localStorage.getItem('user');
console.log(obj.address)*/
/*var array = document.getElementById('bouton')
array.addEventListener("click", function() {*/

    for(let a=0; a<5; a++){
        var array = [a]
        console.log(array)
    }
    if (type == 'teddies'){
        var arrayTeddies = []
        console.log(arrayTeddies)
        arrayTeddies.push(id)
        localStorage.setItem("Ids", JSON.stringify(
            arrayTeddies
        ))
     } else if (type == 'furniture'){
         var arrayFurniture = []
         console.log(arrayFurniture)
         arrayFurniture.push(id)
         localStorage.setItem("Ids", JSON.stringify(
            arrayFurniture
        ))
     } else if (type == 'cameras') {
         var arrayCameras = []
         console.log(arrayCameras)
         arrayCameras.push(id)
         localStorage.setItem("Ids", JSON.stringify(
            arrayCameras
        ))
     }

//});


info()
