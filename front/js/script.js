//FETCHES DATAS FROM API
fetch("http://localhost:3000/api/products")
    .then((resp) => resp.json())
    .then((kanaps) => {
        //CHECKS FETCHED DATAS
        console.log(kanaps);
        //INIT COUNTER = i++
        for (let value of kanaps) {
            //SETS MAIN ELEMENT'S POSITION IN DOM
            const productCard = document.getElementById("items");
            // CREATES a ELEMENT, GETS href ATTRIBUTE, _id VALUE AND DEFINES AS productCard CHILD
            let link = document.createElement("a");
            link.setAttribute("href", `product.html?id=${value._id}`);
            productCard.appendChild(link);
            // CREATES article ELEMENT, DEFINES AS link CHILD
            let article = document.createElement("article");
            link.appendChild(article);
            // CREATES img ELEMENT, GETS src AND alt ATTRIBUTE, imageUrl AND altTxt VALUES AND DEFINES AS article CHILD
            let image = document.createElement("img");
            image.setAttribute("src", `${value.imageUrl}`);
            image.setAttribute("alt", `${value.altTxt}`);
            article.appendChild(image);
            //CREATES h3 ELEMENT, GETS productName CLASS, name VALUE AND DEFINES AS article CHILD
            let name = document.createElement("h3");
            name.classList.add("productName");
            name.textContent = `${value.name}`;
            article.appendChild(name);
            //SAME AS PREVIOUS
            let description = document.createElement("p");
            description.classList.add("productDescription");
            description.textContent = `${value.description}`;
            article.appendChild(description);
        }
    })
    //RETURNS ALERT IF API URL IS DOWN OR NOT REACHABLE
    .catch((error) => {
        console.error(error);
        alert("Erreur technique");
    });
