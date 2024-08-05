const BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/";

getApiBodies().then(console.log);

async function getApiKey() {
    try {
        const response = await fetch(BASE_URL + 'keys', {method: 'POST'});
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.key;
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
}

async function getApiBodies() {
    try {
        const apiKey = await getApiKey();

        const response = await fetch(BASE_URL + 'bodies', {method: 'GET', headers: {'x-zocom': apiKey}});
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.bodies;
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
}

function getFavoritePlanets() {
    // Get favorites from localStorage.
    return JSON.parse(localStorage.getItem("favorites")) || [];;
}

function setFavoritePlanets(favorites) {
    // Save favorites to localStorage.
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addPlanetToFavorites(planetId) {
    const favorites = getFavoritePlanets();
    // Check if the planet is already in favorites.
    if (favorites.findIndex(id => id === planetId) === -1) {
        favorites.push(planetId);
        setFavoritePlanets(favorites);
    }
}

function removePlanetFromFavorites(planetId) {
    const favorites = getFavoritePlanets();
    setFavoritePlanets(favorites.filter(id => planetId !== id));
}