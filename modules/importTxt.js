// ==============================
// IMPORTATION D’UN CORPUS TXT
// ==============================

import { application } from "./etat.js";

import {
    choisirCorpus,
    fichierCorpus,
    nomCorpus,
    motAffiche,
    progression,
    imageMot,
    motSuivant,
    motPrecedent,
    recommencer
} from "./dom.js";

import {
    masquerApercuPdf
} from "./apercuPdf.js";

import {
    demarrerCorpus
} from "./corpus.js";

import {
    creerCarte
} from "./carte.js";

import {
    creerCorpus
} from "./modeleCorpus.js";

import {
    afficherBibliotheque
} from "./bibliotheque.js";

import {
    selectionnerCorpus
} from "./selectionCorpus.js";

import { sauvegarderCorpus } from "./baseDonnees.js";


// ==============================
// INITIALISATION DE L’IMPORT TXT
// ==============================

export function initialiserImportTxt() {

    choisirCorpus.addEventListener(
        "click",
        function () {

            fichierCorpus.click();

        }
    );


    fichierCorpus.addEventListener(
        "change",
        function () {

            const fichier =
                fichierCorpus.files[0];

            if (!fichier) {

                return;

            }

        const corpusExisteDeja =
    application.bibliotheque.some(
        function (corpus) {

            return (
                corpus.nom === fichier.name &&
                corpus.source === "txt"
            );

        }
    );

if (
    corpusExisteDeja
) {

    window.alert(
        "Ce corpus TXT a déjà été importé."
    );

    fichierCorpus.value = "";

    return;

}

            masquerApercuPdf();

            application.pdf = null;
            application.typeCorpus = "txt";

            const lecteur =
                new FileReader();

            lecteur.addEventListener(
    "load",
    async function () {

                    const lignes =
                        lecteur.result
                            .split(/\r?\n/)
                            .map(function (ligne) {

                                return ligne
                                    .trim()
                                    .toLowerCase();

                            })
                            .filter(function (ligne) {

                                return ligne !== "";

                            });

                    const textesUniques =
                        [...new Set(lignes)];


                    // ==============================
                    // VÉRIFICATION DU CONTENU
                    // ==============================

                    if (
                        textesUniques.length === 0
                    ) {

                        nomCorpus.textContent =
                            "Le corpus est vide.";

                        motAffiche.textContent =
                            "—";

                        progression.textContent =
                            "0 / 0";

                        imageMot.hidden = true;

                        motSuivant.disabled = true;
                        motPrecedent.disabled = true;
                        recommencer.disabled = true;

                        return;

                    }


                    // ==============================
                    // CRÉATION DES CARTES
                    // ==============================

                    const cartesTxt =
                        textesUniques.map(
                            function (texte) {

                                return creerCarte(
                                    texte
                                );

                            }
                        );


                    // ==============================
                    // CRÉATION DU CORPUS
                    // ==============================

                    const corpusTxt =
                        creerCorpus(
                            fichier.name,
                            cartesTxt,
                            {
                                source: "txt"
                            }
                        );


                    // ==============================
                    // AJOUT À LA BIBLIOTHÈQUE
                    // ==============================

                    application.bibliotheque.push(
                        corpusTxt
                    );
                
                    try {

    await sauvegarderCorpus(
        corpusTxt
    );

} catch (erreurSauvegarde) {

    console.error(
        "Impossible de sauvegarder le corpus TXT :",
        erreurSauvegarde
    );

}


                    // ==============================
                    // SÉLECTION DU CORPUS
                    // ==============================

                    selectionnerCorpus(
                        corpusTxt
                    );

                    afficherBibliotheque();


                    // ==============================
                    // DÉMARRAGE DU CORPUS
                    // ==============================

                    nomCorpus.textContent =
                        `${fichier.name} — ${corpusTxt.cartes.length} mots`;

                    demarrerCorpus();

                }
            );

            lecteur.readAsText(
                fichier
            );

        }
    );

}