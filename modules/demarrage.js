// ==============================
// DÉMARRAGE DE L’APPLICATION
// ==============================

import {
    application
} from "./etat.js";

import {
    chargerCorpus
} from "./baseDonnees.js";

import {
    afficherBibliotheque
} from "./bibliotheque.js";


// ==============================
// CHARGEMENT DES DONNÉES
// ==============================

export async function initialiserApplication() {

    try {

        const corpusSauvegardes =
            await chargerCorpus();

        application.bibliotheque =
            corpusSauvegardes;

        afficherBibliotheque();

        console.log(
            `${corpusSauvegardes.length} corpus chargé(s) depuis IndexedDB.`
        );

    } catch (erreur) {

        console.error(
            "Impossible de charger la bibliothèque sauvegardée :",
            erreur
        );

        application.bibliotheque =
            [];

        afficherBibliotheque();

    }

}