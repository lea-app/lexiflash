// ==============================
// OUTILS GÉNÉRAUX
// ==============================

export function creerNomFichier(texte) {

    return texte
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .toLowerCase()
        .trim();

}


export function creerCanvas() {

    return document.createElement("canvas");

}


export function viderCanvas(canvas) {

    const contexte =
        canvas.getContext("2d");

    contexte.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    canvas.width = 0;
    canvas.height = 0;

}


export function copierCanvas(
    canvasSource,
    canvasDestination
) {

    canvasDestination.width =
        canvasSource.width;

    canvasDestination.height =
        canvasSource.height;

    const contexte =
        canvasDestination.getContext("2d");

    contexte.clearRect(
        0,
        0,
        canvasDestination.width,
        canvasDestination.height
    );

    contexte.drawImage(
        canvasSource,
        0,
        0
    );

}


export function nettoyerTextePdf(texte) {

    return texte
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

}