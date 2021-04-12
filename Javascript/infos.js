const urlParams = new URLSearchParams(window.location.search);
let type = urlParams.get('type');
let id = urlParams.get('id');
console.log(type, id);



async function info() {
    //On ouvre une nouvelle connexion avec fetch en récuperant type et id dans l'URL
    let response = await fetch('http://localhost:3000/api/' + type + '/' + id, {
        //On precise la méthode GET ou POST
        method: 'GET',
        header: {
            //On précise les en-tete
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    //On verifie la reponse du serveur
    if (response.ok == true); {
        let choice = []
        //On recupere la réponse au format JSON
        const resultats = await response.json()
        console.log(resultats)
        //On cree une condition; si le type est teddies, on cree un tableau avec le choix des personnalisations
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
        
        let options = choice.map(option => {
            return `<option value="${option}">${option}</option>`
        })
        //On crée la classe div comme on la souhaite
        informations.innerHTML = `
        <div class="card border-primary shadow">
            <img class="card-img-top" src="${resultats.imageUrl}" alt="Présentation" width="100%">
            <div class="card-body">
                <h5 class="card-title">${resultats.name}</h5>
                <p class="card-text">Prix: ${resultats.price / 100} euros</p>
                <p class="card-text">Description: <br> ${resultats.description}</p>
                <p class="card-text" id="option">Personnalisation:</p>
                
                <SELECT id="personnalisation" NAME="color">
                    ${options}
                </SELECT> <br>
               
                <button id="bouton" class="btn btn-secondary mb-4" role="button" 
               > Ajouter au panier </button>
            </div>
        </div>
        <hr>
    `
        informations.className = "col-12 col-lg-4 col-sm-12";
        display.className = "col-sm-12"
        display.appendChild(informations);
        var bouton = document.getElementById("bouton");
        //On ajoute un ecouteur d'evenement sur le bouton pour ajouter au panier
        bouton.addEventListener('click', function () {
            let choice = document.getElementById('personnalisation').value;
            addToCart(resultats.name, resultats.price, resultats._id, resultats.imageUrl, choice);

        });
    }
    
}

info()
