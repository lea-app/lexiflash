// ==============================
// SÉLECTION D’UN CORPUS
// ==============================

import {
    application
} from "./etat.js";

import {
    nomCorpus,
    modeLecture,
    selectionEpisodes
} from "./dom.js";

import {
    demarrerCorpus
} from "./corpus.js";


// ==============================
// MISE À JOUR DU MENU DE LECTURE
// ==============================

function mettreAJourMenuLecture(
    corpus
) {

    // On remet les modes classiques

    modeLecture.innerHTML = "";


    const options = [
        {
            valeur: "toutes",
            texte: "Tout le corpus"
        },
        {
            valeur: "favorisCorpus",
            texte: "Les favoris du corpus"
        },
        {
            valeur: "favorisBibliotheque",
            texte: "Tous mes favoris"
        },
        {
            valeur: "cartesMasquees",
            texte: "Les cartes masquées du corpus"
        }
    ];


    options.forEach(
        function (option) {

            const element =
                document.createElement("option");

            element.value =
                option.valeur;

            element.textContent =
                option.texte;

            modeLecture.appendChild(
                element
            );

        }
    );


    application.preferences.modeLecture =
        "toutes";

    modeLecture.value =
        "toutes";

}


// ==============================
// MISE À JOUR DES ÉPISODES
// ==============================

function mettreAJourEpisodes(
    corpus
) {

    selectionEpisodes.innerHTML =
        "";


    const nombreEpisodes =
        corpus.nombreEpisodes ?? 0;


    // Aucun épisode organisé

    if (
        nombreEpisodes < 1
    ) {

        selectionEpisodes.hidden =
            true;

        return;

    }


    selectionEpisodes.hidden =
        false;


    // Titre

    const titre =
        document.createElement("span");

    titre.textContent =
        "Épisodes :";

    selectionEpisodes.appendChild(
        titre
    );


    // Cases à cocher

    for (
        let numeroEpisode = 1;
        numeroEpisode <= nombreEpisodes;
        numeroEpisode++
    ) {

        const etiquette =
            document.createElement("label");

        etiquette.className =
            "choix-episode";


        const caseEpisode =
            document.createElement("input");

        caseEpisode.type =
            "checkbox";

        caseEpisode.value =
            numeroEpisode;

        caseEpisode.checked =
            true;


        const numero =
            document.createElement("span");

        numero.textContent =
            numeroEpisode;


        etiquette.appendChild(
            caseEpisode
        );

        etiquette.appendChild(
            numero
        );

        selectionEpisodes.appendChild(
            etiquette
        );


        caseEpisode.addEventListener(
            "change",
            function () {

                demarrerCorpus();

            }
        );

    }

}


// ==============================
// ACTIVATION D’UN CORPUS
// ==============================

export function selectionnerCorpus(
    corpus
) {

    application.corpusActuel =
        corpus;

    application.mots =
        [...corpus.cartes];

    application.position =
        0;

    nomCorpus.textContent =
        corpus.nom;


    mettreAJourMenuLecture(
        corpus
    );

    mettreAJourEpisodes(
        corpus
    );


    demarrerCorpus();

}