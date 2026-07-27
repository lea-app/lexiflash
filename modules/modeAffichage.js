// ==============================
// GESTION DU MODE D’AFFICHAGE
// ==============================

import {
    application
} from "./etat.js";

import {
    modeAffichage
} from "./dom.js";

import {
    mettreAJourInterface
} from "./interface.js";


// ==============================
// INITIALISATION
// ==============================

export function initialiserModeAffichage() {

    modeAffichage.value =
        application.preferences.modeAffichage;

    modeAffichage.addEventListener(
        "change",
        function () {

            application.preferences.modeAffichage =
                modeAffichage.value;

            application.revelation =
                0;

            if (
                application.corpusActuel
                && application.mots.length > 0
            ) {

                mettreAJourInterface(
                    application.mots[application.position],
                    application.position,
                    application.mots.length
                );

            }

        }
    );

}