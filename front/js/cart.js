let items = JSON.parse(localStorage.getItem("cart"));
console.table(items);

for (let item of items) {
    fetch(`http://localhost:3000/api/products/${item.model}`)
        .then((resp) => resp.json())
        .then((details) => {
            console.log(details);
            const productView = document.getElementById("cart__items");

            let article = document.createElement("article");
            article.classList.add("cart__item");
            article.setAttribute("data-id", `${item.model}`); // LOCAL STORAGE
            article.setAttribute("data-color", `${item.color}`); // LOCALSTORAGE
            productView.appendChild(article);

            let divImage = document.createElement("div");
            divImage.classList.add("cart__item__img");
            article.appendChild(divImage);

            let image = document.createElement("img");
            image.setAttribute("src", `${details.imageUrl}`); // API
            image.setAttribute("alt", `${details.altTxt}`); // API
            divImage.appendChild(image);

            let divContent = document.createElement("div");
            divContent.classList.add("cart__item__content");
            article.appendChild(divContent);

            let divDescription = document.createElement("div");
            divDescription.classList.add("cart__item__content__description");
            divContent.appendChild(divDescription);

            let productName = document.createElement("h2");
            productName.innerText = details.name; //API
            divDescription.appendChild(productName);

            let productColor = document.createElement("p");
            productColor.innerText = item.color; // LOCALSTORAGE
            divDescription.appendChild(productColor);

            let productPrice = document.createElement("p");
            productPrice.innerText = `${details.price} €`; //API
            divDescription.appendChild(productPrice);

            let divSettings = document.createElement("div");
            divSettings.classList.add("cart__item__content__settings");
            divContent.appendChild(divSettings);

            let divQty = document.createElement("div");
            divQty.classList.add("cart__item__content__settings__quantity");
            divSettings.appendChild(divQty);

            let quantity = document.createElement("p");
            quantity.innerText = "Qté : ";
            divQty.appendChild(quantity);

            let qtySelect = document.createElement("input");
            qtySelect.setAttribute("type", "number");
            qtySelect.classList.add("itemQuantity");
            qtySelect.setAttribute("name", "itemQuantity");
            qtySelect.setAttribute("min", "1");
            qtySelect.setAttribute("max", "100");
            qtySelect.setAttribute("value", `${item.qty}`); //LOCALSTORAGE
            quantity.appendChild(qtySelect);

            let divDelete = document.createElement("div");
            divDelete.classList.add("cart__item__content__settings__delete");
            divSettings.appendChild(divDelete);

            let deleteButton = document.createElement("p");
            deleteButton.classList.add("deleteItem");
            deleteButton.innerText = "Supprimer";
            divDelete.appendChild(deleteButton);
        });
}
