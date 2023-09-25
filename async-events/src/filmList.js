export default function loadFilmList(data) {
  let filmList = document.createElement("ul")
  filmList.classList.add('list-group')
  data.results.forEach(film => {
    let filmListItem = document.createElement("li");
    let filmListLink = document.createElement("a");
    filmListItem.classList.add('list-group-item')
    filmListLink.textContent = film.title;
    filmListLink.href = `?filmId=${film.episode_id}`
    filmList.append(filmListItem);
    filmListItem.append(filmListLink)
 })
  return filmList
}
