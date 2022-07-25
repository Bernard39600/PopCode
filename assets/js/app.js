var ecranActif = "accueil"
window.setTimeout(() => {
    document.getElementById('loader').classList.add("displayNone")
    document.getElementById('accueil').classList.remove("displayNone")
    ecranActif = "accueil"
}, 3000);
console.log(ecranActif)
document.getElementById('jouer').addEventListener('click', function () {
    ecranActif = "jeu"
    console.log(ecranActif);
    document.getElementById('accueil').classList.add("displayNone")
    document.getElementById('jeu').classList.remove("displayNone")

    // activer zoom
    wheelzoom(document.querySelector('img.zoom'));
});

var mot = ""
var keyb = 0
var listeTrouvés = ""
var tableau = ["html", "Javascript", "CSS", "Python", "Java", "Bash",
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

// && et,   ||  ou, !== non  = <>?

window.addEventListener("keydown", function (e) {
    document.getElementById('entree2').textContent = "Entrer un nom (esc pour annuler)";
    keyb = e.key

    switch (keyb) {
        case 'Backspace':
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
        case 'Dead':
        case 'AltGraph':
        case 'CapsLock':
            //"Sans effets"
            keyb = ""
            break
        case 'Enter':
            if (mot == "") {
                keyb = ""
                document.getElementById('entree').textContent = "";
                document.getElementById('entree2').textContent = "";
            }
            break
        case 'Escape':
            mot = ""
            keyb = ""
            document.getElementById('entree').textContent = "";
            document.getElementById('entree2').textContent = "";
            break
    }

    if (keyb == 'Enter' && mot !== "") {

        for (let i = 0; i < max; i++) {
            console.log("boucle: " + i)
            if (tableauVerif.length != 0) {
                for (let i = 0; i < tableauVerif.length; i++) {
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

                console.log("tableau index: " + i + " mot: " + mot);
                mot2 = "trouvé"

                document.getElementById('entree').textContent = "";
                document.getElementById('entree2').textContent = "";
                score += 1
                document.querySelector(".pts").textContent = score + " / 27";

                tableauVerif.push(mot)
                // ajouter ds liste trouvés
                console.log("ajouter " + mot)
                listeTrouvés = listeTrouvés + mot + "  "


                // utilisation api & appel Fetch
                let div = document.querySelector(".logo-titre");
                let div2 = document.querySelector(".Descriptif");

                fetch("./assets/js/languages.json")
                    .then((reponse) => reponse.json())
                    .then((data) => {
                        div.innerHTML = `<h2>${data[i].name}</h2>
                                    <img src=${data[i].picture} /> `;
                        div2.innerHTML = `<p>${data[i].description}</p>`
                    });
                document.getElementById("modal").classList.remove('displayNone');

                this.modal.addEventListener("keydown", () => {
                    document.getElementById("modal").classList.add('displayNone');
                });
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
                if (erreur === 1) {
                    document.querySelector(".x1").style.color = "#0AEFF7";
                }
                if (erreur === 2) {
                    document.querySelector(".x2").style.color = "#0AEFF7";
                }
                if (erreur === 3) {
                    document.querySelector(".x3").style.color = "#0AEFF7";
                }
                if (erreur > 3) {
                    document.getElementById('entree').textContent = "OUPS! GAME OVER";
                    console.log("passage game over")
                    setTimeout(function () {
                        document.getElementById('entree').textContent = "";
                        ecranActif = "accueil"
                        document.getElementById('jeu').classList.add("displayNone");
                        document.getElementById('accueil').classList.remove("displayNone")
                    }, 3000);
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

/* ouverture et fermeture 'mentions legales' */
document.querySelector("#affMentions").addEventListener('click', function () {
    if (ecranActif === "accueil") {
        document.getElementById('accueil').classList.add("displayNone")
    }
    if (ecranActif === "jeu") {
        document.getElementById('jeu').classList.add("displayNone")
    }
    document.querySelector("#mentions").classList.remove('displayNone')
});

document.querySelector("#mentions").addEventListener('click', function () {
    if (ecranActif === "accueil") {
        document.getElementById('accueil').classList.remove("displayNone")
    }
    if (ecranActif === "jeu") {
        document.getElementById('jeu').classList.remove("displayNone")
    }
    document.querySelector("#mentions").classList.add('displayNone')
});

/* ouverture et fermeture 'comment jouer' */
document.querySelector("#affCommentJouer").addEventListener('click', function () {
    if (ecranActif === "accueil") {
        document.getElementById('accueil').classList.add("displayNone")
    }
    if (ecranActif === "jeu") {
        document.getElementById('jeu').classList.add("displayNone")
    }
    document.querySelector("#commentJouer").classList.remove('displayNone')
});

document.querySelector("#commentJouer").addEventListener('click', function () {
    if (ecranActif === "accueil") {
        document.getElementById('accueil').classList.remove("displayNone")
    }
    if (ecranActif === "jeu") {
        document.getElementById('jeu').classList.remove("displayNone")
    }
    document.querySelector("#commentJouer").classList.add('displayNone')
});

// affichage languages trouvés
document.querySelector("#languagesTrouve").addEventListener('click', function () {

    for (let i = 0; i < tableauVerif.length; i++) {
        if (tableauVerif[0] === "") {
            console.log["liste vide !"]
        }
    }
    document.getElementById('entree').textContent = listeTrouvés;
    document.getElementById('entree2').textContent = "Languages trouvés (esc pour annuler)";
});