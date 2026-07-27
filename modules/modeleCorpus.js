// ==============================
// CRÉATION DES CORPUS
// ==============================

export function creerCorpus(
    nom,
    cartes,
    informations = {}
) {

    return {

        id:
            crypto.randomUUID(),

        nom:
            nom,

        niveau:
            informations.niveau
            ?? null,

        cartes:
            cartes,

        source:
            informations.source
            ?? null,

        dateCreation:
            new Date().toISOString()

    };

}