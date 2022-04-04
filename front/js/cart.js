//VARIABLE FOR COUNTING TOTAL ITEMS IN CART
let totalQuantity = 0;
//VARIABLE FOR COUNTING TOTAL PRICE
let totalPrice = 0;
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
            //SUM OF ALL ARTICLES
            totalQuantity += parseInt(item.qty);
            document.getElementById("totalQuantity").textContent = `${totalQuantity}`;
            //TOTAL PRICE
            totalPrice += item.qty * details.price;
            document.getElementById("totalPrice").textContent = `${totalPrice}`;
        })
        .then(() => {
            let quantityInputs = document.querySelectorAll(".itemQuantity");
            quantityInputs.forEach((input) => {
                input.addEventListener("change", () => {
                    let product = input.parentElement.parentElement.parentElement.parentElement.parentElement;
                    let productId = product.getAttribute("data-id");
                    let cart = items;
                    cart.forEach((savedProduct) => {
                        if (savedProduct.model === productId) {
                            savedProduct.qty = input.value;
                            localStorage.setItem("cart", JSON.stringify(cart));
                        }
                    })
                    updateTotalPrice()
                })
            })
        })
        .then(() => {
            let deleteBtns = document.querySelectorAll(".deleteItem");
            deleteBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    let product = btn.parentElement.parentElement.parentElement.parentElement;
                    product.remove();
                    let productId = product.getAttribute("data-id");
                    let cart = items;
                    cart.forEach((savedProduct) => {
                        if (savedProduct.model === productId) {
                            var filtered = cart.filter(function (value, index, arr) {
                                return value != savedProduct;
                            });
                            cart = filtered;
                            localStorage.setItem("cart", JSON.stringify(cart));
                        }
                    })
                    updateTotalPrice()
                })
            })
        });
}


function updateTotalPrice() {
    let totalPrice = 0;
    let totalQuantity = 0;
    // let cart = items;
    // cart.forEach((savedProduct) => {
    //     totalQuantity += parseInt(savedProduct.qty);
    //     totalPrice += savedProduct.qty * savedProduct.price;
    // })
    let allCartItems = document.querySelectorAll(".cart__item");
    allCartItems.forEach((cartItem)=>{
        let productQty = Number(cartItem.children[1].children[1].children[0].firstElementChild.firstElementChild.value);
        let productPrice = Number(cartItem.children[1].firstElementChild.lastElementChild.innerHTML.slice(0,-1))
        console.log(productQty);
        console.log(productPrice);
        totalQuantity += productQty;
        let productTotalPrice = productPrice * productQty; 
        totalPrice += productTotalPrice;
    })
    document.getElementById("totalQuantity").textContent = `${totalQuantity}`;
    document.getElementById("totalPrice").textContent = `${totalPrice}`;
}


