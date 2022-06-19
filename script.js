const form = document.getElementById('form');
const input = document.getElementById('input');
const resultBox = document.getElementById('resultBox');
const select = document.getElementById('select');

fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list').then(result => {
    result.json().then(response => {
        console.log('this is res: ', response);
        response.drinks.sort((e1, e2) => 
            e1.strIngredient1 - e2.strIngredient1
        )
        .forEach(drink => {
            const option = document.createElement("option");

            option.value = drink.strIngredient1;
            option.text = drink.strIngredient1;

            console.log('adding options');
            select.add(option);
            console.log('added');
        });

    });

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

