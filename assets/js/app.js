// function que-sur-pc() {
//     resolution< ? then =>
//     alert("Uniquement sur PC");
// }

window.setTimeout(() => {
    //<section id=loader> desactiver
    document.getElementById('loader').classList.add("displayNone")
    //<section id="acceuil" class="displayNone"> activer
    document.getElementById('accueil').classList.remove("displayNone")

}, 1000);

document.getElementById('jouer').addEventListener('click', function(){
        
    console.log("nouvelle partie");
    document.getElementById('accueil').classList.add("displayNone")
    document.getElementById('jeu').classList.remove("displayNone")
    // activer zoom
    wheelzoom(document.querySelector('img.zoom'));
})

var mot = ""
var keyb = 0
var tableau = ["HTML", "Javascript", "CSS", "Python", "Java", "Bash",
    "PowerShell", "C#", "PHP", "C++", "TypeScript", "C", "Objective-C", "Ruby", "Go",
    "Assembly", "Swift", "Kotlin", "R", "VBA", "Scala", "Rust",
    "Dart", "Elixir", "Clojure", "WebAssembly", "SQL"
]
// var tableau=[]
/* remplis 'tableau' avec languages.json*/
// fetch("./assets/js/languages.json")
//     .then((reponse) => reponse.json())
//     .then((data) => {

//         for (i = 0; i < data.length; i++) {
//             console.log(i+" "+(data[i].name))
//             tableau[i] = `${data[i].name}`;
//         }
//     });
var tableauVerif = []
let score = 0;
let erreur = 0;
let mot2 = "";
let longueurMot = 0;
let max = tableau.length
console.log("taille tableau: " + tableau.length);

// && et,   ||  ou, !== non  = <>?

window.addEventListener("keydown", function (e) {
    document.getElementById('entree2').textContent = "Entrer un nom (esc pour annuler)";
    keyb = e.key

    switch (keyb) {
        case 'Backspace':
            console.log("effacer 1 caractere");
            mot = mot.slice(e, -1)
            longueurMot = longueurMot - 1
            keyb = ""
            break
        case 'Tab':
        case 'Shift':
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'ArrowDown':
        case 'NumLock':
        case 'Control':
        case 'Alt':
        case 'CapsLock':
            console.log("Sans effets");
            keyb = ""
            break
        case 'Enter':
            if (mot == "") {
                console.log("Mot vide")
                keyb = ""
            }
            break
        case 'Escape':
            mot = ""
            keyb = ""
            console.log("Mot effacé")
            document.getElementById('entree').textContent = "";
            document.getElementById('entree2').textContent = "";
            break
    }

    if (keyb == 'Enter' && mot !== "") {
        console.log('mot entré: ' + mot)

        for (let i = 0; i < max; i++) {
            if (tableauVerif.length > 0) {
                for (let j = 0; i < tableauVerif.length; i++) {
                    if (mot.toLowerCase() == tableauVerif[i].toLowerCase()) {
                        console.log("déja trouvé !!")
                        document.getElementById('entree').textContent = "Déja trouvé!";
                        mot2 = "deja";

                        setTimeout(function () {
                            document.getElementById('entree').textContent = "";
                            document.getElementById('entree2').textContent = "";
                        }, 1000);
                        break
                    }
                }
            }

            // tolowercase: en min & touppercase en maj
            if (mot.toLowerCase() == tableau[i].toLowerCase() && mot2 !== "deja") {

                console.log(" ds le tableau, index: " + i);
                mot2 = "trouvé"

                document.getElementById('entree').textContent = "";
                document.getElementById('entree2').textContent = "";
                score += 1
                console.log("Score " + score);
                /*pts*/
                document.querySelector(".pts").textContent=score+"/27";

                tableauVerif.push(mot)

                // utilisation api & appel Fetch
                let div = document.querySelector(".logo-titre");
                let div2 = document.querySelector(".Descriptif");

                console.log(" tableau index: " + i + " mot: " + mot);
                
                fetch("./assets/js/languages.json")
                    .then((reponse) => reponse.json())
                    .then((data) => {
                       div.innerHTML = `<h2>${data[i].name}</h2>
                                    <img src=${data[i].picture} /> `;
                        div2.innerHTML = `<p>${data[i].description}</p>`
                    });

                document.getElementById("modal").classList.toggle('displayNone');

                // ajouter 'entree' pour quitter modale (avec else?)
                this.modal.addEventListener("click", () => {
                    document.getElementById("modal").classList.add('displayNone');
                });
                break
            }
        }
        if (mot2 !== "trouvé" && mot2 !== "deja") {
            document.getElementById('entree').textContent = "Mauvaise réponse!";
            setTimeout(function (s) {
                document.getElementById('entree').textContent = "";
                document.getElementById('entree2').textContent = "";

                erreur += 1
                console.log("Erreur: " + erreur);

                /* croix */
                if (erreur===1) {
                    document.querySelector(".x1").style.color="#0AEFF7";      
                }
                if (erreur===2) {
                    document.querySelector(".x2").style.color="#0AEFF7";                   
                }
                if (erreur > 2) {
                    document.querySelector(".x3").style.color="#0AEFF7";
                    document.querySelector('.entree').textContent = "GAME OVER";
                    setTimeout(function () {
                        document.getElementById('entree').textContent = "";
                    }, 1000);
                }
            }, 1000);
        }
        mot = ""
        mot2 = ""
        keyb = ""
    } else if (longueurMot < 15) {
        mot = mot + keyb
        document.getElementById('entree').textContent = mot;
        longueurMot = mot.length;
    }
});
// mentions

document.querySelector("#affMentions").addEventListener('click', function(){
    console.log("passage...")
    document.querySelector("#mentions").classList.toggle('displayNone');
});
