export default function showFilm(film, planets, species) {
  let wrapper = document.createElement("div")
  let title = document.createElement("h1");

  title.textContent = film.title
  const planetList = document.createElement("ul");
  const planetHeader = document.createElement('h2')
  planetHeader.textContent = 'Planets';
  planetList.append(planetHeader)
  planets.forEach(planet => {
    const planetsListItem = document.createElement("li");
    planetsListItem.textContent = planet.name;
    planetList.append(planetsListItem);

  })
  const speciesList = document.createElement("ul");
  const speciesHeader = document.createElement('h2')
  speciesHeader.textContent = 'Species';
  speciesList.append(speciesHeader)
  species.forEach(race => {
    const speciesListItem = document.createElement("li");
    speciesListItem.textContent = race.name;
    speciesList.append(speciesListItem);

  })
  wrapper.append(title);
  wrapper.append(planetList);
  wrapper.append(speciesList);
  return wrapper;

}
