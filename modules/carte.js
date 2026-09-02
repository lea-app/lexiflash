// ==============================
// CRÉATION DES CARTES
// ==============================

export function creerCarte(
    texte,
    image,
    informations = {}
) {

    return {

        id:
            crypto.randomUUID(),

        texte:
            texte,

        image:
            image,

        page:
            informations.page
            ?? null,

        cote:
            informations.cote
            ?? null,

        favori:
            informations.favori
            ?? false,

        cachee:
            informations.cachee
            ?? false,

        episode:
             informations.episode
            ?? null,

        difficulte:
            informations.difficulte
            ?? 1,

        dateCreation:
            new Date().toISOString()

    };

}