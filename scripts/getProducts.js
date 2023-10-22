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

                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'product-category';
                categoryDiv.textContent = product.category;
                categoryDiv.style.display = 'none';

                const availabilityDiv = document.createElement('div');
                availabilityDiv.className = 'product-availability';
                availabilityDiv.textContent = `${product.availability ? 'Да' : 'Нет в наличии'}`;
                availabilityDiv.style.display = `${product.availability ? 'none' : 'initial'}`;

                productDiv.appendChild(imageDiv);
                productDiv.appendChild(nameDiv);
                productDiv.appendChild(priceDiv);
                productDiv.appendChild(categoryDiv);
                productDiv.appendChild(availabilityDiv);
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

document.addEventListener("DOMContentLoaded", function () {
    const filterButton = document.querySelector('.applyFilters')
    filterButton.addEventListener('click', function () {
        const selectedCategories = [];
        if (document.getElementById('filter-cat').checked) {
            selectedCategories.push('Для кошек');
        }
        if (document.getElementById('filter-dog').checked) {
            selectedCategories.push('Для собак');
        }
        if (document.getElementById('filter-parrot').checked) {
            selectedCategories.push('Для попугаев');
        }
        if (document.getElementById('filter-turtle').checked) {
            selectedCategories.push('Для черепах');
        }

        const minPrice = parseInt(document.getElementById('minPrice').value, 10);
        const maxPrice = parseInt(document.getElementById('maxPrice').value, 10);

        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            product.style.display = 'none';
        });

        products.forEach(product => {
            const categoryName = product.querySelector('.product-category').textContent;
            const price = parseInt(product.querySelector('.product-price').textContent.split(' ')[1], 10);

            if (
                (selectedCategories.length === 0 || selectedCategories.includes(categoryName)) &&
                (!minPrice || price >= minPrice) &&
                (!maxPrice || price <= maxPrice)
            ) {
                product.style.display = 'block';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const resetFiltersButton = document.querySelector('.resetFiltersButton');

    resetFiltersButton.addEventListener('click', function() {
        document.getElementById('filter-cat').checked = false;
        document.getElementById('filter-dog').checked = false;
        document.getElementById('filter-parrot').checked = false;
        document.getElementById('filter-turtle').checked = false;

        document.getElementById('minPrice').value = '';
        document.getElementById('maxPrice').value = '';

        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            product.style.display = 'initial';
        });
    });
});


