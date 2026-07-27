// ==============================
// AFFICHAGE DE L’INTERFACE
// ==============================

import {
    creerNomFichier
} from "./outils.js";

import {
    application
} from "./etat.js";

import {
    motAffiche,
    progression,
    imageMot,
    motSuivant,
    motPrecedent,
    recommencer
} from "./dom.js";

import {
    mettreAJourBoutonsCarte
} from "./boutonsCarte.js";

import {
    construireMotAffiche
} from "./revelation.js";


// ==============================
// AFFICHAGE D’UNE LISTE VIDE
// ==============================

export function afficherListeVide(
    message
) {

    motAffiche.textContent =
        message;

    progression.textContent =
        "0 / 0";

    imageMot.hidden =
        true;

    mettreAJourBoutonsCarte(
        null
    );

}


// ==============================
// AFFICHAGE D’UNE CARTE
// ==============================

export function mettreAJourInterface(
    carteActuelle,
    position,
    nombreDeCartes
) {

    mettreAJourBoutonsCarte(
        carteActuelle
    );

    if (!carteActuelle) {

        motAffiche.textContent =
            "—";

        progression.textContent =
            "0 / 0";

        imageMot.hidden =
            true;

        return;

    }

        motSuivant.disabled =
            false;

        motPrecedent.disabled =
            false;

        recommencer.disabled =
            false;

motAffiche.className =
    "ecriture-"
    + application.preferences.modeEcriture;
    
motAffiche.textContent =
    construireMotAffiche(
        carteActuelle.texte
    );

    progression.textContent =
        `${position + 1} / ${nombreDeCartes}`;

    imageMot.hidden =
        true;

    imageMot.alt =
        `Illustration de ${carteActuelle.texte}`;


    // Carte venant d’un PDF

    if (
        carteActuelle.image
    ) {

        imageMot.src =
            carteActuelle.image;

        return;

    }


    // Carte venant d’un corpus TXT

    const nomFichier =
        creerNomFichier(
            carteActuelle.texte
        );

    imageMot.src =
        `assets/icones/${nomFichier}.png`;

}


// ==============================
// FIN DU CORPUS
// ==============================

export function afficherFinCorpus(
    nombreDeCartes
) {

    motAffiche.textContent =
        "🎉 Fin du corpus";

    progression.textContent =
        `${nombreDeCartes} / ${nombreDeCartes}`;

    imageMot.hidden =
        true;

    motSuivant.disabled =
        true;

    mettreAJourBoutonsCarte(
        null
    );

}


// ==============================
// RÉACTIVATION DU BOUTON SUIVANT
// ==============================

export function reactiverBoutonSuivant() {

    motSuivant.disabled =
        false;

}