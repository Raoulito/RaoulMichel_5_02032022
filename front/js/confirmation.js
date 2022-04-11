let contact = JSON.parse(document.cookie)
console.log(contact)

//POST contact to the server and wait for orderId response
fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
})
    .then((response) => response.json())
    .then((order) => {
        console.log(order);
        document.getElementById("orderId").textContent = `${order.orderId}`;
    }
    )
    .catch((error) => {
        alert("Erreur technique");
});