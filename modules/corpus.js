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
    selectionEpisodes,
    motSuivant,
    motPrecedent,
    recommencer
} from "./dom.js";


// ==============================
// ÉPISODES SÉLECTIONNÉS
// ==============================

function obtenirEpisodesSelectionnes() {

    const nombreEpisodes =
        application.corpusActuel.nombreEpisodes ?? 0;


    // Corpus sans épisodes

    if (
        nombreEpisodes < 1
    ) {

        return null;

    }


    const casesCochees =
        selectionEpisodes.querySelectorAll(
            'input[type="checkbox"]:checked'
        );


    return Array.from(
        casesCochees
    ).map(
        function (caseEpisode) {

            return Number(
                caseEpisode.value
            );

        }
    );

}


// ==============================
// CARTE DANS UN ÉPISODE SÉLECTIONNÉ
// ==============================

function carteDansEpisodeSelectionne(
    carte,
    episodesSelectionnes
) {

    // Pas d'épisodes dans ce corpus

    if (
        episodesSelectionnes === null
    ) {

        return true;

    }


    return episodesSelectionnes.includes(
        carte.episode
    );

}


// ==============================
// CONSTRUCTION DE LA LISTE
// ==============================

function construireListeLecture() {

    const modeLecture =
        application.preferences.modeLecture;

    const episodesSelectionnes =
        obtenirEpisodesSelectionnes();


    // Tout le corpus

    if (
        modeLecture === "toutes"
    ) {

        return application.corpusActuel.cartes.filter(
            function (carte) {

                return (
                    !carte.cachee
                    &&
                    carteDansEpisodeSelectionne(
                        carte,
                        episodesSelectionnes
                    )
                );

            }
        );

    }


    // Favoris du corpus actuel

    if (
        modeLecture === "favorisCorpus"
    ) {

        return application.corpusActuel.cartes.filter(
            function (carte) {

                return (
                    carte.favori
                    &&
                    !carte.cachee
                    &&
                    carteDansEpisodeSelectionne(
                        carte,
                        episodesSelectionnes
                    )
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
                            carte.favori
                            &&
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

                return (
                    carte.cachee
                    &&
                    carteDansEpisodeSelectionne(
                        carte,
                        episodesSelectionnes
                    )
                );

            }
        );

    }


    // Sécurité

    return application.corpusActuel.cartes.filter(
        function (carte) {

            return (
                !carte.cachee
                &&
                carteDansEpisodeSelectionne(
                    carte,
                    episodesSelectionnes
                )
            );

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

    const nombreEpisodes =
        application.corpusActuel.nombreEpisodes ?? 0;

    const episodesSelectionnes =
        obtenirEpisodesSelectionnes();


    // Aucun épisode coché

    if (
        nombreEpisodes > 0
        &&
        episodesSelectionnes.length === 0
        &&
        modeLecture !== "favorisBibliotheque"
    ) {

        return "Sélectionne au moins un épisode";

    }


    if (
        modeLecture === "favorisCorpus"
    ) {

        return "⭐ Aucun favori dans les épisodes sélectionnés";

    }


    if (
        modeLecture === "favorisBibliotheque"
    ) {

        return "⭐ Aucun favori visible dans la bibliothèque";

    }


    if (
        modeLecture === "cartesMasquees"
    ) {

        return "🙈 Aucune carte masquée dans les épisodes sélectionnés";

    }


    return "Aucune carte visible dans les épisodes sélectionnés";

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