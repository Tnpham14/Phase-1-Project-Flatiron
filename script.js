const form = document.getElementById('form');
const input = document.getElementById('input');
const resultBox = document.getElementById('resultBox');
const select = document.getElementById('select');

fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list').then(result => {
    result.json().then(response => {
        response.drinks.forEach(drink => {
            const option = document.createElement("option");

            option.value = drink.strIngredient1;
            option.text = drink.strIngredient1;

            select.add(option);
        });

    });
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    while (resultBox.firstChild) {
        resultBox.removeChild(resultBox.firstChild);
    }

    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + select.value);

    const responseBody = await response.json();

    responseBody.drinks.forEach(drink => {
        const drinkTile = document.createElement('div');
        const title = document.createElement('p');
        const textNode = document.createTextNode(drink.strDrink);
        const image = document.createElement('img');

        const modalImage = document.createElement('img');
        const modal = document.createElement('div');

        image.src = drink.strDrinkThumb;
        image.className = 'image';
        modal.className = 'modal';

        title.append(textNode);
        drinkTile.append(title);
        drinkTile.append(image);
        drinkTile.append(modal);
        resultBox.append(drinkTile);
        modal.append(modalImage);

        image.addEventListener('click', event => {
            modal.style.display = 'block';
            modalImage.src = drink.strDrinkThumb;
        });
        modal.addEventListener('click', event => {
            modal.style.display = 'none';
            modalImage.src = null;
        });
    });
});