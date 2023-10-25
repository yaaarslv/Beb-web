const allBrands = new Set();

document.addEventListener("DOMContentLoaded", function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const search_term = urlParams.get('search-term');

    const loaders = document.querySelectorAll('.loader');
    const errorMessageBox = document.querySelector('.error-message');
    const productList = document.querySelector('.product-list');

    try {
        loaders.forEach(loader => {
            loader.style.display = 'block';
        })
        errorMessageBox.style.display = 'none';

        fetch('https://petshop-backend-yaaarslv.vercel.app/search/' + search_term)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
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
                            priceDiv.textContent = `Цена: ${product.price} руб.`;

                            const categoryDiv = document.createElement('div');
                            categoryDiv.className = 'product-category';
                            categoryDiv.textContent = product.category;
                            categoryDiv.style.display = 'none';

                            const brandDiv = document.createElement('div');
                            brandDiv.className = 'product-brand';
                            brandDiv.textContent = product.brand;
                            brandDiv.style.display = 'none';

                            const availabilityDiv = document.createElement('div');
                            availabilityDiv.className = 'product-availability';
                            availabilityDiv.textContent = `${product.availability ? 'В наличии' : 'Нет в наличии'}`;
                            availabilityDiv.style.display = `${product.availability ? 'none' : 'initial'}`;

                            const countDiv = document.createElement('div');
                            countDiv.className = 'product-countDiv';
                            countDiv.textContent = `${product.count === 1 ? "Последний товар!" : `Осталось: ${product.count}`}`;
                            countDiv.style.display = `${product.count === 0 ? 'none' : 'initial'}`;

                            productDiv.appendChild(imageDiv);
                            productDiv.appendChild(nameDiv);
                            productDiv.appendChild(priceDiv);
                            productDiv.appendChild(categoryDiv);
                            productDiv.appendChild(brandDiv);
                            productDiv.appendChild(availabilityDiv);
                            productDiv.appendChild(countDiv);
                            productList.appendChild(productDiv);

                            const elements = [nameDiv, imageDiv];

                            elements.forEach((element) => {
                                element.addEventListener('click', () => {
                                    const productId = product.id;
                                    window.open(`product.html?id=${productId}`);
                                });
                            });

                            const brandName = brandDiv.textContent;
                            allBrands.add(brandName);
                        });

                        const brandFilter = document.getElementById('brand-filter');

                        allBrands.forEach(brandName => {
                            const input = document.createElement('input');
                            input.type = 'checkbox';
                            input.id = `brand-${brandName}`;
                            input.value = brandName;

                            const label = document.createElement('label');
                            label.htmlFor = `brand-${brandName}`;
                            label.textContent = brandName;

                            brandFilter.appendChild(input);
                            brandFilter.appendChild(label);

                            const lineBreak = document.createElement('br');
                            brandFilter.appendChild(lineBreak);
                        });
                    } else if (data.message) {
                        const notFound = document.createElement('div');
                        notFound.className = 'products-not-found';
                        notFound.textContent = `${data.message}`;
                        productList.appendChild(notFound)
                    }

                }
            })
    } catch (error) {
        console.error(error);
        errorMessageBox.style.display = 'block';
    } finally {
        loaders.forEach(loader => {
            loader.style.display = 'none';
        })
    }
});

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

        const brandFilter = document.getElementById('brand-filter');
        const selectedBrands = Array.from(brandFilter.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
        const minPrice = parseInt(document.getElementById('minPrice').value, 10);
        const maxPrice = parseInt(document.getElementById('maxPrice').value, 10);

        const selectedAvailabilities = [];
        if (document.getElementById('in-stock').checked) {
            selectedAvailabilities.push('В наличии');
        }
        if (document.getElementById('out-of-stock').checked) {
            selectedAvailabilities.push('Нет в наличии');
        }

        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            product.style.display = 'none';
        });

        products.forEach(product => {

            const categoryName = product.querySelector('.product-category').textContent;
            const brandName = product.querySelector('.product-brand').textContent;
            const price = parseInt(product.querySelector('.product-price').textContent.split(' ')[1], 10);
            const availability = product.querySelector('.product-availability').textContent;

            if (
                (selectedCategories.length === 0 || selectedCategories.includes(categoryName)) &&
                (selectedAvailabilities.length === 0 || selectedAvailabilities.includes(availability)) &&
                (!minPrice || price >= minPrice) &&
                (!maxPrice || price <= maxPrice) &&
                (selectedBrands.length === 0 || selectedBrands.includes(brandName))
            ) {
                product.style.display = 'block';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const resetFiltersButton = document.querySelector('.resetFiltersButton');

    resetFiltersButton.addEventListener('click', function () {
        document.getElementById('filter-cat').checked = false;
        document.getElementById('filter-dog').checked = false;
        document.getElementById('filter-parrot').checked = false;
        document.getElementById('filter-turtle').checked = false;

        document.getElementById('in-stock').checked = false;
        document.getElementById('out-of-stock').checked = false;


        document.getElementById('minPrice').value = '';
        document.getElementById('maxPrice').value = '';
        document.getElementById('brand-filter').querySelectorAll('input[type="checkbox"]:checked').forEach(function(checkbox) {
            checkbox.checked = false;
        });

        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            product.style.display = 'initial';
        });
    });
});




