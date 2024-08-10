window.addEventListener("load", async () => {
  await renderFavoritePlanets();
});

// Mikaela&Johan: Create elements for the objects in the array from  getFavoritePlanets();
async function renderFavoritePlanets() {
  const planets = await getPlanets();

  // Filter out favorites from the list of planets;
  favoritePlanets = planets.filter(planet => isFavoritePlanet(planet.id));

  const favoritesList = document.querySelector(".favorites-list");

  // Show if there are no favorites added
  if (favoritePlanets.length === 0) {
    const noPlanetsText = document.createElement("h3");
    noPlanetsText.textContent = "No favorite planets found!";
    favoritesList.appendChild(noPlanetsText);
  }

  favoritePlanets.forEach((favoritePlanet) => {
    const favoritePlanetItem = document.createElement("li");

    const anchor = document.createElement("a");
    anchor.href = `./singlePlanet.html?id=${favoritePlanet.id}`;

    const planetFigure = document.createElement("figure");
    planetFigure.style.backgroundColor = favoritePlanet.color;
    anchor.appendChild(planetFigure);

    const planetName = document.createElement("h3");
    planetName.textContent = favoritePlanet.name;
    anchor.appendChild(planetName);

    favoritePlanetItem.appendChild(anchor);
    favoritesList.appendChild(favoritePlanetItem);
  });
}
