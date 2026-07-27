// ==============================
// SÉLECTION D’UN CORPUS
// ==============================

import { application } from "./etat.js";

import {
    nomCorpus
} from "./dom.js";

import {
    demarrerCorpus
} from "./corpus.js";


// ==============================
// ACTIVATION D’UN CORPUS
// ==============================

export function selectionnerCorpus(
    corpus
) {

    application.corpusActuel =
        corpus;

    application.mots =
        [...corpus.cartes];

    application.position =
        0;

    nomCorpus.textContent =
        corpus.nom;

    demarrerCorpus();

}