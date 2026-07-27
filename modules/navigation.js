// ==============================
// NAVIGATION DANS LE CORPUS
// ==============================

import {
    application
} from "./etat.js";

import {
    mettreAJourInterface,
    afficherFinCorpus,
    reactiverBoutonSuivant
} from "./interface.js";

import {
    motSuivant,
    motPrecedent,
    motAffiche,
    imageMot,
    recommencer
} from "./dom.js";

import {
    demarrerCorpus
} from "./corpus.js";


// ==============================
// AFFICHAGE DE LA CARTE ACTUELLE
// ==============================

function afficherCarteActuelle() {

    const carteActuelle =
        application.mots[
            application.position
        ];

    mettreAJourInterface(
        carteActuelle,
        application.position,
        application.mots.length
    );

}


// ==============================
// CARTE SUIVANTE
// ==============================

export function afficherMotSuivant() {

    if (
        application.mots.length === 0
    ) {

        return;

    }

    if (
        application.position
        < application.mots.length - 1
    ) {

        application.position++;

        application.revelation =
            0;

        afficherCarteActuelle();

    }
    else {

        afficherFinCorpus(
            application.mots.length
        );

    }

}


// ==============================
// CARTE PRÉCÉDENTE
// ==============================

export function afficherMotPrecedent() {

    if (
        application.mots.length === 0
    ) {

        return;

    }

    application.position--;

    if (
        application.position < 0
    ) {

        application.position =
            application.mots.length - 1;

    }

    application.revelation =
        0;

    reactiverBoutonSuivant();

    afficherCarteActuelle();

}


// ==============================
// INITIALISATION DE LA NAVIGATION
// ==============================

export function initialiserNavigation() {

    recommencer.addEventListener(
        "click",
        function () {

            application.revelation =
                0;

            demarrerCorpus();

        }
    );

    motSuivant.addEventListener(
        "click",
        function () {

            afficherMotSuivant();

        }
    );

    motPrecedent.addEventListener(
        "click",
        function () {

            afficherMotPrecedent();

        }
    );

    motAffiche.addEventListener(
        "click",
        function () {

            if (
                application.preferences.modeAffichage
                === "revelation"
            ) {

                return;

            }

            afficherMotSuivant();

        }
    );

    imageMot.addEventListener(
        "click",
        function () {

            afficherMotSuivant();

        }
    );

}