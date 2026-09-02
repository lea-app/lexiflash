// ==============================
// ORGANISATION DES ÉPISODES
// ==============================

import {
    sauvegarderCorpus
} from "./baseDonnees.js";

import {
    application
} from "./etat.js";

import {
    selectionnerCorpus
} from "./selectionCorpus.js";


export function organiserEpisodes(
    corpus
) {

    // Attribution temporaire des épisodes
    // Rien n'est modifié dans le corpus
    // tant qu'on ne clique pas sur Enregistrer.

    const attribution =
        new Map();

    corpus.cartes.forEach(
        function (carte) {

            attribution.set(
                carte.id,
                carte.episode ?? null
            );

        }
    );


    // Fond sombre

    const fond =
        document.createElement("div");

    fond.className =
        "fond-modale-episodes";


    // Fenêtre

    const fenetre =
        document.createElement("div");

    fenetre.className =
        "modale-episodes";


    // Titre

    const titre =
        document.createElement("h2");

    titre.textContent =
        "Organiser les épisodes";


    // Nom du corpus

    const nom =
        document.createElement("p");

    nom.textContent =
        corpus.nom;


    // Question

    const question =
        document.createElement("label");

    question.textContent =
        "Combien d’épisodes ?";


    // Nombre d'épisodes

    const champNombre =
        document.createElement("input");

    champNombre.type =
        "number";

    champNombre.min =
        "1";


    const episodesExistants =
        corpus.cartes
            .map(
                function (carte) {

                    return carte.episode ?? 0;

                }
            );

    const plusGrandEpisode =
        Math.max(
            1,
            ...episodesExistants
        );

    champNombre.value =
        plusGrandEpisode;


    // Boutons

    const zoneBoutons =
        document.createElement("div");

    zoneBoutons.className =
        "boutons-modale-episodes";


    const boutonAnnuler =
        document.createElement("button");

    boutonAnnuler.textContent =
        "Annuler";


    const boutonContinuer =
        document.createElement("button");

    boutonContinuer.textContent =
        "Continuer";


    // Annuler

    boutonAnnuler.addEventListener(
        "click",
        function () {

            fond.remove();

        }
    );


    // Continuer

    boutonContinuer.addEventListener(
        "click",
        function () {

            const nombreEpisodes =
                Number(
                    champNombre.value
                );

            if (
                !Number.isInteger(nombreEpisodes)
                || nombreEpisodes < 1
            ) {

                window.alert(
                    "Indique un nombre d’épisodes valide."
                );

                return;

            }


            // Si on réduit le nombre d'épisodes,
            // les anciennes attributions trop élevées
            // sont retirées temporairement.

            corpus.cartes.forEach(
                function (carte) {

                    const episode =
                        attribution.get(
                            carte.id
                        );

                    if (
                        episode > nombreEpisodes
                    ) {

                        attribution.set(
                            carte.id,
                            null
                        );

                    }

                }
            );


            afficherEpisode(
                fenetre,
                fond,
                corpus,
                nombreEpisodes,
                1,
                attribution
            );

        }
    );


    // Assemblage

    zoneBoutons.appendChild(
        boutonAnnuler
    );

    zoneBoutons.appendChild(
        boutonContinuer
    );

    fenetre.appendChild(
        titre
    );

    fenetre.appendChild(
        nom
    );

    fenetre.appendChild(
        question
    );

    fenetre.appendChild(
        champNombre
    );

    fenetre.appendChild(
        zoneBoutons
    );

    fond.appendChild(
        fenetre
    );

    document.body.appendChild(
        fond
    );

}


// ==============================
// SÉLECTION DES MOTS D’UN ÉPISODE
// ==============================

function afficherEpisode(
    fenetre,
    fond,
    corpus,
    nombreEpisodes,
    numeroEpisode,
    attribution
) {

    fenetre.innerHTML = "";


    // Titre

    const titre =
        document.createElement("h2");

    titre.textContent =
        `Épisode ${numeroEpisode} / ${nombreEpisodes}`;


    // Consigne

    const indication =
        document.createElement("p");

    indication.textContent =
        "Sélectionne les mots de cet épisode.";


    // Liste

    const liste =
        document.createElement("div");

    liste.className =
        "liste-mots-episodes";


const cartesTriees =
    [...corpus.cartes].sort(
        function (carteA, carteB) {

            function motSansDeterminant(texte) {

                return texte
                    .trim()
                    .replace(
                        /^(le|la|les|l['’]|un|une|des|du|de la|de l['’])\s*/i,
                        ""
                    );

            }

            return motSansDeterminant(
                carteA.texte
            ).localeCompare(
                motSansDeterminant(
                    carteB.texte
                ),
                "fr",
                {
                    sensitivity: "base"
                }
            );

        }
    );


cartesTriees.forEach(
    function (carte) {
        
            const episodeActuel =
                attribution.get(
                    carte.id
                );


            // On affiche :
            // - les mots encore non attribués
            // - les mots déjà attribués à cet épisode

            if (
                episodeActuel !== null
                && episodeActuel !== numeroEpisode
            ) {

                return;

            }


            const ligne =
                document.createElement("label");

            ligne.className =
                "mot-episode";


            const caseMot =
                document.createElement("input");

            caseMot.type =
                "checkbox";

            caseMot.dataset.idCarte =
                carte.id;

            caseMot.checked =
                episodeActuel === numeroEpisode;


            const texte =
                document.createElement("span");

            texte.textContent =
                carte.texte;


            ligne.appendChild(
                caseMot
            );

            ligne.appendChild(
                texte
            );

            liste.appendChild(
                ligne
            );

        }
    );


    // ==============================
    // BOUTONS
    // ==============================

    const zoneBoutons =
        document.createElement("div");

    zoneBoutons.className =
        "boutons-modale-episodes";


    // Annuler

    const boutonAnnuler =
        document.createElement("button");

    boutonAnnuler.textContent =
        "Annuler";

    boutonAnnuler.addEventListener(
        "click",
        function () {

            fond.remove();

        }
    );


    zoneBoutons.appendChild(
        boutonAnnuler
    );


    // Précédent

    if (
        numeroEpisode > 1
    ) {

        const boutonPrecedent =
            document.createElement("button");

        boutonPrecedent.textContent =
            "◀ Précédent";

        boutonPrecedent.addEventListener(
            "click",
            function () {

                enregistrerSelectionEpisode(
                    liste,
                    corpus,
                    numeroEpisode,
                    attribution
                );

                afficherEpisode(
                    fenetre,
                    fond,
                    corpus,
                    nombreEpisodes,
                    numeroEpisode - 1,
                    attribution
                );

            }
        );

        zoneBoutons.appendChild(
            boutonPrecedent
        );

    }


    // Suivant

    if (
        numeroEpisode < nombreEpisodes
    ) {

        const boutonSuivant =
            document.createElement("button");

        boutonSuivant.textContent =
            "Suivant ▶";

        boutonSuivant.addEventListener(
            "click",
            function () {

                enregistrerSelectionEpisode(
                    liste,
                    corpus,
                    numeroEpisode,
                    attribution
                );

                afficherEpisode(
                    fenetre,
                    fond,
                    corpus,
                    nombreEpisodes,
                    numeroEpisode + 1,
                    attribution
                );

            }
        );

        zoneBoutons.appendChild(
            boutonSuivant
        );

    }


    // Enregistrer

    else {

        const boutonEnregistrer =
            document.createElement("button");

        boutonEnregistrer.textContent =
            "Enregistrer";

        boutonEnregistrer.addEventListener(
            "click",
            async function () {

                enregistrerSelectionEpisode(
                    liste,
                    corpus,
                    numeroEpisode,
                    attribution
                );


                corpus.cartes.forEach(
                    function (carte) {

                        carte.episode =
                            attribution.get(
                                carte.id
                            )
                            ?? null;

                    }
                );


                corpus.nombreEpisodes =
                    nombreEpisodes;


                try {

await sauvegarderCorpus(
    corpus
);


// Si ce corpus est actuellement ouvert,
// on actualise immédiatement les épisodes.

if (
    application.corpusActuel
    &&
    application.corpusActuel.id === corpus.id
) {

    selectionnerCorpus(
        corpus
    );

}


fond.remove();

                } catch (erreur) {

                    console.error(
                        "Impossible de sauvegarder les épisodes :",
                        erreur
                    );

                    window.alert(
                        "Impossible de sauvegarder les épisodes."
                    );

                }

            }
        );

        zoneBoutons.appendChild(
            boutonEnregistrer
        );

    }


    // Assemblage

    fenetre.appendChild(
        titre
    );

    fenetre.appendChild(
        indication
    );

    fenetre.appendChild(
        liste
    );

    fenetre.appendChild(
        zoneBoutons
    );

}


// ==============================
// MÉMORISATION D’UN ÉPISODE
// ==============================

function enregistrerSelectionEpisode(
    liste,
    corpus,
    numeroEpisode,
    attribution
) {

    // On retire d'abord les anciennes
    // attributions de cet épisode.

    corpus.cartes.forEach(
        function (carte) {

            if (
                attribution.get(
                    carte.id
                ) === numeroEpisode
            ) {

                attribution.set(
                    carte.id,
                    null
                );

            }

        }
    );


    // Puis on enregistre les cases cochées.

    const cases =
        liste.querySelectorAll(
            'input[type="checkbox"]'
        );

    cases.forEach(
        function (caseMot) {

            if (
                caseMot.checked
            ) {

                attribution.set(
                    caseMot.dataset.idCarte,
                    numeroEpisode
                );

            }

        }
    );

}