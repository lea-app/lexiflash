// ==============================
// GESTION DU MASQUAGE
// ==============================

import {
    application
} from "./etat.js";

import {
    boutonMasquer
} from "./dom.js";

import {
    mettreAJourInterface
} from "./interface.js";

import {
    demarrerCorpus
} from "./corpus.js";

import {
    inverserProprieteCarte
} from "./modificationCarte.js";


// ==============================
// INITIALISATION
// ==============================

export function initialiserMasquage() {

    boutonMasquer.addEventListener(
        "click",
        async function () {

            const carteActuelle =
                application.mots[
                    application.position
                ];

            if (!carteActuelle) {

                return;

            }

            boutonMasquer.disabled =
                true;

            const modificationReussie =
                await inverserProprieteCarte(
                    carteActuelle,
                    "cachee"
                );

            if (!modificationReussie) {

                boutonMasquer.disabled =
                    false;

                return;

            }


            // La carte ne correspond plus
            // au mode de lecture actuel.

            application.mots.splice(
                application.position,
                1
            );


            // Plus aucune carte disponible.

            if (
                application.mots.length === 0
            ) {

                demarrerCorpus();

                return;

            }


            // La carte supprimée était
            // la dernière de la liste.

            if (
                application.position >=
                application.mots.length
            ) {

                application.position =
                    application.mots.length - 1;

            }


            // Affichage immédiat
            // de la carte suivante.

            mettreAJourInterface(
                application.mots[
                    application.position
                ],
                application.position,
                application.mots.length
            );

        }
    );

}