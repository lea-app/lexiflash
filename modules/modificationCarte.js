// ==============================
// MODIFICATION D’UNE CARTE
// ==============================

import {
    application
} from "./etat.js";

import {
    sauvegarderCorpus
} from "./baseDonnees.js";

import {
    afficherBibliotheque
} from "./bibliotheque.js";


// ==============================
// RECHERCHE DU CORPUS DE LA CARTE
// ==============================

function trouverCorpusDeCarte(
    carte
) {

    return application.bibliotheque.find(
        function (corpus) {

            return corpus.cartes.some(
                function (carteDuCorpus) {

                    return carteDuCorpus.id ===
                        carte.id;

                }
            );

        }
    );

}


// ==============================
// INVERSION D’UNE PROPRIÉTÉ
// ==============================

export async function inverserProprieteCarte(
    carte,
    propriete
) {

    if (!carte) {

        return false;

    }

    const corpusProprietaire =
        trouverCorpusDeCarte(
            carte
        );

    if (!corpusProprietaire) {

        console.error(
            "Impossible de retrouver le corpus de la carte."
        );

        return false;

    }

    const ancienneValeur =
        Boolean(
            carte[propriete]
        );

    carte[propriete] =
        !ancienneValeur;

    try {

        await sauvegarderCorpus(
            corpusProprietaire
        );

        afficherBibliotheque();

        return true;

    } catch (erreur) {

        carte[propriete] =
            ancienneValeur;

        afficherBibliotheque();

        console.error(
            `Impossible de modifier la propriété "${propriete}" :`,
            erreur
        );

        return false;

    }

}