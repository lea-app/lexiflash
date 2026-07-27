// ==============================
// FENÊTRE DE RÉGLAGE DE L’IMPORT PDF
// ==============================

import {
    rendrePagePdf
} from "./pdf.js";


// ==============================
// OUVRIR LA FENÊTRE
// ==============================

export async function ouvrirReglageImportPdf(
    pdf
) {

    // ==============================
    // CRÉATION DE L’APERÇU
    // ==============================

    const premierePage =
        await pdf.getPage(
            1
        );

    const canvasApercu =
        await rendrePagePdf(
            premierePage
        );

    const rapportLargeurHauteur =
        canvasApercu.width
        / canvasApercu.height;


    return new Promise(
        function (resoudre) {

            // Position initiale de la ligne.
            // Elle correspond au découpage actuel.

        let pourcentageSeparation =
            66;

        let nombreCartesParPage =
              2;

        let ligneEnDeplacement =
             false;

            // ==============================
            // FOND ASSOMBRI
            // ==============================

            const fond =
                document.createElement("div");

            fond.id =
                "fondReglageImportPdf";

            fond.style.position =
                "fixed";

            fond.style.inset =
                "0";

            fond.style.zIndex =
                "10000";

            fond.style.display =
                "flex";

            fond.style.alignItems =
                "center";

            fond.style.justifyContent =
                "center";

            fond.style.padding =
                "20px";

            fond.style.boxSizing =
                "border-box";

            fond.style.backgroundColor =
                "rgba(0, 0, 0, 0.55)";


            // ==============================
            // FENÊTRE
            // ==============================

            const fenetre =
                document.createElement("section");

            fenetre.setAttribute(
                "role",
                "dialog"
            );

            fenetre.setAttribute(
                "aria-modal",
                "true"
            );

            fenetre.setAttribute(
                "aria-labelledby",
                "titreReglageImportPdf"
            );

            fenetre.style.width =
                "min(900px, 100%)";

            fenetre.style.maxHeight =
                "90vh";

            fenetre.style.overflowY =
                "auto";

            fenetre.style.padding =
                "24px";

            fenetre.style.boxSizing =
                "border-box";

            fenetre.style.backgroundColor =
                "#ffffff";

            fenetre.style.borderRadius =
                "16px";

            fenetre.style.boxShadow =
                "0 20px 60px rgba(0, 0, 0, 0.35)";


            // ==============================
            // TITRE
            // ==============================

            const titre =
                document.createElement("h2");

            titre.id =
                "titreReglageImportPdf";

            titre.textContent =
                "Réglage de l’import PDF";

            titre.style.margin =
                "0 0 20px";

            titre.style.textAlign =
                "center";

// ==============================
// CHOIX DE LA DISPOSITION
// ==============================

const zoneDisposition =
    document.createElement("div");

zoneDisposition.style.display =
    "flex";

zoneDisposition.style.alignItems =
    "center";

zoneDisposition.style.justifyContent =
    "center";

zoneDisposition.style.flexWrap =
    "wrap";

zoneDisposition.style.gap =
    "10px";

zoneDisposition.style.marginBottom =
    "20px";


const libelleDisposition =
    document.createElement("span");

libelleDisposition.textContent =
    "Cartes par page :";

libelleDisposition.style.fontWeight =
    "bold";

libelleDisposition.style.marginRight =
    "4px";


const boutonsDisposition =
    [];


function actualiserBoutonsDisposition() {

    boutonsDisposition.forEach(
        function (bouton) {

            const valeurBouton =
                Number(
                    bouton.dataset.nombreCartes
                );

            const estSelectionne =
                valeurBouton
                === nombreCartesParPage;

            bouton.style.fontWeight =
                estSelectionne
                    ? "bold"
                    : "normal";

            bouton.style.border =
                estSelectionne
                    ? "2px solid #222222"
                    : "1px solid #aaaaaa";

            bouton.style.backgroundColor =
                estSelectionne
                    ? "#dddddd"
                    : "#ffffff";

            bouton.setAttribute(
                "aria-pressed",
                String(estSelectionne)
            );

        }
    );

}


[
    1,
    2,
    4,
    6
].forEach(
    function (nombreCartes) {

        const boutonDisposition =
            document.createElement("button");

        boutonDisposition.type =
            "button";

        boutonDisposition.textContent =
            String(nombreCartes);

        boutonDisposition.dataset.nombreCartes =
            String(nombreCartes);

        boutonDisposition.style.minWidth =
            "48px";

        boutonDisposition.style.padding =
            "8px 14px";

        boutonDisposition.style.borderRadius =
            "8px";

        boutonDisposition.style.cursor =
            "pointer";

        boutonDisposition.addEventListener(
            "click",
            function () {

nombreCartesParPage =
    nombreCartes;

actualiserBoutonsDisposition();

actualiserGuides();

            }
        );

        boutonsDisposition.push(
            boutonDisposition
        );

        zoneDisposition.append(
            boutonDisposition
        );

    }
);


zoneDisposition.prepend(
    libelleDisposition
);

actualiserBoutonsDisposition();

            // ==============================
            // ZONE D’APERÇU
            // ==============================

            const zoneApercu =
                document.createElement("div");

            zoneApercu.style.display =
                "flex";

            zoneApercu.style.alignItems =
                "center";

            zoneApercu.style.justifyContent =
                "center";

            zoneApercu.style.minHeight =
                "300px";

            zoneApercu.style.padding =
                "20px";

            zoneApercu.style.boxSizing =
                "border-box";

            zoneApercu.style.overflow =
                "hidden";

            zoneApercu.style.backgroundColor =
                "#eeeeee";

            zoneApercu.style.border =
                "1px solid #cccccc";

            zoneApercu.style.borderRadius =
                "12px";


            // ==============================
            // CONTENEUR DE LA PAGE
            // ==============================

            const conteneurPage =
                document.createElement("div");

            conteneurPage.style.position =
                "relative";

            conteneurPage.style.width =
                `min(100%, ${60 * rapportLargeurHauteur}vh)`;

            conteneurPage.style.lineHeight =
                "0";

            conteneurPage.style.backgroundColor =
                "#ffffff";

            conteneurPage.style.boxShadow =
                "0 4px 18px rgba(0, 0, 0, 0.2)";


            // ==============================
            // CANVAS DE LA PREMIÈRE PAGE
            // ==============================

            canvasApercu.style.display =
                "block";

            canvasApercu.style.width =
                "100%";

            canvasApercu.style.height =
                "auto";

            canvasApercu.style.userSelect =
                "none";


            // ==============================
            // CALQUE DES GUIDES
            // ==============================

            const calqueGuides =
                document.createElement("div");

            calqueGuides.style.position =
                "absolute";

            calqueGuides.style.inset =
                "0";

            calqueGuides.style.pointerEvents =
                "none";


            /*
             * Une zone de capture est créée
             * pour chaque rangée de cartes.
             *
             * Les lignes rouges restent
             * synchronisées entre elles.
             */

            const zonesCapture =
                [];

            let numeroLigneEnDeplacement =
                0;


            // ==============================
            // DISPOSITION DE L’APERÇU
            // ==============================

            function obtenirDispositionApercu() {

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
            // POSITION DES LIGNES ROUGES
            // ==============================

            function actualiserPositionLignes() {

                const disposition =
                    obtenirDispositionApercu();

                zonesCapture.forEach(
                    function (
                        zoneCapture,
                        numeroLigne
                    ) {

                        /*
                         * Exemple avec deux rangées :
                         *
                         * première ligne :
                         * 0 + pourcentage dans la rangée
                         *
                         * deuxième ligne :
                         * 1 rangée entière
                         * + le même pourcentage
                         */

                        const positionDansPage =
                            (
                                numeroLigne
                                + pourcentageSeparation
                                / 100
                            )
                            / disposition.lignes
                            * 100;

                        zoneCapture.style.top =
                            `${positionDansPage}%`;

                    }
                );

            }


            // ==============================
            // DÉPLACEMENT DES LIGNES
            // ==============================

            function positionnerLignes(
                positionVerticale
            ) {

                const disposition =
                    obtenirDispositionApercu();

                const dimensionsPage =
                    conteneurPage
                        .getBoundingClientRect();

                const hauteurRangee =
                    dimensionsPage.height
                    / disposition.lignes;

                const debutRangee =
                    numeroLigneEnDeplacement
                    * hauteurRangee;

                const positionDansRangee =
                    positionVerticale
                    - dimensionsPage.top
                    - debutRangee;

                let nouveauPourcentage =
                    (
                        positionDansRangee
                        / hauteurRangee
                    )
                    * 100;

                /*
                 * La séparation reste
                 * à l’intérieur de chaque carte,
                 * avec une marge de sécurité.
                 */

                nouveauPourcentage =
                    Math.max(
                        5,
                        Math.min(
                            95,
                            nouveauPourcentage
                        )
                    );

                pourcentageSeparation =
                    nouveauPourcentage;

                actualiserPositionLignes();

            }


            function commencerDeplacement(
                evenement
            ) {

                ligneEnDeplacement =
                    true;

                numeroLigneEnDeplacement =
                    Number(
                        evenement.currentTarget
                            .dataset.numeroLigne
                    );

                evenement.currentTarget
                    .setPointerCapture(
                        evenement.pointerId
                    );

                positionnerLignes(
                    evenement.clientY
                );

            }


            function continuerDeplacement(
                evenement
            ) {

                if (
                    !ligneEnDeplacement
                ) {

                    return;

                }

                positionnerLignes(
                    evenement.clientY
                );

            }


            function terminerDeplacement(
                evenement
            ) {

                if (
                    !ligneEnDeplacement
                ) {

                    return;

                }

                ligneEnDeplacement =
                    false;

                if (
                    evenement.currentTarget
                        .hasPointerCapture(
                            evenement.pointerId
                        )
                ) {

                    evenement.currentTarget
                        .releasePointerCapture(
                            evenement.pointerId
                        );

                }

            }


            // ==============================
            // CRÉATION DES GUIDES
            // ==============================

            function actualiserGuides() {

                const disposition =
                    obtenirDispositionApercu();

                calqueGuides.replaceChildren();

                zonesCapture.length =
                    0;


                /*
                 * Traits verticaux :
                 * ils montrent les colonnes.
                 */

                for (
                    let numeroColonne = 1;
                    numeroColonne
                        < disposition.colonnes;
                    numeroColonne++
                ) {

                    const guideVertical =
                        document.createElement("div");

                    guideVertical.style.position =
                        "absolute";

                    guideVertical.style.left =
                        `${
                            numeroColonne
                            / disposition.colonnes
                            * 100
                        }%`;

                    guideVertical.style.top =
                        "0";

                    guideVertical.style.width =
                        "1px";

                    guideVertical.style.height =
                        "100%";

                    guideVertical.style.borderLeft =
                        "1px dashed rgba(0, 0, 0, 0.45)";

                    guideVertical.style.pointerEvents =
                        "none";

                    calqueGuides.append(
                        guideVertical
                    );

                }


                /*
                 * Traits horizontaux gris :
                 * ils montrent les rangées.
                 */

                for (
                    let numeroRangee = 1;
                    numeroRangee
                        < disposition.lignes;
                    numeroRangee++
                ) {

                    const guideHorizontal =
                        document.createElement("div");

                    guideHorizontal.style.position =
                        "absolute";

                    guideHorizontal.style.left =
                        "0";

                    guideHorizontal.style.top =
                        `${
                            numeroRangee
                            / disposition.lignes
                            * 100
                        }%`;

                    guideHorizontal.style.width =
                        "100%";

                    guideHorizontal.style.height =
                        "1px";

                    guideHorizontal.style.borderTop =
                        "1px dashed rgba(0, 0, 0, 0.45)";

                    guideHorizontal.style.pointerEvents =
                        "none";

                    calqueGuides.append(
                        guideHorizontal
                    );

                }


                /*
                 * Une ligne rouge est créée
                 * dans chaque rangée.
                 */

                for (
                    let numeroLigne = 0;
                    numeroLigne
                        < disposition.lignes;
                    numeroLigne++
                ) {

                    const zoneCapture =
                        document.createElement("div");

                    zoneCapture.dataset.numeroLigne =
                        String(numeroLigne);

                    zoneCapture.style.position =
                        "absolute";

                    zoneCapture.style.left =
                        "0";

                    zoneCapture.style.width =
                        "100%";

                    zoneCapture.style.height =
                        "24px";

                    zoneCapture.style.transform =
                        "translateY(-50%)";

                    zoneCapture.style.cursor =
                        "ns-resize";

                    zoneCapture.style.pointerEvents =
                        "auto";

                    zoneCapture.style.touchAction =
                        "none";


                    const ligneSeparation =
                        document.createElement("div");

                    ligneSeparation.style.position =
                        "absolute";

                    ligneSeparation.style.left =
                        "0";

                    ligneSeparation.style.top =
                        "50%";

                    ligneSeparation.style.width =
                        "100%";

                    ligneSeparation.style.height =
                        "3px";

                    ligneSeparation.style.transform =
                        "translateY(-50%)";

                    ligneSeparation.style.backgroundColor =
                        "red";

                    ligneSeparation.style.boxShadow =
                        "0 0 4px rgba(255, 255, 255, 0.9)";

                    ligneSeparation.style.pointerEvents =
                        "none";


                    zoneCapture.append(
                        ligneSeparation
                    );


                    zoneCapture.addEventListener(
                        "pointerdown",
                        commencerDeplacement
                    );

                    zoneCapture.addEventListener(
                        "pointermove",
                        continuerDeplacement
                    );

                    zoneCapture.addEventListener(
                        "pointerup",
                        terminerDeplacement
                    );

                    zoneCapture.addEventListener(
                        "pointercancel",
                        terminerDeplacement
                    );


                    zonesCapture.push(
                        zoneCapture
                    );

                    calqueGuides.append(
                        zoneCapture
                    );

                }

                actualiserPositionLignes();

            }


            // ==============================
            // ASSEMBLAGE DE L’APERÇU
            // ==============================

            conteneurPage.append(
                canvasApercu,
                calqueGuides
            );

            zoneApercu.append(
                conteneurPage
            );

            actualiserGuides();
            // ==============================
            // BOUTONS
            // ==============================

            const zoneBoutons =
                document.createElement("div");

            zoneBoutons.style.display =
                "flex";

            zoneBoutons.style.justifyContent =
                "flex-end";

            zoneBoutons.style.gap =
                "12px";

            zoneBoutons.style.marginTop =
                "20px";


            const boutonAnnuler =
                document.createElement("button");

            boutonAnnuler.type =
                "button";

            boutonAnnuler.textContent =
                "Annuler";

            boutonAnnuler.style.padding =
                "10px 18px";

            boutonAnnuler.style.cursor =
                "pointer";


            const boutonImporter =
                document.createElement("button");

            boutonImporter.type =
                "button";

            boutonImporter.textContent =
                "Importer";

            boutonImporter.style.padding =
                "10px 18px";

            boutonImporter.style.cursor =
                "pointer";

            boutonImporter.style.fontWeight =
                "bold";


            // ==============================
            // ASSEMBLAGE DE LA FENÊTRE
            // ==============================

            zoneBoutons.append(
                boutonAnnuler,
                boutonImporter
            );

            fenetre.append(
                titre,
                zoneDisposition,
                zoneApercu,
                zoneBoutons
            );
            fond.append(
                fenetre
            );

            document.body.append(
                fond
            );


            // Empêche la page située derrière
            // de défiler pendant l’ouverture.

            const ancienDebordement =
                document.body.style.overflow;

            document.body.style.overflow =
                "hidden";


            // ==============================
            // FERMETURE
            // ==============================

            function fermerFenetre(
                reglage
            ) {

                document.removeEventListener(
                    "keydown",
                    gererClavier
                );

                document.body.style.overflow =
                    ancienDebordement;

                fond.remove();

                resoudre(
                    reglage
                );

            }


            // ==============================
            // CLAVIER
            // ==============================

            function gererClavier(
                evenement
            ) {

                if (
                    evenement.key === "Escape"
                ) {

                    fermerFenetre(
                        null
                    );

                }

            }


            // ==============================
            // ÉVÉNEMENTS
            // ==============================


            boutonAnnuler.addEventListener(
                "click",
                function () {

                    fermerFenetre(
                        null
                    );

                }
            );


            boutonImporter.addEventListener(
                "click",
                function () {

            fermerFenetre({
                pourcentageImage:
                 pourcentageSeparation / 100,

                nombreCartesParPage:
                 nombreCartesParPage
            });
                }
            );


            document.addEventListener(
                "keydown",
                gererClavier
            );


            // Le bouton Importer reçoit
            // automatiquement le clavier.

            boutonImporter.focus();

        }
    );

}