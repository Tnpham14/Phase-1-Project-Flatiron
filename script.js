const form = document.getElementById('form');
const input = document.getElementById('input');
const resultBox = document.getElementById('resultBox');
const select = document.getElementById('select');

const addOptions = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const responseBody = await response.json();
    responseBody.drinks.forEach(drink => {
        const option = document.createElement("option");

        option.value = drink.strIngredient1;
        option.text = drink.strIngredient1;

        select.add(option);
    });

};

addOptions();

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
        // strDrink is name of Drink
        const textNode = document.createTextNode(drink.strDrink); 
        const image = document.createElement('img');

        const modalImage = document.createElement('img');
        const modal = document.createElement('div');

        // strDrinkThumb is URL where image is located
        image.src = drink.strDrinkThumb;
        image.className = 'image';
        modal.className = 'modal';

        title.append(textNode);
        drinkTile.append(title);
        drinkTile.append(image);
        drinkTile.append(modal);
        resultBox.append(drinkTile);
        modal.append(modalImage);

        

        image.addEventListener('click', (event) => {
            modal.style.display = 'block';
            modalImage.src = drink.strDrinkThumb;
        });
        document.addEventListener('keyup', (event) => {
            if (event.key === "Escape") modal.style.display = "none"; 
        });
        
    });

});

 