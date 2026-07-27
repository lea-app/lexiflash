// ==============================
// RACCOURCIS CLAVIER
// ==============================

import {
    afficherMotSuivant,
    afficherMotPrecedent
} from "./navigation.js";

import {
    basculerPleinEcran
} from "./pleinEcran.js";


// ==============================
// INITIALISATION DES RACCOURCIS
// ==============================

export function initialiserRaccourcis() {

    document.addEventListener(
        "keydown",
        function (evenement) {

            const raccourcis = {

                ArrowRight:
                    afficherMotSuivant,

                ArrowLeft:
                    afficherMotPrecedent,

                f:
                    basculerPleinEcran,

                F:
                    basculerPleinEcran

            };

            const action =
                raccourcis[evenement.key];

            if (action) {

                action();

            }

        }
    );

}