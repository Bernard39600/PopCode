// function upc() {
//     alert("Uniquement sur PC");
// }


window.setTimeout(() => {

    //<section id=loader> desactiver
    document.getElementById('loader').classList.add("displayNone")

    //<section id="acceuil" class="displayNone"> activer
    document.getElementById('accueil').classList.remove("displayNone")


}, 2000);