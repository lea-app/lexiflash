// ==============================
// GESTION DES FAVORIS
// ==============================

import {
    application
} from "./etat.js";

import {
    boutonFavori
} from "./dom.js";

import {
    mettreAJourBoutonFavori
} from "./boutonsCarte.js";

import {
    inverserProprieteCarte
} from "./modificationCarte.js";


// ==============================
// INITIALISATION
// ==============================

export function initialiserFavoris() {

    boutonFavori.addEventListener(
        "click",
        async function () {

            const carteActuelle =
                application.mots[
                    application.position
                ];

            if (
                !carteActuelle ||
                !application.corpusActuel
            ) {

                return;

            }

            boutonFavori.disabled =
                true;

            const modificationReussie =
                await inverserProprieteCarte(
                    carteActuelle,
                    "favori"
                );

            mettreAJourBoutonFavori(
                carteActuelle
            );

            if (
                !modificationReussie
            ) {

                console.warn(
                    "Le favori n’a pas pu être enregistré."
                );

            }

        }
    );

}