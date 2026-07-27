// ==============================
// GESTION DU PLEIN ÉCRAN
// ==============================

import {
    pleinEcran
} from "./dom.js";


// ==============================
// BASCULEMENT DU PLEIN ÉCRAN
// ==============================

export function basculerPleinEcran() {

    if (!document.fullscreenElement) {

        document.documentElement
            .requestFullscreen();

    } else {

        document.exitFullscreen();

    }

}


// ==============================
// MISE À JOUR DU BOUTON
// ==============================

document.addEventListener(
    "fullscreenchange",
    function () {

        if (document.fullscreenElement) {

            pleinEcran.textContent =
                "Quitter le plein écran";

        } else {

            pleinEcran.textContent =
                "Plein écran";

        }

    }
);

// ==============================
// INITIALISATION DU PLEIN ÉCRAN
// ==============================

export function initialiserPleinEcran() {

    pleinEcran.addEventListener(
        "click",
        function () {

            basculerPleinEcran();

        }
    );

}