// ==============================
// TRAITEMENT DES PDF
// ==============================

import {
    creerCanvas,
    nettoyerTextePdf
} from "./outils.js";

import {
    creerCarte
} from "./carte.js";


// ==============================
// RENDU D’UNE PAGE PDF
// ==============================

export async function rendrePagePdf(
    page,
    echelle = 1.5
) {

    const dimensions =
        page.getViewport({
            scale: echelle
        });

    const canvas =
        creerCanvas();

    canvas.width =
        Math.floor(dimensions.width);

    canvas.height =
        Math.floor(dimensions.height);

    const contexte =
        canvas.getContext("2d");

    await page.render({

        canvasContext: contexte,

        viewport: dimensions

    }).promise;

    return canvas;

}


// ==============================
// DÉCOUPAGE D’UNE ZONE
// ==============================

function decouperZone(
    canvasSource,
    numeroLigne,
    numeroColonne,
    nombreLignes,
    nombreColonnes
) {

    const debutX =
        Math.floor(
            numeroColonne
            * canvasSource.width
            / nombreColonnes
        );

    const finX =
        Math.floor(
            (
                numeroColonne + 1
            )
            * canvasSource.width
            / nombreColonnes
        );

    const debutY =
        Math.floor(
            numeroLigne
            * canvasSource.height
            / nombreLignes
        );

    const finY =
        Math.floor(
            (
                numeroLigne + 1
            )
            * canvasSource.height
            / nombreLignes
        );

    const largeurZone =
        finX - debutX;

    const hauteurZone =
        finY - debutY;

    const canvasDestination =
        creerCanvas();

    canvasDestination.width =
        largeurZone;

    canvasDestination.height =
        hauteurZone;

    const contexteDestination =
        canvasDestination.getContext("2d");

    contexteDestination.drawImage(

        canvasSource,

        debutX,
        debutY,
        largeurZone,
        hauteurZone,

        0,
        0,
        largeurZone,
        hauteurZone

    );

    return canvasDestination;

}


// ==============================
// SUPPRESSION DE LA ZONE TEXTE
// ==============================

function supprimerZoneTexte(
    canvasSource,
    pourcentageImage = 0.66
) {

    const hauteurImage =
        Math.floor(
            canvasSource.height
            * pourcentageImage
        );

    const canvasImage =
        creerCanvas();

    canvasImage.width =
        canvasSource.width;

    canvasImage.height =
        hauteurImage;

    const contexte =
        canvasImage.getContext("2d");

    contexte.drawImage(
        canvasSource,
        0,
        0,
        canvasSource.width,
        hauteurImage,
        0,
        0,
        canvasSource.width,
        hauteurImage
    );

    return canvasImage;

}


// ==============================
// EXTRACTION DU TEXTE
// ==============================

function reunirFragmentsTexte(
    fragments
) {

    fragments.sort(
        function (
            fragmentA,
            fragmentB
        ) {

            const differenceVerticale =
                Math.abs(
                    fragmentA.y
                    - fragmentB.y
                );

            if (
                differenceVerticale > 5
            ) {

                return fragmentB.y
                    - fragmentA.y;

            }

            return fragmentA.x
                - fragmentB.x;

        }
    );

    const textes =
        fragments.map(
            function (fragment) {

                return fragment.texte;

            }
        );

    const texteReuni =
        nettoyerTextePdf(
            textes.join(" ")
        );

    const texteSansRepetition =
        supprimerRepetitionComplete(
            texteReuni
        );

    return texteSansRepetition
        .toLocaleUpperCase("fr-FR");

}


async function extraireTextesDeLaPage(
    page,
    disposition
) {

    const contenuTexte =
        await page.getTextContent();

    const debutPageX =
        page.view[0];

    const finPageX =
        page.view[2];

    const debutPageY =
        page.view[1];

    const finPageY =
        page.view[3];

    const largeurPage =
        finPageX
        - debutPageX;

    const hauteurPage =
        finPageY
        - debutPageY;

    const largeurZone =
        largeurPage
        / disposition.colonnes;

    const hauteurZone =
        hauteurPage
        / disposition.lignes;

    const nombreZones =
        disposition.lignes
        * disposition.colonnes;

    const fragmentsParZone =
        Array.from(
            {
                length:
                    nombreZones
            },
            function () {

                return [];

            }
        );

    contenuTexte.items.forEach(
        function (element) {

            const texte =
                nettoyerTextePdf(
                    element.str
                );

            if (
                texte === ""
            ) {

                return;

            }

            const positionX =
                element.transform[4];

            const positionY =
                element.transform[5];

            const positionRelativeX =
                positionX
                - debutPageX;

            /*
             * Dans les coordonnées PDF,
             * le bas de la page correspond
             * aux petites valeurs de Y.
             *
             * Pour travailler comme avec
             * le canvas, on calcule ici
             * la position depuis le haut.
             */

            const positionDepuisLeHaut =
                finPageY
                - positionY;

            let numeroColonne =
                Math.floor(
                    positionRelativeX
                    / largeurZone
                );

            let numeroLigne =
                Math.floor(
                    positionDepuisLeHaut
                    / hauteurZone
                );

            /*
             * Un fragment placé exactement
             * sur la bordure de la page
             * pourrait donner un indice
             * extérieur à la grille.
             */

            numeroColonne =
                Math.min(
                    Math.max(
                        numeroColonne,
                        0
                    ),
                    disposition.colonnes
                    - 1
                );

            numeroLigne =
                Math.min(
                    Math.max(
                        numeroLigne,
                        0
                    ),
                    disposition.lignes
                    - 1
                );

            /*
             * Position du bas de la cellule
             * dans les coordonnées PDF.
             */

            const basDeLaZone =
                finPageY
                - (
                    numeroLigne + 1
                )
                * hauteurZone;

            const positionDansLaZone =
                (
                    positionY
                    - basDeLaZone
                )
                / hauteurZone;

            /*
             * Comme dans l’ancien système,
             * on ignore les petites mentions
             * situées tout en bas.
             *
             * La différence est que cette
             * vérification est maintenant faite
             * séparément dans chaque cellule.
             */

            if (
                positionDansLaZone < 0.12
            ) {

                return;

            }

            const numeroZone =
                numeroLigne
                * disposition.colonnes
                + numeroColonne;

            fragmentsParZone[
                numeroZone
            ].push({

                texte:
                    texte,

                x:
                    positionX,

                y:
                    positionY

            });

        }
    );

    return fragmentsParZone.map(
        function (fragments) {

            return reunirFragmentsTexte(
                fragments
            );

        }
    );

}


// ==============================
// DISPOSITION DES CARTES
// ==============================

function obtenirDisposition(
    nombreCartesParPage
) {

    const dispositions = {

        1: {
            lignes: 1,
            colonnes: 1
        },

        2: {
            lignes: 1,
            colonnes: 2
        },

        4: {
            lignes: 2,
            colonnes: 2
        },

        6: {
            lignes: 2,
            colonnes: 3
        }

    };

    return dispositions[
        nombreCartesParPage
    ] ?? dispositions[2];

}


// ==============================
// CRÉATION DES CARTES D’UNE PAGE
// ==============================

async function creerCartesDepuisPage(
    page,
    numeroPage,
    pourcentageImage = 0.66,
    disposition = {
        lignes: 1,
        colonnes: 2
    }
) {

    const canvasPage =
        await rendrePagePdf(
            page
        );

    const textesParZone =
        await extraireTextesDeLaPage(
            page,
            disposition
        );

    const cartes = [];

    const illustrations = [];

    for (
        let numeroLigne = 0;
        numeroLigne
            < disposition.lignes;
        numeroLigne++
    ) {

        for (
            let numeroColonne = 0;
            numeroColonne
                < disposition.colonnes;
            numeroColonne++
        ) {

            const numeroZone =
                numeroLigne
                * disposition.colonnes
                + numeroColonne;

            const carteComplete =
                decouperZone(
                    canvasPage,
                    numeroLigne,
                    numeroColonne,
                    disposition.lignes,
                    disposition.colonnes
                );

            const illustration =
                supprimerZoneTexte(
                    carteComplete,
                    pourcentageImage
                );

            illustrations.push(
                illustration
            );

            const texte =
                textesParZone[
                    numeroZone
                ];

            /*
             * Une cellule sans texte
             * ne crée pas de carte vide.
             */

            if (
                texte === ""
            ) {

                continue;

            }

            let cote =
                null;

            /*
             * On conserve l’ancienne donnée
             * gauche/droite pour le mode
             * historique à deux cartes.
             */

            if (
                disposition.lignes === 1
                && disposition.colonnes === 2
            ) {

                cote =
                    numeroColonne === 0
                        ? "gauche"
                        : "droite";

            }

            cartes.push(
                creerCarte(
                    texte,
                    illustration.toDataURL(
                        "image/png"
                    ),
                    {
                        page:
                            numeroPage,

                        ligne:
                            numeroLigne,

                        colonne:
                            numeroColonne,

                        position:
                            numeroZone + 1,

                        cote:
                            cote
                    }
                )
            );

        }

    }

    return {

        cartes:
            cartes,

        canvasPage:
            canvasPage,

        illustrations:
            illustrations,

        /*
         * On conserve ces propriétés
         * pour ne pas casser le code
         * qui pourrait encore attendre
         * carteGauche et carteDroite.
         */

        carteGauche:
            illustrations[0]
            ?? null,

        carteDroite:
            illustrations[1]
            ?? null,

        textes: {

            zones:
                textesParZone,

            gauche:
                textesParZone[0]
                ?? "",

            droite:
                textesParZone[1]
                ?? ""

        },

        disposition:
            disposition

    };

}


// ==============================
// IMPORTATION DE TOUT LE PDF
// ==============================

export async function creerCorpusDepuisPdf(
    pdf,
    signalerProgression,
    pourcentageImage = 0.66,
    nombreCartesParPage = 2
) {

    const cartesPdf = [];

    let premierePageTraitee =
        null;

    const disposition =
        obtenirDisposition(
            nombreCartesParPage
        );

    for (
        let numeroPage = 1;
        numeroPage <= pdf.numPages;
        numeroPage++
    ) {

        if (
            signalerProgression
        ) {

            signalerProgression(
                numeroPage,
                pdf.numPages
            );

        }

        const page =
            await pdf.getPage(
                numeroPage
            );

        const resultat =
            await creerCartesDepuisPage(
                page,
                numeroPage,
                pourcentageImage,
                disposition
            );

        cartesPdf.push(
            ...resultat.cartes
        );

        if (
            numeroPage === 1
        ) {

            premierePageTraitee =
                resultat;

        }

    }

    return {

        cartes:
            cartesPdf,

        premierePage:
            premierePageTraitee

    };

}


// ==============================
// SUPPRESSION DES RÉPÉTITIONS
// ==============================

function normaliserPourComparaison(
    texte
) {

    return texte
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLocaleLowerCase("fr-FR")
        .replace(
            /\s+/g,
            " "
        )
        .trim();

}


function supprimerRepetitionComplete(
    texte
) {

    const mots =
        texte.split(/\s+/);

    /*
     * On teste si le texte est constitué
     * de deux ou trois groupes identiques.
     */

    for (
        let nombreRepetitions = 3;
        nombreRepetitions >= 2;
        nombreRepetitions--
    ) {

        if (
            mots.length
            % nombreRepetitions
            !== 0
        ) {

            continue;

        }

        const tailleGroupe =
            mots.length
            / nombreRepetitions;

        const premierGroupe =
            mots
                .slice(
                    0,
                    tailleGroupe
                )
                .join(" ");

        const premierGroupeNormalise =
            normaliserPourComparaison(
                premierGroupe
            );

        let groupesIdentiques =
            true;

        for (
            let numeroGroupe = 1;
            numeroGroupe
                < nombreRepetitions;
            numeroGroupe++
        ) {

            const groupe =
                mots
                    .slice(
                        numeroGroupe
                            * tailleGroupe,
                        (
                            numeroGroupe + 1
                        )
                            * tailleGroupe
                    )
                    .join(" ");

            if (
                normaliserPourComparaison(
                    groupe
                )
                !== premierGroupeNormalise
            ) {

                groupesIdentiques =
                    false;

                break;

            }

        }

        if (
            groupesIdentiques
        ) {

            return premierGroupe;

        }

    }

    return texte;

}