
const CLE_STOCKAGE = "mes-taches";

// Sauvegarder les tâches dans le navigateur
export const sauvegarderTaches = (taches) => {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(taches));
};

// Récupérer les tâches sauvegardées
export const chargerTaches = () => {
    const donnees = localStorage.getItem(CLE_STOCKAGE);

    if (!donnees) {
        return [];
    }

    try {
        const taches = JSON.parse(donnees);
        return Array.isArray(taches) ? taches : [];
    } catch (erreur) {
        console.error("Erreur de lecture du stockage :", erreur);
        return [];
    }
};
