// ==============================
// BASE DE DONNÉES INDEXEDDB
// ==============================

const NOM_BASE =
    "lexiflash";

const VERSION_BASE =
    1;

const NOM_MAGASIN =
    "corpus";


// ==============================
// OUVERTURE DE LA BASE
// ==============================

function ouvrirBaseDonnees() {

    return new Promise(
        function (resolve, reject) {

            const requete =
                indexedDB.open(
                    NOM_BASE,
                    VERSION_BASE
                );


            // Création ou mise à jour
            // de la structure de la base

            requete.onupgradeneeded =
                function () {

                    const base =
                        requete.result;

                    if (
                        !base.objectStoreNames.contains(
                            NOM_MAGASIN
                        )
                    ) {

                        base.createObjectStore(
                            NOM_MAGASIN,
                            {
                                keyPath: "id"
                            }
                        );

                    }

                };


            // Base ouverte avec succès

            requete.onsuccess =
                function () {

                    resolve(
                        requete.result
                    );

                };


            // Erreur d’ouverture

            requete.onerror =
                function () {

                    reject(
                        requete.error
                    );

                };

        }
    );

}


// ==============================
// SAUVEGARDE D’UN CORPUS
// ==============================

export async function sauvegarderCorpus(
    corpus
) {

    const base =
        await ouvrirBaseDonnees();

    return new Promise(
        function (resolve, reject) {

            const transaction =
                base.transaction(
                    NOM_MAGASIN,
                    "readwrite"
                );

            const magasin =
                transaction.objectStore(
                    NOM_MAGASIN
                );

            magasin.put(
                corpus
            );

            transaction.oncomplete =
                function () {

                    base.close();

                    resolve();

                };

            transaction.onerror =
                function () {

                    base.close();

                    reject(
                        transaction.error
                    );

                };

        }
    );

}


// ==============================
// LECTURE DE TOUS LES CORPUS
// ==============================

export async function chargerCorpus() {

    const base =
        await ouvrirBaseDonnees();

    return new Promise(
        function (resolve, reject) {

            const transaction =
                base.transaction(
                    NOM_MAGASIN,
                    "readonly"
                );

            const magasin =
                transaction.objectStore(
                    NOM_MAGASIN
                );

            const requete =
                magasin.getAll();

            requete.onsuccess =
                function () {

                    base.close();

                    resolve(
                        requete.result
                    );

                };

            requete.onerror =
                function () {

                    base.close();

                    reject(
                        requete.error
                    );

                };

        }
    );

}


// ==============================
// SUPPRESSION D’UN CORPUS
// ==============================

export async function supprimerCorpusSauvegarde(
    idCorpus
) {

    const base =
        await ouvrirBaseDonnees();

    return new Promise(
        function (resolve, reject) {

            const transaction =
                base.transaction(
                    NOM_MAGASIN,
                    "readwrite"
                );

            const magasin =
                transaction.objectStore(
                    NOM_MAGASIN
                );

            magasin.delete(
                idCorpus
            );

            transaction.oncomplete =
                function () {

                    base.close();

                    resolve();

                };

            transaction.onerror =
                function () {

                    base.close();

                    reject(
                        transaction.error
                    );

                };

        }
    );

}