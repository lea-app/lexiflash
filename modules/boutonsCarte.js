// ==============================
// BOUTONS LIÉS À UNE CARTE
// ==============================

import {
    boutonFavori,
    boutonMasquer
} from "./dom.js";


// ==============================
// BOUTON FAVORI
// ==============================

export function mettreAJourBoutonFavori(
    carteActuelle
) {

    if (!carteActuelle) {

        boutonFavori.disabled =
            true;

        boutonFavori.textContent =
            "☆ Ajouter aux favoris";

        boutonFavori.classList.remove(
            "est-favori"
        );

        return;

    }

    boutonFavori.disabled =
        false;

    if (carteActuelle.favori) {

        boutonFavori.textContent =
            "⭐ Retirer des favoris";

        boutonFavori.classList.add(
            "est-favori"
        );

    } else {

        boutonFavori.textContent =
            "☆ Ajouter aux favoris";

        boutonFavori.classList.remove(
            "est-favori"
        );

    }

}


// ==============================
// BOUTON DE MASQUAGE
// ==============================

export function mettreAJourBoutonMasquer(
    carteActuelle
) {

    if (!carteActuelle) {

        boutonMasquer.disabled =
            true;

        boutonMasquer.textContent =
            "🙈 Masquer cette carte";

        return;

    }

    boutonMasquer.disabled =
        false;

    if (carteActuelle.cachee) {

        boutonMasquer.textContent =
            "👁️ Réafficher cette carte";

    } else {

        boutonMasquer.textContent =
            "🙈 Masquer cette carte";

    }

}


// ==============================
// TOUS LES BOUTONS DE LA CARTE
// ==============================

export function mettreAJourBoutonsCarte(
    carteActuelle
) {

    mettreAJourBoutonFavori(
        carteActuelle
    );

    mettreAJourBoutonMasquer(
        carteActuelle
    );

}