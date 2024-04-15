/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction lance le jeu. 
 **/
function lancerJeu () {
    // Initialisations
    initAddEventListenerPopup();
    let score = 0;
    let nbMotsProposes = 0;
    let listeProposition = listeMots;

    // Choix entre mots ou phrases
    let listeBtnRadio = document.querySelectorAll(".optionSource input[type='radio']");
    for (let y = 0; y < listeBtnRadio.length; y++) {
        listeBtnRadio[y].addEventListener("change", (event) => {
            if (event.target.id === "phrases") {
                listeProposition = listePhrases;
                score = 0;
                nbMotsProposes = 0;
                afficherResultat(score, nbMotsProposes);
                btnValiderMot.disabled = false;
                inputEcriture.disabled = false;
                afficherProposition(listeProposition[nbMotsProposes]);
            } else {
                listeProposition = listeMots;
                score = 0;
                nbMotsProposes = 0;
                afficherResultat(score, nbMotsProposes);
                btnValiderMot.disabled = false;
                inputEcriture.disabled = false;
                afficherProposition(listeProposition[nbMotsProposes]);
            };
        });
    };

    // Saisie et comptage des points
    let btnValiderMot = document.getElementById("btnValiderMot");
    let inputEcriture = document.getElementById("inputEcriture");
    afficherProposition(listeProposition[nbMotsProposes]);
    afficherResultat(score, nbMotsProposes);

    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === listeProposition[nbMotsProposes]) {
            score++
        };
        nbMotsProposes++;
        affichageScore = afficherResultat(score, nbMotsProposes);
        inputEcriture.value = "";

        if (listeProposition[nbMotsProposes] === undefined) {
            afficherProposition("Le jeu est fini");
            btnValiderMot.disabled = true;
            inputEcriture.disabled = true;

        } else {
            afficherProposition(listeProposition[nbMotsProposes]);
        };
    });

    // Envoi du formmulaire par mail
    let form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let scoreEmail = `${score} / ${nbMotsProposes}`;
        gererFormulaire (scoreEmail);
    });
};



/**
 * Cette fonction affiche le mot à recopier.
 * @param {string} mot : affiche le mot ou la phrase proposé(e)
 **/
function afficherProposition(mot) {
    let zoneProposition = document.querySelector(".zoneProposition");
    zoneProposition.innerText = mot;
};


/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots ou phrases proposé(e)s à l'utilisateur
 **/
function afficherResultat (score, nbMotsProposes) {
    let spanScore = document.querySelector(".zoneScore span");
    let affichageScore = `${score} / ${nbMotsProposes}`;
    spanScore.innerText = affichageScore;
};


/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score
 */
function afficherEmail(nom, email, scoreEmail) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, c'est ${nom} et je viens de réaliser le score de ${scoreEmail} sur le site d'Azertype !`;
    location.href = mailto;
};


/**
 * Cette fonction vérifie si le nom respecte les conditions de validité du nom.
 * @param {string} nom : le nom du joueur
 * @throws {Error} 
 */
function validerNom (nom) {
    let regexNom = new RegExp("[a-zA-Z_-]{2,}");
    if (!regexNom.test(nom)) {
        throw new Error("Le nom n'est pas valide.");
    };
};


/**
 * Cette fonction vérifie si l'email respecte les conditions de validité de l'email.
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @throws {Error} 
 */
function validerEmail (email) {
    let regexEmail = new RegExp("[a-z0-9._-]{2,}@[a-z0-9._-]{2,}\.[a-z0-9._-]{2,}");
    if (!regexEmail.test(email)) {
        throw new Error("Merci de saisir une adresse email valide.");
    };
};


/**
 * Cette fonction gère le formulaire d'envoi de l'email.
 * @param {string} scoreEmail : score / nbMotsProposes
 **/
function gererFormulaire (scoreEmail) {
    try { 
        let nom = document.getElementById("nom").value;
        validerNom(nom);

        let email = document.getElementById("email").value;
        validerEmail(email);
        
        afficherMessageErreur("");
        afficherEmail(nom, email, scoreEmail);
    } catch (erreur) {
        afficherMessageErreur(erreur.message);
    };
};


/**
 * Cette fonction affiche une erreur survenue dans le formulaire d'envoi de l'email.
 * @param {string} messageErreur : message d'erreur.
 **/
function afficherMessageErreur(messageErreur) {
    let spanMessageErreur = document.getElementById("erreurMessage");

    if(!spanMessageErreur){
        let divPopup = document.querySelector(".popup");
        spanMessageErreur = document.createElement("span");
        spanMessageErreur.id = "erreurMessage";
        divPopup.append(spanMessageErreur);
    };

    spanMessageErreur.innerText = messageErreur;
};