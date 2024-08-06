renderSinglePlanet();

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
      console.log(planet.name);
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
