window.addEventListener("load", async () => {
  timeoutLoadingPlanets();
  const planets = await getPlanets();
  renderPlanets(planets);
  setupHoverPlanet();
});

// Mattias: Create elements for the planets, set attributes and append them to the DOM
function renderPlanets(planets) {

  const planetList = document.querySelector(".planet-list");
  const loadingH2 = document.querySelector("h2.loading");
  if (planets.length > 0) {
    loadingH2.classList.add("hidden");
  }

  // Create a planet element for each planet
  planets.forEach((planet) => {
    const planetItem = document.createElement("li");
    planetItem.id = planet.id;
    planetItem.dataset.name = planet.name;
    planetItem.style.backgroundColor = planet.color;

    // Reduce the circumference of the planet to make it more appropriate (based on the sun)
    let planetCircumference = (27.9 * planet.circumference ** 0.694) / 3000;

    // Increase size for smaller planets in relation to scale of sun, based on their circumference
    let maxCircumference = (27.9 * planets[0].circumference ** 0.694) / 3000;
    planetItem.dataset.scale = 1.05 + ((maxCircumference/planetCircumference) - 1) * 0.02;

    planetItem.style.width = `${planetCircumference}px`;
    planetItem.style.height = `${planetCircumference}px`;

    const anchor = document.createElement("a");

    // Add planet id to href to allow displaying planet based on url id on singePlanet page
    anchor.href = `./singlePlanet.html?id=${planet.id}`;

    planetItem.appendChild(anchor);
    planetList.appendChild(planetItem);
  });
}

//Yulia&Johan: hovering a planet
function setupHoverPlanet() {
  const planetList = document.querySelectorAll(".planet-list >li");
  planetList.forEach(element => {
    element.addEventListener("mouseover", event => {
      const h1 = document.querySelector("header h1");
      h1.textContent = element.dataset.name;
      // if attr(data-scale) is ever supported in CSS this would not be needed
      element.style.transform = "scale(" + element.dataset.scale + ")";
    });
    element.addEventListener("mouseout", event => {
      const h1 = document.querySelector("header h1");
      h1.textContent = "Solaris Space Center";
      element.style.transform = "scale(1)";
    });
  });
}

// Alla: If the planets can not load for 5 seconds something is wrong
function timeoutLoadingPlanets() {
  setTimeout(() => {
    const loadingH2 = document.querySelector("h2.loading");
    if (!loadingH2.classList.contains("hidden")) {
      loadingH2.textContent = "Oops I can not find any planets";
    }
  }, 5000);
}
