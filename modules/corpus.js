// ==============================
// GESTION DU CORPUS COURANT
// ==============================

import {
    application
} from "./etat.js";

import {
    mettreAJourInterface,
    afficherListeVide
} from "./interface.js";

import {
    caseMelanger,
    motSuivant,
    motPrecedent,
    recommencer
} from "./dom.js";


// ==============================
// CONSTRUCTION DE LA LISTE
// ==============================

function construireListeLecture() {

    const modeLecture =
        application.preferences.modeLecture;


    // Cartes visibles du corpus actuel

    if (
        modeLecture === "toutes"
    ) {

        return application.corpusActuel.cartes.filter(
            function (carte) {

                return !carte.cachee;

            }
        );

    }


    // Favoris visibles du corpus actuel

    if (
        modeLecture === "favorisCorpus"
    ) {

        return application.corpusActuel.cartes.filter(
            function (carte) {

                return (
                    carte.favori &&
                    !carte.cachee
                );

            }
        );

    }


    // Favoris visibles de toute la bibliothèque

    if (
        modeLecture === "favorisBibliotheque"
    ) {

        return application.bibliotheque.flatMap(
            function (corpus) {

                return corpus.cartes.filter(
                    function (carte) {

                        return (
                            carte.favori &&
                            !carte.cachee
                        );

                    }
                );

            }
        );

    }


    // Cartes masquées du corpus actuel

    if (
        modeLecture === "cartesMasquees"
    ) {

        return application.corpusActuel.cartes.filter(
            function (carte) {

                return carte.cachee;

            }
        );

    }


    // Sécurité

    return application.corpusActuel.cartes.filter(
        function (carte) {

            return !carte.cachee;

        }
    );

}


// ==============================
// MÉLANGE DU CORPUS
// ==============================

function melangerMots() {

    for (
        let index = application.mots.length - 1;
        index > 0;
        index--
    ) {

        const positionAleatoire =
            Math.floor(
                Math.random() * (index + 1)
            );

        const motTemporaire =
            application.mots[index];

        application.mots[index] =
            application.mots[positionAleatoire];

        application.mots[positionAleatoire] =
            motTemporaire;

    }

}


// ==============================
// MESSAGE DE LISTE VIDE
// ==============================

function obtenirMessageListeVide() {

    const modeLecture =
        application.preferences.modeLecture;

    if (
        modeLecture === "favorisCorpus"
    ) {

        return "⭐ Aucun favori visible dans ce corpus";

    }

    if (
        modeLecture === "favorisBibliotheque"
    ) {

        return "⭐ Aucun favori visible dans la bibliothèque";

    }

    if (
        modeLecture === "cartesMasquees"
    ) {

        return "🙈 Aucune carte masquée dans ce corpus";

    }

    return "Aucune carte visible dans ce corpus";

}


// ==============================
// DÉMARRAGE DU CORPUS
// ==============================

export function demarrerCorpus() {

    if (
        !application.corpusActuel
    ) {

        return;

    }

    application.mots =
        construireListeLecture();

    if (
        caseMelanger.checked
    ) {

        melangerMots();

    }

    application.position =
        0;


    // Aucune carte dans le mode choisi

    if (
        application.mots.length === 0
    ) {

        motSuivant.disabled =
            true;

        motPrecedent.disabled =
            true;

        recommencer.disabled =
            true;

        afficherListeVide(
            obtenirMessageListeVide()
        );

        return;

    }


    // Une ou plusieurs cartes disponibles

    motSuivant.disabled =
        false;

    motPrecedent.disabled =
        false;

    recommencer.disabled =
        false;

    mettreAJourInterface(
        application.mots[0],
        0,
        application.mots.length
    );

}