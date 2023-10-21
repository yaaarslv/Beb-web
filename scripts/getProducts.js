async function fetchAndDisplayProducts() {
    const loader = document.querySelector('.loader');
    const errorMessageBox = document.querySelector('.error-message');
    const productList = document.querySelector('.product-list');

    try {
        loader.style.display = 'block';
        errorMessageBox.style.display = 'none';

        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await fetch('https://petshop-backend-yaaarslv.vercel.app/products');
        if (!response.ok) {
            throw new Error(`Ошибка при загрузке данных: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.products) {
            data.products.forEach((product) => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                const nameDiv = document.createElement('div');
                nameDiv.innerHTML = `<h3 class="product-name">${product.name}</h3>`;
                nameDiv.addEventListener('mouseover', () => {
                    nameDiv.style.transition = 'color 0.3s';
                    nameDiv.style.cursor = "pointer";
                    nameDiv.style.color = 'blue';
                });
                nameDiv.addEventListener('mouseout', () => {
                    nameDiv.style.color = 'initial';
                });


                const imageDiv = document.createElement('div');
                imageDiv.innerHTML = `<img class="product-image" src="${product.imageURL}" alt="Product Image">`;
                imageDiv.addEventListener('mouseover', () => {
                    imageDiv.style.cursor = "pointer";
                });

                const priceDiv = document.createElement('div');
                priceDiv.className = 'product-price';
                priceDiv.textContent = `Цена: ${product.price} руб`;

                productDiv.appendChild(imageDiv);
                productDiv.appendChild(nameDiv);
                productDiv.appendChild(priceDiv);
                productList.appendChild(productDiv);

                const elements = [nameDiv, imageDiv];

                elements.forEach((element) => {
                    element.addEventListener('click', () => {
                        const productId = product.id;
                        window.open(`product.html?id=${productId}`);
                    });
                });
            });
        }
    } catch (error) {
        console.error(error);
        errorMessageBox.style.display = 'block';
    } finally {
        loader.style.display = 'none';
    }
}

window.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);

