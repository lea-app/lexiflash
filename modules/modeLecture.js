// ==============================
// GESTION DU MODE DE LECTURE
// ==============================

import {
    application
} from "./etat.js";

import {
    modeLecture
} from "./dom.js";

import {
    demarrerCorpus
} from "./corpus.js";


// ==============================
// INITIALISATION
// ==============================

export function initialiserModeLecture() {

    modeLecture.value =
        application.preferences.modeLecture;

    modeLecture.addEventListener(
        "change",
        function () {

            application.preferences.modeLecture =
                modeLecture.value;

            if (
                application.corpusActuel
            ) {

                demarrerCorpus();

            }

        }
    );

}