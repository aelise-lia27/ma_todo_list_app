import { sauvegarderTaches, chargerTaches } from "./storage.js";
import { recupererTachesAPI } from "./api.js";
const formulaire = document.querySelector("#form-tache");
const champTache = document.querySelector("#nouvelle-tache");
const listeTaches = document.querySelector("#liste-taches");
const boutonAPI = document.querySelector("#charger-api");
let taches = chargerTaches();


const afficherTaches = () => {
    listeTaches.innerHTML = "";

    taches.forEach((tache) => {
        const element = document.createElement("li");

        element.innerHTML = `
            <span style="${tache.completed ? 'text-decoration: line-through' : ''}">
                ${tache.title}
            </span>

            <button class="terminer" data-id="${tache.id}">
                ${tache.completed ? "Réactiver" : "Terminer"}
            </button>

            <button class="supprimer" data-id="${tache.id}">
                Supprimer
            </button>
        `;

        listeTaches.appendChild(element);
    });
};

const ajouterTache = (titre) => {
    const nouvelleTache = {
        id: Date.now(),
        title: titre,
        completed: false
    };

    taches = [...taches, nouvelleTache];

    sauvegarderTaches(taches);
    afficherTaches();
};

formulaire.addEventListener("submit", (event) => {
    event.preventDefault();

    const titre = champTache.value.trim();

    if (titre === "") {
        return;
    }

    ajouterTache(titre);

    champTache.value = "";
});

boutonAPI.addEventListener("click", async () => {
    const tachesAPI = await recupererTachesAPI();

    taches = tachesAPI.map((tache) => ({
        ...tache
    }));

    sauvegarderTaches(taches);
    afficherTaches();
});

afficherTaches();


listeTaches.addEventListener("click", (event) => {
    const id = Number(event.target.dataset.id);

    if (event.target.classList.contains("terminer")) {
        taches = taches.map((tache) => {
            if (tache.id === id) {
                return {
                    ...tache,
                    completed: !tache.completed
                };
            }

            return tache;
        });
    }

    if (event.target.classList.contains("supprimer")) {
        taches = taches.filter((tache) => tache.id !== id);
    }

    sauvegarderTaches(taches);
    afficherTaches();
});