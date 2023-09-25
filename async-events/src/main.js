const container = [...document.getElementsByClassName("container")][0]
fetch("https://swapi.dev/api/species/1").then(res => console.log(res))
let cssPromises = {};
const searchParams = new URLSearchParams(location.search);
const filmId = searchParams.get("filmId");

const loadResources = (src) => {

  if (src.endsWith(".js")) {
    return import(src);
  }

  if (src.endsWith(".css")) {
    if (cssPromises[src]) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener("load", () => resolve);
      })
      document.head.append(link);
    }
    return cssPromises;
  }

  return fetch(src).then(res => res.json());

}


async function getFilmProperties(properties) {
  return Promise.all(properties.map(property => fetch(property).then((res) => {
    return res.json()
  })));
}

const renderPage = function (js, response, css) {
  if (js === "./film.js") {
    Promise.all([
      js,
      response,
      css,
    ].map(src => loadResources(src)))
      .then(async ([loadFilmList, data, style]) => {
        container.innerHTML = ''
        container.append(
          loadFilmList.default(
            data,
            await getFilmProperties(data.planets),
            await getFilmProperties(data.species)
          ))
      })
  } else {
    Promise.all([
      js,
      response,
      css,
    ].map(src => loadResources(src)))
      .then(([loadFilmList, data, style]) => {
        container.innerHTML = ''
        container.append(loadFilmList.default(data))
      })
  }

}


if (filmId) {
  renderPage("./film.js", `https://swapi.dev/api/films/${filmId}`, "./style.css")
} else {
  renderPage(
    "./filmList.js",
    "https://swapi.dev/api/films",
    "./style.css",
  );
}



