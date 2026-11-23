
const URL_API = "https://jsonplaceholder.typicode.com/todos";

export const recupererTachesAPI = async () => {
    try {
        const reponse = await fetch(URL_API);

        if (!reponse.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }

        const donnees = await reponse.json();

        return donnees.slice(0, 10);

    } catch (erreur) {
        console.error("Impossible de récupérer les tâches :", erreur);
        return [];
    }
};
