// ==============================
// IMPORTATION D’UN CORPUS PDF
// ==============================

import { application } from "./etat.js";

import {
    choisirPdf,
    fichierPdf,
    nomCorpus,
    motAffiche,
    progression,
    imageMot,
    motSuivant,
    motPrecedent,
    recommencer
} from "./dom.js";

import {
    chargerPdf
} from "./lecturePdf.js";

import {
    creerCorpusDepuisPdf
} from "./pdf.js";

import {
    masquerApercuPdf
} from "./apercuPdf.js";

import {
    ouvrirReglageImportPdf
} from "./reglageImportPdf.js";

import {
    demarrerCorpus
} from "./corpus.js";

import {
    creerCorpus
} from "./modeleCorpus.js";

import {
    afficherBibliotheque
} from "./bibliotheque.js";

import {
    selectionnerCorpus
} from "./selectionCorpus.js";

import {
    sauvegarderCorpus
} from "./baseDonnees.js";



// ==============================
// INITIALISATION DE L’IMPORT PDF
// ==============================

export function initialiserImportPdf() {

    choisirPdf.addEventListener(
        "click",
        function () {

            fichierPdf.click();

        }
    );


    fichierPdf.addEventListener(
        "change",
        async function () {

            const fichier =
                fichierPdf.files[0];

            if (!fichier) {

                return;

            }


            // ==============================
            // VÉRIFICATION DES DOUBLONS
            // ==============================

            const corpusExisteDeja =
                application.bibliotheque.some(
                    function (corpus) {

                        return (
                            corpus.nom === fichier.name &&
                            corpus.source === "pdf"
                        );

                    }
                );

            if (
                corpusExisteDeja
            ) {

                window.alert(
                    "Ce corpus PDF a déjà été importé."
                );

                fichierPdf.value =
                    "";

                return;

            }


            // ==============================
            // PRÉPARATION DE L’INTERFACE
            // ==============================

            application.corpusActuel =
                null;

            application.mots =
                [];

            application.position =
                0;

            application.typeCorpus =
                "pdf";

            masquerApercuPdf();

            imageMot.hidden =
                true;

            motSuivant.disabled =
                true;

            motPrecedent.disabled =
                true;

            recommencer.disabled =
                true;

            nomCorpus.textContent =
                "Ouverture du PDF...";

            motAffiche.textContent =
                "Lecture en cours...";

            progression.textContent =
                "PDF";


            try {

                // ==============================
                // CHARGEMENT DU PDF
                // ==============================

                const pdf =
                    await chargerPdf(
                        fichier
                    );

                application.pdf =
                    pdf;


                // ==============================
                // RÉGLAGE AVANT IMPORTATION
                // ==============================

const reglageImport =
    await ouvrirReglageImportPdf(
        pdf
    );

if (
    !reglageImport
) {

                    application.pdf =
                        null;

                    nomCorpus.textContent =
                        "Importation annulée";

                    motAffiche.textContent =
                        "—";

                    progression.textContent =
                        "0 / 0";

                    imageMot.hidden =
                        true;

                    fichierPdf.value =
                        "";

                    return;

                }


                // ==============================
                // TRAITEMENT DU PDF
                // ==============================

const resultat =
    await creerCorpusDepuisPdf(
        pdf,
        function (
            numeroPage,
            nombreDePages
        ) {

            nomCorpus.textContent =
                `Analyse de la page ${numeroPage} sur ${nombreDePages}...`;

            motAffiche.textContent =
                "Création du corpus PDF...";

            progression.textContent =
                `${numeroPage} / ${nombreDePages}`;

        },
        reglageImport.pourcentageImage,
        reglageImport.nombreCartesParPage
    );
    
                // ==============================
                // VÉRIFICATION DU CONTENU
                // ==============================

                if (
                    resultat.cartes.length === 0
                ) {

                    nomCorpus.textContent =
                        "Aucune carte détectée dans ce PDF.";

                    motAffiche.textContent =
                        "—";

                    progression.textContent =
                        "0 / 0";

                    fichierPdf.value =
                        "";

                    return;

                }


                // ==============================
                // CRÉATION DU CORPUS
                // ==============================

                const corpusPdf =
                    creerCorpus(
                        fichier.name,
                        resultat.cartes,
                        {
                            source: "pdf"
                        }
                    );


                // ==============================
                // AJOUT À LA BIBLIOTHÈQUE
                // ==============================

                application.bibliotheque.push(
                    corpusPdf
                );


                // ==============================
                // SAUVEGARDE
                // ==============================

                try {

                    await sauvegarderCorpus(
                        corpusPdf
                    );

                } catch (
                    erreurSauvegarde
                ) {

                    console.error(
                        "Impossible de sauvegarder le corpus PDF :",
                        erreurSauvegarde
                    );

                }


                // ==============================
                // SÉLECTION DU CORPUS
                // ==============================

                selectionnerCorpus(
                    corpusPdf
                );

                afficherBibliotheque();


                // ==============================
                // DÉMARRAGE DU CORPUS
                // ==============================

                nomCorpus.textContent =
                    `${fichier.name} — ${corpusPdf.cartes.length} cartes détectées`;

                demarrerCorpus();

                console.log(
                    "Corpus PDF créé :",
                    corpusPdf
                );


                // Permet de sélectionner de nouveau
                // le même fichier plus tard.

                fichierPdf.value =
                    "";

            } catch (
                erreur
            ) {

                console.error(
                    "Erreur pendant la lecture du PDF :",
                    erreur
                );

                nomCorpus.textContent =
                    "Impossible de lire ce PDF.";

                motAffiche.textContent =
                    "—";

                progression.textContent =
                    "0 / 0";

                imageMot.hidden =
                    true;

                application.pdf =
                    null;

                fichierPdf.value =
                    "";

                masquerApercuPdf();

            }

        }
    );

}