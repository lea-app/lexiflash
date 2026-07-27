// ==============================
// GESTION DE L’IMAGE DES CARTES
// ==============================

import {
    imageMot
} from "./dom.js";


// ==============================
// INITIALISATION DE L’IMAGE
// ==============================

export function initialiserImage() {

    imageMot.addEventListener(
        "load",
        function () {

            imageMot.hidden = false;

        }
    );


    imageMot.addEventListener(
        "error",
        function () {

            imageMot.hidden = true;

        }
    );

}