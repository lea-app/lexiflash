// ==============================
// APERÇU DU PDF
// ==============================

import {
    viderCanvas,
    copierCanvas
} from "./outils.js";

import {
    zoneLecture,
    progression
} from "./dom.js";


// ==============================
// CRÉATION DE LA ZONE D’APERÇU
// ==============================

const zoneApercuPdf =
    document.createElement("section");

zoneApercuPdf.id =
    "zoneApercuPdf";

zoneApercuPdf.hidden = true;

zoneApercuPdf.style.width =
    "100%";

zoneApercuPdf.style.margin =
    "20px auto";


// Aperçu de la page entière

const titrePageEntiere =
    document.createElement("h3");

titrePageEntiere.textContent =
    "Aperçu de la première page";

titrePageEntiere.style.textAlign =
    "center";


const canvasPdf =
    document.createElement("canvas");

canvasPdf.id =
    "apercuPdf";

canvasPdf.style.display =
    "block";

canvasPdf.style.maxWidth =
    "100%";

canvasPdf.style.height =
    "auto";

canvasPdf.style.margin =
    "10px auto 30px";

canvasPdf.style.border =
    "1px solid #cccccc";

canvasPdf.style.borderRadius =
    "8px";


// Aperçu des cartes

const titreCartes =
    document.createElement("h3");

titreCartes.textContent =
    "Premières cartes détectées";

titreCartes.style.textAlign =
    "center";


const conteneurCartes =
    document.createElement("div");

conteneurCartes.style.display =
    "grid";

conteneurCartes.style.gridTemplateColumns =
    "repeat(2, minmax(0, 1fr))";

conteneurCartes.style.gap =
    "20px";

conteneurCartes.style.alignItems =
    "start";


// ==============================
// CARTE GAUCHE
// ==============================

const zoneCarteGauche =
    document.createElement("div");

const titreCarteGauche =
    document.createElement("p");

titreCarteGauche.textContent =
    "Carte gauche";

titreCarteGauche.style.textAlign =
    "center";

titreCarteGauche.style.fontWeight =
    "bold";


const canvasCarteGauche =
    document.createElement("canvas");

canvasCarteGauche.style.display =
    "block";

canvasCarteGauche.style.width =
    "100%";

canvasCarteGauche.style.height =
    "auto";

canvasCarteGauche.style.border =
    "2px solid #999999";

canvasCarteGauche.style.borderRadius =
    "8px";


const texteCarteGauche =
    document.createElement("p");

texteCarteGauche.textContent =
    "Texte : —";

texteCarteGauche.style.textAlign =
    "center";

texteCarteGauche.style.fontSize =
    "1.2rem";

texteCarteGauche.style.fontWeight =
    "bold";


zoneCarteGauche.append(
    titreCarteGauche,
    canvasCarteGauche,
    texteCarteGauche
);


// ==============================
// CARTE DROITE
// ==============================

const zoneCarteDroite =
    document.createElement("div");

const titreCarteDroite =
    document.createElement("p");

titreCarteDroite.textContent =
    "Carte droite";

titreCarteDroite.style.textAlign =
    "center";

titreCarteDroite.style.fontWeight =
    "bold";


const canvasCarteDroite =
    document.createElement("canvas");

canvasCarteDroite.style.display =
    "block";

canvasCarteDroite.style.width =
    "100%";

canvasCarteDroite.style.height =
    "auto";

canvasCarteDroite.style.border =
    "2px solid #999999";

canvasCarteDroite.style.borderRadius =
    "8px";


const texteCarteDroite =
    document.createElement("p");

texteCarteDroite.textContent =
    "Texte : —";

texteCarteDroite.style.textAlign =
    "center";

texteCarteDroite.style.fontSize =
    "1.2rem";

texteCarteDroite.style.fontWeight =
    "bold";


zoneCarteDroite.append(
    titreCarteDroite,
    canvasCarteDroite,
    texteCarteDroite
);


// ==============================
// ASSEMBLAGE
// ==============================

conteneurCartes.append(
    zoneCarteGauche,
    zoneCarteDroite
);

zoneApercuPdf.append(
    titrePageEntiere,
    canvasPdf,
    titreCartes,
    conteneurCartes
);

zoneLecture.insertBefore(
    zoneApercuPdf,
    progression
);


// ==============================
// MASQUER L’APERÇU
// ==============================

export function masquerApercuPdf() {

    zoneApercuPdf.hidden = true;

    viderCanvas(canvasPdf);
    viderCanvas(canvasCarteGauche);
    viderCanvas(canvasCarteDroite);

    texteCarteGauche.textContent =
        "Texte : —";

    texteCarteDroite.textContent =
        "Texte : —";

}


// ==============================
// AFFICHER L’APERÇU
// ==============================

export function afficherApercuPremierePage(
    resultat
) {

    if (!resultat) {

        return;

    }

    copierCanvas(
        resultat.canvasPage,
        canvasPdf
    );

    copierCanvas(
        resultat.carteGauche,
        canvasCarteGauche
    );

    copierCanvas(
        resultat.carteDroite,
        canvasCarteDroite
    );

    texteCarteGauche.textContent =
        resultat.textes.gauche !== ""
            ? `Texte : ${resultat.textes.gauche}`
            : "Texte non détecté";

    texteCarteDroite.textContent =
        resultat.textes.droite !== ""
            ? `Texte : ${resultat.textes.droite}`
            : "Texte non détecté";

    zoneApercuPdf.hidden = false;

}