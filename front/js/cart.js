//Gets datas from local storage
var items = JSON.parse(localStorage.getItem("cart"));
console.table(items);
//Initiates the counter
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
            //FETCHES THESE DATAS FROM API (URL AND TEXT)
            image.setAttribute("src", `${details.imageUrl}`);
            image.setAttribute("alt", `${details.altTxt}`);
            divImage.appendChild(image);
            //CREATES div, ADDS class NAME AND DEFINES AS divContent CHILD
            let divContent = document.createElement("div");
            divContent.classList.add("cart__item__content");
            article.appendChild(divContent);
            //SAME AS PREVIOUS
            let divDescription = document.createElement("div");
            divDescription.classList.add("cart__item__content__description");
            divContent.appendChild(divDescription);
            //CREATES h2 ELEMENT AND DEFINES AS divDescription CHILD
            let productName = document.createElement("h2");
            productName.innerText = details.name; //API
            divDescription.appendChild(productName);
            //SAME AS PREVIOUS BUT p
            let productColor = document.createElement("p");
            productColor.innerText = item.color; // LOCALSTORAGE
            divDescription.appendChild(productColor);
            //CREATES div, ADDS class NAME AND DEFINES AS divContent CHILD
            let divSettings = document.createElement("div");
            divSettings.classList.add("cart__item__content__settings");
            divContent.appendChild(divSettings);
            //CREATES div, ADDS class NAME AND DEFINES AS divSettings CHILD
            let divQty = document.createElement("div");
            divQty.classList.add("cart__item__content__settings__quantity");
            divSettings.appendChild(divQty);
            //CREATES p, SETS inner text NAME AND DEFINES AS divQty CHILD
            let quantity = document.createElement("p");
            quantity.innerText = "Qté : ";
            divQty.appendChild(quantity);
            //CREATES input, SETS A BUNCH OF ATTRIBUTES AND DEFINES AS quantity CHILD
            let qtySelect = document.createElement("input");
            qtySelect.setAttribute("type", "number");
            qtySelect.classList.add("itemQuantity");
            qtySelect.setAttribute("name", "itemQuantity");
            qtySelect.setAttribute("min", "1");
            qtySelect.setAttribute("max", "100");
            qtySelect.setAttribute("value", `${item.qty}`); // FROM LOCALSTORAGE
            quantity.appendChild(qtySelect);
            //CREATES p, ADDS FETCHED DATA AS innerText AND DEFINES AS divDescription CHILD
            let productPrice = document.createElement("p");
            productPrice.innerText = `${details.price}€`; //API
            divDescription.appendChild(productPrice);
            //CREATES div, ADDS class NAME AND DEFINES AS divSettings CHILD
            let divDelete = document.createElement("div");
            divDelete.classList.add("cart__item__content__settings__delete");
            divSettings.appendChild(divDelete);
            //CREATES div, ADDS class NAME AND DEFINES AS divSettings CHILD
            let deleteButton = document.createElement("p");
            deleteButton.classList.add("deleteItem");
            deleteButton.innerText = "Supprimer";
            divDelete.appendChild(deleteButton);

            updateTotalPrice();

            adjustQuantity(qtySelect);

            deleteArticle(deleteButton);
        });
}

//Calculates total price
function updateTotalPrice() {
    let totalPrice = 0;
    let totalQuantity = 0;
    let allCartItems = document.querySelectorAll(".cart__item");
    allCartItems.forEach((cartItem) => {
        let productQty = Number(cartItem.children[1].children[1].children[0].firstElementChild.firstElementChild.value);
        let productPrice = Number(cartItem.children[1].firstElementChild.lastElementChild.innerHTML.slice(0, -1));
        totalQuantity += productQty;
        let productTotalPrice = productPrice * productQty;
        totalPrice += productTotalPrice;
    });
    document.getElementById("totalQuantity").textContent = `${totalQuantity}`;
    document.getElementById("totalPrice").textContent = `${totalPrice}`;
}

//Checks user inputs
function checkInputs(input, regex, info, info2) {
    if (input.value.match(regex) && input.value !== "") {
        return true;
    }
    //if fields have an error or empty, it will display an error message below the specific field
    if (input.value === "") {
        input.nextElementSibling.textContent = `Veuillez entrer votre ${info}.`;
    } else if (!input.value.match(regex)) {
        input.nextElementSibling.textContent = `Veuillez entrer ${info2} valide.`;
    }
    return false;
}

//Checks if lastName and firstName and city inputs are letters only and if they are not empty
function checkAllInputs() {
    return checkInputs(document.getElementById("firstName"), /^[a-zA-Z]+$/, "prénom", "un prénom") && checkInputs(document.getElementById("lastName"), /^[a-zA-Z]+$/, "nom", "un nom") && checkInputs(document.getElementById("city"), /^[a-zA-Z]+$/, "ville", "une ville") && checkInputs(document.getElementById("address"), /^[a-zA-Z0-9 ]+$/, "adresse", "une adresse") && checkInputs(document.getElementById("email"), /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/, "email", "un mail");
}

//onclick , stores in localStorage user's data + an array of strings of product-id and loads confirmation page
function confirmOrder() {
    document.getElementById("order").addEventListener("click", (event) => {
        event.preventDefault();
        if (checkAllInputs()) {
            let firstName = document.getElementById("firstName").value;
            let lastName = document.getElementById("lastName").value;
            let address = document.getElementById("address").value;
            let city = document.getElementById("city").value;
            let email = document.getElementById("email").value;
            let cart = items;
            let products = [];
            cart.forEach((item) => {
                products.push(item.model);
            });
            let finalOrder = {
                contact: {
                    firstName,
                    lastName,
                    address,
                    city,
                    email,
                },
                products,
            };
            localStorage.setItem("contact", JSON.stringify(finalOrder));
            console.table(finalOrder);
            window.location.href = "./confirmation.html";
        }
    });
}

//Deletes item from cart
function deleteArticle(element) {
    element.addEventListener("click", (event) => {
        let product = event.target.parentElement.parentElement.parentElement.parentElement;
        product.remove();
        let productId = product.getAttribute("data-id");
        let productColor = product.getAttribute("data-color");
        for (let i = 0; i < items.length; i++) {
            //Compares product-id and product-color with items in cart and deletes it
            if (items[i].uId === productColor.concat("", productId)) {
                items.splice(i, 1);
                localStorage.setItem("cart", JSON.stringify(items));
            }
        }
        updateTotalPrice();
        console.table(items);
    });
}

//Adjusts quantity
function adjustQuantity(element) {
    element.addEventListener("change", (event) => {
        let product = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        let productId = product.getAttribute("data-id");
        let productColor = product.getAttribute("data-color");
        for (let i = 0; i < items.length; i++) {
            //Compares the product-id and product-color with the items in the cart  and updates the quantity
            if (items[i].uId === productColor.concat("", productId)) {
                items[i].qty = event.target.value;
                localStorage.setItem("cart", JSON.stringify(items));
            }
        }
        updateTotalPrice();
        console.table(items);
    });
}
