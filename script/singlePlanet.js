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

// Mikaela&Johan: display information based on which planet id
async function renderSinglePlanet() {
  const planet = await getPlanet(getIdFromQueryString());
  const d = document; d.qS = d.querySelector; // to make shorter rows

  d.qS("#planet-title").textContent = planet.name;
  d.qS("#planet-subtitle").textContent = planet.latinName;
  d.qS("#planet-description").textContent = planet.desc;
  d.qS("#planet-circumference").textContent = `${planet.circumference.toLocaleString()} km`;
  d.qS("#planet-distance").textContent = `${planet.distance.toLocaleString()} km`;
  d.qS("#planet-temp-day").textContent = `${planet.temp.day}°C`;
  d.qS("#planet-temp-night").textContent = `${planet.temp.night}°C`;
  if (planet.moons.length === 0) {
    d.qS("#planet-moons").textContent = `-`;
  } else {
    d.qS("#planet-moons").textContent = `${planet.moons.join(", ")}`;
  }
  delete d.qS; // cleanup
  // Mattias: change --planet-bg-color to planet.color
  document.documentElement.style.setProperty("--planet-bg-color", planet.color);
}

// Mattias&Johan: Setup favorite button to show outline/filled depending on if planet is favorited
function setupFavoriteButton() {
  const favoriteButton = document.querySelector("#favorite");
  const planetId = getIdFromQueryString();

  // Check if the planet is in favorites
  // Switch between outline/filled depending on if planet is in favorites
  if (isFavoritePlanet(planetId)) {
    favoriteButton.classList.remove("fa-regular");
    favoriteButton.classList.add("fa-solid");
  } else {
    favoriteButton.classList.remove("fa-solid");
    favoriteButton.classList.add("fa-regular");
  }
}

// Mattias&Johan: Setup the click functionality for adding/removing a planet from favorites
function setupFavoriteListener() {
  const favoriteButton = document.querySelector("#favorite");
  const planetId = getIdFromQueryString();

  favoriteButton.addEventListener("click", () => {
    // If the planet is favorited
    if (isFavoritePlanet(planetId)) {
      removePlanetFromFavorites(planetId);
      setupFavoriteButton();
    } else {
      addPlanetToFavorites(planetId);
      setupFavoriteButton();
    }
  });
}
