const container = document.querySelector('.container');


/* USE NPM START TO RUN PROJECT
ERROR CODES
/api/products?status=500
/api/products?status=404
/api/products?status=200&json_invalid=true
*/

const getApi = async () => {
  for (let i = 1; i <= 2; i++) {
    const request = await fetch('/api/products');
    const response = await request.json();
    if (response.error === 'Server error') {
      continue;
    }
    if (!response.products.length) {
      throw new Error('Product is empty');
    };
    return response;
  }
  throw new SyntaxError();
};

const renderList = async function (productsObj) {
  container.style.gap = '10px';
  productsObj.products.forEach(product => {
    let listItem = document.createElement('div');
    listItem.className = 'card';
    listItem.style.width = '18%';
    listItem.innerHTML = `
      <img class="card-img-top" src="${product.image}" alt="Card image cap" style="width: 100%">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.price}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>`;
    container.appendChild(listItem);
  });
}

const createSpinner = function () {
  const spinner = document.createElement('div');
  spinner.id = 'spinner';
  spinner.classList.add(
    'spinner-border',
    'text-primary',
  );
  const spinnerSpan = document.createElement('span');
  spinnerSpan.classList.add('sr-only');
  spinner.append(spinnerSpan);
  return spinner;
};

const createAlert = function (massage) {
  const alert = document.createElement('div');
  alert.classList.add('alert', 'alert-warning');
  alert.role = 'alert';
  alert.innerHTML = `${massage}`;
  return alert;
};

const ShowItems = async function () {
  let spinner = createSpinner();
  try {
    container.append(spinner);
    await renderList(await getApi());
  } catch (e) {
    console.log(e);
    if (e instanceof SyntaxError) {
      container.append(createAlert ("Произошла ошибка, попробуйте обновить страницу позже"));
    } else if (e.message === 'Product is empty') {
      container.append(createAlert ("Список товаров пуст."));
    } else {
      container.innerHTML += createAlert ("Произошла ошибка, проверьте подключение к интернету");
    }
  } finally {
    container.removeChild(spinner);
  }
};

ShowItems();
