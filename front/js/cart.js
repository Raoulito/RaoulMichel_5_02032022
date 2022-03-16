let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

for (let value of cart) {
    const item = document.getElementById("cart__items");

    let article = document.createElement("article");
    article.classList.add("cart__item");

    article.setAttribute("data-id", `${cart.model}`);
    article.setAttribute("data-color", `${cart.color}`);
    item.appendChild(article);

    let divimage = document.createElement("div");
    divimage.classList.add("cart__item__img");
    article.appendChild(divimage);

    let image = document.createElement("img");
    image.setAttribute("src", `${cart.imageUrl}`); // API
    image.setAttribute("alt", `${cart.altTxt}`); // API
    divimage.appendChild(image);

    let divcontent = document.createElement("div");
    divcontent.classList.add("cart__item__content");
    article.appendChild(divcontent);

    let divdescription = document.createElement("div");
    divdescription.classList.add("cart__item__content__description");
    divcontent.appendChild(divdescription);

    let productName = document.createElement("h2");
    productName.innerText = cart.name; //API
    divdescription.appendChild(productName);

    let productColor = document.createElement("p");
    productColor.innerText = cart.color;
    divdescription.appendChild(productColor);

    let productPrice = document.createElement("p");
    productPrice.innerText = cart.price; //API
    divdescription.appendChild(productPrice);

    let divsettings = document.createElement("div");
    divsettings.classList.add("cart__item__content__settings");
    divcontent.appendChild(divsettings);

    let divQty = document.createElement("div");
    divQty.classList.add("cart__item__content__settings__quantity");
    divsettings.appendChild(divQty);

    let quantity = document.createElement("p");
    quantity.innerText = "Qté : ";
    divQty.appendChild(quantity);

    let qtyselect = document.createElement("input");
    qtyselect.setAttribute("type", "number");
    qtyselect.classList.add("itemQuantity");
    qtyselect.setAttribute("name", "itemQuantity");
    qtyselect.setAttribute("min", "1");
    qtyselect.setAttribute("max", "100");
    qtyselect.setAttribute("value", "42"); //cart qty
    quantity.appendChild(qtyselect);

    let divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");
    divsettings.appendChild(divDelete);

    let deleteButton = document.createElement("p");
    deleteButton.classList.add("deleteItem");
    deleteButton.innerText = "Supprimer";
    divDelete.appendChild(deleteButton);
}
