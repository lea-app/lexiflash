// ==============================
// ÉLÉMENT VISUEL D’UN CORPUS
// ==============================

import {
    application
} from "./etat.js";


// ==============================
// CRÉATION D’UNE CARTE DE CORPUS
// ==============================

export function creerElementCorpus(
    corpus,
    selectionner,
    renommer,
    supprimer
) {

    const carteCorpus =
        document.createElement("div");

    carteCorpus.className =
        "ligne-corpus";


    if (
        application.corpusActuel?.id ===
        corpus.id
    ) {

        carteCorpus.classList.add(
            "corpus-actif"
        );

    }


    // ==============================
    // ZONE PRINCIPALE
    // ==============================

    const boutonSelection =
        document.createElement("button");

    boutonSelection.type =
        "button";

    boutonSelection.className =
        "bouton-corpus";


    // ---------- titre ----------

    const titre =
        document.createElement("div");

    titre.className =
        "titre-corpus";

    titre.textContent =
        `📄 ${corpus.nom}`;


    // ---------- informations ----------

    const informations =
        document.createElement("div");

    informations.className =
        "infos-corpus";

    const type =
        corpus.source?.toUpperCase()
        ?? "INCONNU";

    const nombreCartes =
        corpus.cartes.length;

    const nombreFavoris =
        corpus.cartes.filter(
            function (carte) {

                return carte.favori;

            }
        ).length;

    const nombreCartesMasquees =
        corpus.cartes.filter(
            function (carte) {

                return carte.cachee;

            }
        ).length;

    const motCarte =
        nombreCartes > 1
            ? "cartes"
            : "carte";

    const motFavori =
        nombreFavoris > 1
            ? "favoris"
            : "favori";

    const motMasquee =
        nombreCartesMasquees > 1
            ? "masquées"
            : "masquée";

    informations.textContent =
        `${type} • ${nombreCartes} ${motCarte}`;


    // ---------- favoris ----------

    const informationsFavoris =
        document.createElement("div");

    informationsFavoris.className =
        "favoris-corpus";

    informationsFavoris.textContent =
        `⭐ ${nombreFavoris} ${motFavori}`;


    // ---------- cartes masquées ----------

    const informationsMasquage =
        document.createElement("div");

    informationsMasquage.className =
        "masquage-corpus";

    informationsMasquage.textContent =
        `🙈 ${nombreCartesMasquees} ${motMasquee}`;


    boutonSelection.appendChild(
        titre
    );

    boutonSelection.appendChild(
        informations
    );

    boutonSelection.appendChild(
        informationsFavoris
    );

    boutonSelection.appendChild(
        informationsMasquage
    );

    boutonSelection.addEventListener(
        "click",
        function () {

            selectionner(
                corpus
            );

        }
    );


    // ==============================
    // ZONE DES ACTIONS
    // ==============================

    const zoneActions =
        document.createElement("div");

    zoneActions.className =
        "actions-corpus";


    // ---------- renommer ----------

    const boutonRenommage =
        document.createElement("button");

    boutonRenommage.type =
        "button";

    boutonRenommage.className =
        "renommer-corpus";

boutonRenommage.textContent =
    "✎";

boutonRenommage.title =
    "Renommer le corpus";

boutonRenommage.setAttribute(
    "aria-label",
    "Renommer le corpus"
);

    boutonRenommage.addEventListener(
        "click",
        function () {

            renommer(
                corpus
            );

        }
    );


    // ---------- supprimer ----------

    const boutonSuppression =
        document.createElement("button");

    boutonSuppression.type =
        "button";

    boutonSuppression.className =
        "supprimer-corpus";

boutonSuppression.textContent =
    "×";
    
boutonSuppression.title =
    "Supprimer le corpus";

boutonSuppression.setAttribute(
    "aria-label",
    "Supprimer le corpus"
);

    boutonSuppression.addEventListener(
        "click",
        function () {

            supprimer(
                corpus
            );

        }
    );


    zoneActions.appendChild(
        boutonRenommage
    );

    zoneActions.appendChild(
        boutonSuppression
    );


    // ==============================
    // ASSEMBLAGE
    // ==============================

    carteCorpus.appendChild(
        boutonSelection
    );

    carteCorpus.appendChild(
        zoneActions
    );

    return carteCorpus;

}