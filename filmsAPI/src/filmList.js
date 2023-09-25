export default function loadFilmList(data) {
  let filmList = document.createElement("ul")
  data.results.forEach(film => {
    let filmListItem = document.createElement("li");
    let filmListLink = document.createElement("a");
    filmListLink.textContent = film.title;
    filmListLink.href = `?filmId=${film.episode_id}`
    filmList.append(filmListItem);
    filmListItem.append(filmListLink)
 })
  return filmList
}
