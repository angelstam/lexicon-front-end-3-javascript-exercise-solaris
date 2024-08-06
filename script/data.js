const BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/";

getPlanets().then(console.log);

async function getPlanets() {
    let planets = getPlanetsFromLocalStorage();

    if (planets.length === 0) {
        planets = await getApiBodies();
        planets = planets.map(setPlanetColor);
        setPlanetsInLocalStorage(planets);
    }

    return planets;
}

function setPlanetColor(planet) {
    switch (planet.id) {
        case 0: // Sun
            planet.color = "#FFD029";
            break;
        case 1: // Mercury
            planet.color = "#888888";
            break;
        case 2: // Venus
            planet.color = "#E7CDCD";
            break;
        case 3: // Earth
            planet.color = "#428ED4";
            break;
        case 4: // Mars
            planet.color = "#EF5F5F";
            break;
        case 5: // Jupiter
            planet.color = "#E29468";
            break;
        case 6: // Saturn
            planet.color = "#C7AA72";
            break;
        case 7: // Uranus
            planet.color = "#C9D4F1";
            break;
        case 8: // Neptun
            planet.color = "#7A91A7";
            break;
    }

    return planet;
}

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

function getPlanetsFromLocalStorage() {
    // Get planets from localStorage.
    return JSON.parse(localStorage.getItem("planets")) || [];
}

function setPlanetsInLocalStorage(planets) {
    // Save planets to localStorage.
    localStorage.setItem("planets", JSON.stringify(planets));
}

function getFavoritePlanets() {
    // Get favorites from localStorage.
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function setFavoritePlanets(favorites) {
    // Save favorites to localStorage.
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Johan, Mattias: Add planet to favories
function addPlanetToFavorites(planet) {
  const favorites = getFavoritePlanets();

  // Check if the planet is already in favorites.
  if (favorites.findIndex((favorite) => favorite.id === planet.id) === -1) {
    favorites.push(planet);
    setFavoritePlanets(favorites);
  }
}

// Johan, Mattias: Remove planet from favorites
function removePlanetFromFavorites(planetId) {
  const favorites = getFavoritePlanets();
  setFavoritePlanets(favorites.filter((favorite) => planetId !== favorite.id));
}