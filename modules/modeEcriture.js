// ==============================
// GESTION DU MODE D’ÉCRITURE
// ==============================

import {
    application
} from "./etat.js";

import {
    modeEcriture
} from "./dom.js";

import {
    mettreAJourInterface
} from "./interface.js";


// ==============================
// INITIALISATION
// ==============================

export function initialiserModeEcriture() {

    modeEcriture.value =
        application.preferences.modeEcriture;

    modeEcriture.addEventListener(
        "change",
        function () {

            application.preferences.modeEcriture =
                modeEcriture.value;

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