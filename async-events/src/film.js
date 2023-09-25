function createList(elements, headerText) {
  const list = document.createElement('ul');
  const listHeader = document.createElement('h2');
  list.classList.add('list-group')
  listHeader.textContent = headerText;
  list.append(listHeader);
  elements.forEach(element => {
    const listItem = document.createElement("li");
    listItem.textContent = element.name;
    listItem.classList.add('list-group-item')
    list.append(listItem);
  })
  return list
}
export default function showFilm(film, planets, species) {
  const wrapper = document.createElement("div");
  const title = document.createElement("h1");
  title.textContent = film.title;
  wrapper.append(title);
  wrapper.append(createList(planets, 'Planets'));
  wrapper.append(createList(species, 'Species'));
  return wrapper;

}
