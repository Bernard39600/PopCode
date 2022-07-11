// function upc() {
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
})
 