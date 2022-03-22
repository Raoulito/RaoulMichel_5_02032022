//EXTRACTS _id FROM THE URL (ALL SYMBOLS AFTER THE = SYMBOL IN URL)
const id = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);
//CHECKS _id
console.log(id);
//FETCHES THE DATA FOR THE RELATED id IN details
const details = fetch(`http://localhost:3000/api/products/${id}`)
    .then((resp) => resp.json())
    .then((details) => {
        //TESTS FOR CHECKING DATAS
        console.log(details.price, details.name);
        //SETS PAGE'S TITLE TO CURRENT ARTICLE'S NAME
        document.title = details.name;
        //GETS HTML COLLECTION FROM item__img CLASS AND DEFINES A VARIABLE FOR IMAGE
        const productImage = document.getElementsByClassName("item__img")[0];
        //CREATES img CHILD AND SETS src AND alt ATTRIBUTES
        const image = document.createElement("img");
        image.setAttribute("src", `${details.imageUrl}`);
        image.setAttribute("alt", `${details.altTxt}`);
        productImage.appendChild(image);
        //GETS title AND SETS IT TO details.name
        const productTitle = document.getElementById("title");
        productTitle.innerText = details.name;
        //SAME AS PREVIOUS
        const productPrice = document.getElementById("price");
        productPrice.innerText = details.price;
        //SAME AS PREVIOUS
        const productDescription = document.getElementById("description");
        productDescription.innerText = details.description;
        //INIT COUNTER = i++ FOR COLORS ONLY (.colors)
        for (let colors of details.colors) {
            //CHECKS VALUES
            console.table(colors);
            let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
            productColors.innerText = colors;
        }
    })
    //RETURNS ALERT IF API URL IS DOWN
    .catch((error) => {
        console.error(error);
        alert("Erreur technique");
    });

const button = document.getElementById("addToCart");
button.addEventListener("click", () => {
    //SETS VARIABLES FOR CHOSEN COLOR & QUANTITY, NAME AND UNIQUEID
    const colorChosen = document.querySelector("#colors").value;
    const quantityChosen = parseInt(document.querySelector("#quantity").value);
    const name = document.title;
    const uniqueId = colorChosen.concat("", id);

    //CHECKS IF QTY IS NOT 0 AND IF COLOR IS SET
    if (quantityChosen > 0 && colorChosen != "") {
        //SETS NEEDED DATAS FOR ADDING A NEW ITEM TO THE CART
        let newItem = { color: colorChosen, qty: quantityChosen, model: id, uId: uniqueId };
        //CHECKS CART CONTENT
        let cart = JSON.parse(localStorage.getItem("cart"));

        //IF CART DOESN'T EXISTS, CREATES AN ARRAY
        if (cart === null) {
            cart = [];
        }

        let itemExist = cart.find((item) => item.uId === newItem.uId);
        if (itemExist === null || itemExist === undefined) {
            cart.push(newItem);
        } else {
            itemExist.qty += newItem.qty;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        console.table(cart);

        if (quantityChosen == 1) {
            alert(`${quantityChosen} ${name} ${colorChosen} ajouté au panier.`);
        } else {
            alert(`${quantityChosen} ${name} ${colorChosen} ajoutés au panier.`);
        }
    }

    //IF NO COLOR SELECTED, ALERT
    else if (colorChosen === "") {
        alert("Veuillez choisir une couleur.");
    }
});
