// ==============================
// RÉVÉLATION PROGRESSIVE DU MOT
// ==============================

import {
    application
} from "./etat.js";

import {
    motAffiche
} from "./dom.js";


// ==============================
// CARACTÈRES AFFICHÉS AUTOMATIQUEMENT
// ==============================

function estSeparateur(
    caractere
) {

    return (
        caractere === " "
        || caractere === "'"
        || caractere === "’"
        || caractere === "-"
    );

}


// ==============================
// TEXTE SELON LE MODE D’ÉCRITURE
// ==============================

function adapterTexteAuModeEcriture(
    texte
) {

    if (
        application.preferences.modeEcriture
        === "capitales"
    ) {

        return texte.toLocaleUpperCase(
            "fr-FR"
        );

    }

    return texte.toLocaleLowerCase(
        "fr-FR"
    );

}


// ==============================
// NOMBRE DE LETTRES DU MOT
// ==============================

function compterLettres(
    texte
) {

    let nombreDeLettres =
        0;

    for (
        const caractere of texte
    ) {

        if (
            !estSeparateur(
                caractere
            )
        ) {

            nombreDeLettres++;

        }

    }

    return nombreDeLettres;

}


// ==============================
// CONSTRUCTION DU TEXTE AFFICHÉ
// ==============================

export function construireMotAffiche(
    texte
) {

    const texteAdapte =
        adapterTexteAuModeEcriture(
            texte
        );

    if (
        application.preferences.modeAffichage
        === "normal"
    ) {

        return texteAdapte;

    }

    let resultat =
        "";

    let lettresParcourues =
        0;

    for (
        const caractere of texteAdapte
    ) {

        if (
            estSeparateur(
                caractere
            )
        ) {

            resultat +=
                caractere;

            continue;

        }

        if (
            lettresParcourues
            < application.revelation
        ) {

            resultat +=
                caractere;

        }
        else {

resultat +=
    "⎽";
        }

        lettresParcourues++;

    }

    return resultat;

}


// ==============================
// INITIALISATION DU CLIC
// ==============================

export function initialiserRevelation() {

    motAffiche.addEventListener(
        "click",
        function () {

            if (
                application.preferences.modeAffichage
                !== "revelation"
            ) {

                return;

            }

            const carteActuelle =
                application.mots[
                    application.position
                ];

            if (
                !carteActuelle
            ) {

                return;

            }

            const nombreDeLettres =
                compterLettres(
                    carteActuelle.texte
                );

            if (
                application.revelation
                < nombreDeLettres
            ) {

                application.revelation++;

            }

            motAffiche.textContent =
                construireMotAffiche(
                    carteActuelle.texte
                );

        }
    );

}