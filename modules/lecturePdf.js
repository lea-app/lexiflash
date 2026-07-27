// ==============================
// LECTURE DES PDF AVEC PDF.JS
// ==============================

import * as pdfjsLib from
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs";


pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs";


// ==============================
// OUVERTURE DU PDF
// ==============================

export async function chargerPdf(fichier) {

    const donnees =
        await fichier.arrayBuffer();

    return pdfjsLib.getDocument({

        data: donnees

    }).promise;

}