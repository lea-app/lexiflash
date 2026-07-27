// ==============================
// IMPORTATIONS
// ==============================

import {
    initialiserImportTxt
} from "./modules/importTxt.js";

import {
    initialiserImportPdf
} from "./modules/importPdf.js";

import {
    initialiserNavigation
} from "./modules/navigation.js";

import {
    initialiserRaccourcis
} from "./modules/raccourcis.js";

import {
    initialiserImage
} from "./modules/image.js";

import {
    initialiserPleinEcran
} from "./modules/pleinEcran.js";

import {
    initialiserApplication
} from "./modules/demarrage.js";

import {
    initialiserFavoris
} from "./modules/favoris.js";

import {
    initialiserModeLecture
} from "./modules/modeLecture.js";

import {
    initialiserMasquage
} from "./modules/masquage.js";

import {
    initialiserModeAffichage
} from "./modules/modeAffichage.js";

import {
    initialiserRevelation
} from "./modules/revelation.js";

import {
    initialiserModeEcriture
} from "./modules/modeEcriture.js";

// ==============================
// DÉMARRAGE
// ==============================

async function demarrer() {

    initialiserImportTxt();

    initialiserImportPdf();

    initialiserNavigation();

    initialiserRaccourcis();

    initialiserImage();

    initialiserFavoris();

    initialiserMasquage();

    initialiserModeLecture();

    initialiserModeAffichage();

    initialiserModeEcriture();

    initialiserPleinEcran();

    initialiserRevelation();

    await initialiserApplication();

}

demarrer();
