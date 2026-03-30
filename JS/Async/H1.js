const content = document.getElementById('content')

async function loadProducts() {
    const response = await fetch("https://dummyjson.com/products")
    const data = await response.json()

    let data_string = ''

    for (let product of data.products) {
        data_string += `
            <div class="card">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>₹ ${product.price}</p>
                <img src="${product.images[0]}" alt="product"/>
            </div>
        `
    }

    content.innerHTML = data_string
}

loadProducts()