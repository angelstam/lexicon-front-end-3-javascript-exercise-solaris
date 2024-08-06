window.addEventListener("load", () => {
  renderPlanets();
});

// Mattias: Create elements for the planets, set attributes and append them to the DOM
async function renderPlanets() {
  const planets = await getPlanets();

  const planetList = document.querySelector(".planet-list");

  // Create a planet element for each planet
  planets.forEach((planet) => {
    const planetItem = document.createElement("li");
    planetItem.id = planet.id;
    planetItem.dataset.name = planet.name;
    planetItem.style.backgroundColor = planet.color;

    // Reduce the circumference of the planet to make it more appropriate (based on the sun)
    let planetCircumference = planet.circumference / 20000;

    // Increase size for smaller planets in relation to scale of sun, based on their circumference
    if (planet.circumference > 150000 && planet.name !== "Solen") {
      planetCircumference *= 4;
    } else if (planet.circumference < 41000) {
      planetCircumference *= 16;
    }

    planetItem.style.width = `${planetCircumference}px`;
    planetItem.style.height = `${planetCircumference}px`;

    const anchor = document.createElement("a");

    // Add planet id to href to allow displaying planet based on url id on singePlanet page
    anchor.href = `./singlePlanet.html?id=${planet.id}`;

    planetItem.appendChild(anchor);
    planetList.appendChild(planetItem);
  });
}
