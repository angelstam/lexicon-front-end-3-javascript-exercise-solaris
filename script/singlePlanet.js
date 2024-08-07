window.addEventListener("load", () => {
  renderSinglePlanet();
  setupFavoriteButton();
  setupFavoriteListener();
});

// Johan: get the planet id from the URL
function getIdFromQueryString() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return parseInt(urlParams.get("id"));
}

// Mikaela: display information based on which planet id
async function renderSinglePlanet() {
  const planetId = getIdFromQueryString();
  const planets = await getPlanets();
  planets.forEach((planet) => {
    if (planet.id === planetId) {
      document.querySelector("#planet-title").textContent = planet.name;
      document.querySelector("#planet-subtitle").textContent = planet.latinName;
      document.querySelector("#planet-description").textContent = planet.desc;
      document.querySelector(
        "#planet-circumference"
      ).textContent = `${planet.circumference.toLocaleString()} km`;
      document.querySelector(
        "#planet-distance"
      ).textContent = `${planet.distance.toLocaleString()} km`;
      document.querySelector("#planet-temp-day").textContent = `${planet.temp.day}°C`;
      document.querySelector("#planet-temp-night").textContent = `${planet.temp.night}°C`;

      document.querySelector("#planet-moons").textContent = `${planet.moons.join(", ")}`;
      // Mattias: change --planet-bg-color to planet.color
      document.documentElement.style.setProperty("--planet-bg-color", planet.color);
    }
  });
}

// Mattias: Setup favorite button to show outline/filled depending on if planet is favorited
function setupFavoriteButton() {
  const favoriteButton = document.querySelector("#favorite");
  const planetId = getIdFromQueryString();
  const favoritePlanets = getFavoritePlanets();

  // Check if the planet is in favorites
  const foundPlanet = favoritePlanets.find((planet) => planet.id === planetId);

  // Switch between outline/filled depending on if planet is in favorites
  if (foundPlanet) {
    favoriteButton.classList.remove("fa-regular");
    favoriteButton.classList.add("fa-solid");

  } else {
    favoriteButton.classList.remove("fa-solid");
    favoriteButton.classList.add("fa-regular");
  }
}

// Mattias: Setup the click functionality for adding/removing a planet from favorites
function setupFavoriteListener() {
  const favoriteButton = document.querySelector("#favorite");
  const planetId = getIdFromQueryString();

  favoriteButton.addEventListener("click", async () => {

    // If the planet isn't favorited
    if (favoriteButton.classList.contains("fa-regular")) {
      const validPlanets = await getPlanets();
      addPlanetToFavorites(validPlanets.find(planet => planet.id === planetId));
      setupFavoriteButton();

    // If the planet is favorited
    } else if (favoriteButton.classList.contains("fa-solid")) {
      removePlanetFromFavorites(planetId);
      setupFavoriteButton();
    }
  });
}
