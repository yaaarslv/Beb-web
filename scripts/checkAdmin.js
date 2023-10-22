async function getRoleFromServer() {
    const token = localStorage.getItem("token");
    if (token) {
        const data = {
            token: token
        };

        return fetch('https://petshop-backend-yaaarslv.vercel.app/checkRoleIsBanned', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const role = data.role;
                    const isBanned = data.isBanned;
                    localStorage.setItem('role', role);
                    localStorage.setItem('isBanned', isBanned);
                }
            });
    }
}

getRoleFromServer().then(_ => {
    const token = localStorage.getItem('token');
    if (token) {
        const role = localStorage.getItem('role')
        const isBanned = localStorage.getItem('isBanned')
        if (window.location.href.includes('add-news.html')) {
            if (role === "User" || isBanned === "true") {
                window.location.href = '403.html';
            }
        } else if (window.location.href.includes('news.html')) {
            if (role === "Admin" || role === "Superadmin") {
                const newsForm = document.querySelector('h2');
                const newsButton = document.createElement('button');
                newsButton.className = 'add-news-button';
                newsButton.textContent = "Добавить новость";
                newsForm.appendChild(newsButton);
            }
        } else if (window.location.href.includes('catalog.html')) {
            if (role === "Admin" || role === "Superadmin") {
                const productsForm = document.querySelector('.addProduct');
                const productButton = document.createElement('button');
                productButton.className = 'add-product-button';
                productButton.textContent = "Добавить товар";

                const manageProductsForm = document.querySelector('.manageProductsForm');
                const manageProductsButton = document.createElement('button');
                manageProductsButton.className = 'manage-products-button';
                manageProductsButton.textContent = "Управлять товарами";

                productsForm.appendChild(productButton);
                manageProductsForm.appendChild(manageProductsButton);
            }
        } else if (window.location.href.includes('profile.html')) {
            if (role === "Superadmin") {
                const manageRoles = document.getElementById('manageRoles');
                const manageRolesButton = document.createElement('button');
                manageRolesButton.className = 'manage-roles-button';
                manageRolesButton.textContent = "Управление пользователями";
                manageRoles.appendChild(manageRolesButton);
            }
        } else if (window.location.href.includes('manage-users.html')) {
            if (role === "User" || role === "Admin" || isBanned === "true") {
                window.location.href = '403.html';
            }
        } else if (window.location.href.includes('subscription.html') || window.location.href.includes('add-review.html')) {
            if (isBanned === "true") {
                window.location.href = '403.html';
            }
        } else if (window.location.href.includes('reviews.html')) {
            if (isBanned === "true") {
                const button = document.querySelector('.add-review-button');
                button.style.backgroundColor = "#67000b"
            }
        } else if (window.location.href.includes('add-product.html')) {
            if (role === "User" || isBanned === "true") {
                window.location.href = '403.html';
            }
        }
    }
});
