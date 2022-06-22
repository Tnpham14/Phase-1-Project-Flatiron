const form = document.getElementById('form');
const input = document.getElementById('input');
const resultBox = document.getElementById('resultBox');
const select = document.getElementById('select');



});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    while(resultBox.firstChild) {
        resultBox.removeChild(resultBox.firstChild);
    }

    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + select.value);
    
    const responseBody = await response.json();
    console.log(responseBody);

    responseBody.drinks.forEach(drink => {
        const drinkTile = document.createElement('div');
        const title = document.createElement('p');
        const image = document.createElement('img');
        const textNode = document.createTextNode(drink.strDrink);
        image.src = drink.strDrinkThumb;
        title.append(textNode);
        drinkTile.append(title);
        drinkTile.append(image);

        resultBox.append(drinkTile);
    });
});

