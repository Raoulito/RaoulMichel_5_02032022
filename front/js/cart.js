//GETS DATA FROM LOCALSTORAGE
let items = JSON.parse(localStorage.getItem("cart"));
console.table(items);
//INIT COUNTER = i++
for (let item of items) {
    //FETCHES DATAS FROM IDs IN BASKET
    fetch(`http://localhost:3000/api/products/${item.model}`)
        .then((resp) => resp.json())
        //STORES DATAS IN details VARIABLE
        .then((details) => {
            console.log(details);
            //SETS MAIN ELEMENT'S POSITION IN DOM
            const productView = document.getElementById("cart__items");
            // CREATES article ELEMENT, GETS CLASS AND ATTRIBUTES AND DEFINES AS productView CHILD
            let article = document.createElement("article");
            article.classList.add("cart__item");
            //FETCHES FROM LOCALSTORAGE
            article.setAttribute("data-id", `${item.model}`);
            article.setAttribute("data-color", `${item.color}`);
            productView.appendChild(article);
            //CREATES div, ADDS CLASS AND DEFINES AS article CHILD
            let divImage = document.createElement("div");
            divImage.classList.add("cart__item__img");
            article.appendChild(divImage);
            //CREATES image, SETS src AND alt ATTRIBUTES AND DEFINES AS divImage CHILD
            let image = document.createElement("img");
            // FETCHES FROM API
            image.setAttribute("src", `${details.imageUrl}`);
            image.setAttribute("alt", `${details.altTxt}`);
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
            productPrice.innerText = `${details.price}€`; //API
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
            qtySelect.setAttribute("value", `${item.qty}`); // FROM LOCALSTORAGE
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

