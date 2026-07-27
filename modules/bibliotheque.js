// ==============================
// BIBLIOTHÈQUE DES CORPUS
// ==============================

import { application } from "./etat.js";

import {
    listeCorpus,
    nomCorpus,
    motAffiche,
    progression,
    imageMot,
    motSuivant,
    motPrecedent,
    recommencer
} from "./dom.js";

import {
    selectionnerCorpus
} from "./selectionCorpus.js";

import {
    creerElementCorpus
} from "./elementCorpus.js";

import {
    sauvegarderCorpus,
    supprimerCorpusSauvegarde
} from "./baseDonnees.js";


// ==============================
// RÉINITIALISATION DE LA LECTURE
// ==============================

function reinitialiserLecture() {

    application.corpusActuel = null;
    application.mots = [];
    application.position = 0;

    nomCorpus.textContent =
        "Aucun corpus sélectionné";

    motAffiche.textContent =
        "—";

    progression.textContent =
        "0 / 0";

    imageMot.hidden = true;
    imageMot.removeAttribute("src");

    motSuivant.disabled = true;
    motPrecedent.disabled = true;
    recommencer.disabled = true;

}


// ==============================
// OUVERTURE D’UN CORPUS
// ==============================

function ouvrirCorpus(
    corpus
) {

    selectionnerCorpus(
        corpus
    );

    afficherBibliotheque();

}


// ==============================
// DEMANDE DE RENOMMAGE
// ==============================

async function demanderRenommage(
        corpus
) {

    const nouveauNom =
        window.prompt(
            "Nouveau nom du corpus :",
            corpus.nom
        );

    if (
        nouveauNom === null
    ) {

        return;

    }

    const nomNettoye =
        nouveauNom.trim();

    if (
        nomNettoye === ""
    ) {

        window.alert(
            "Le nom du corpus ne peut pas être vide."
        );

        return;

    }

    corpus.nom =
        nomNettoye;
    try {

    await sauvegarderCorpus(
        corpus
    );

} catch (erreur) {

    console.error(
        "Impossible de sauvegarder le renommage :",
        erreur
    );

}

    if (
        application.corpusActuel?.id ===
        corpus.id
    ) {

        nomCorpus.textContent =
            corpus.nom;

    }

    afficherBibliotheque();

}


// ==============================
// DEMANDE DE SUPPRESSION
// ==============================

function demanderSuppression(
    corpus
) {

    const confirmation =
        window.confirm(
            `Supprimer le corpus « ${corpus.nom} » ?`
        );

    if (
        !confirmation
    ) {

        return;

    }

    supprimerCorpus(
        corpus
    );

}


// ==============================
// SUPPRESSION D’UN CORPUS
// ==============================

async function supprimerCorpus(
corpus
) {

    const index =
        application.bibliotheque.findIndex(
            function (corpusBibliotheque) {

                return (
                    corpusBibliotheque.id ===
                    corpus.id
                );

            }
        );

    if (
        index === -1
    ) {

        return;

    }

    const corpusEtaitActif =
        application.corpusActuel?.id ===
        corpus.id;

    application.bibliotheque.splice(
        index,
        1
    );

    try {

    await supprimerCorpusSauvegarde(
        corpus.id
    );

} catch (erreur) {

    console.error(
        "Impossible de supprimer le corpus de la base :",
        erreur
    );

}

    if (
        corpusEtaitActif
    ) {

        reinitialiserLecture();

    }

    afficherBibliotheque();

}


// ==============================
// AFFICHAGE DE LA BIBLIOTHÈQUE
// ==============================

export function afficherBibliotheque() {

    listeCorpus.innerHTML = "";

    if (
        application.bibliotheque.length === 0
    ) {

        const message =
            document.createElement("p");

        message.className =
            "bibliotheque-vide";

        message.textContent =
            "Aucun corpus importé";

        listeCorpus.appendChild(
            message
        );

        return;

    }

    application.bibliotheque.forEach(
        function (corpus) {

            const elementCorpus =
                creerElementCorpus(
                    corpus,
                    ouvrirCorpus,
                    demanderRenommage,
                    demanderSuppression
                );

            listeCorpus.appendChild(
                elementCorpus
            );

        }
    );

}