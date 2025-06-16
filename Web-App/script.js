document.addEventListener('DOMContentLoaded', function() {
    
    const getWishlist = () => JSON.parse(localStorage.getItem('wishlist')) || [];
    const saveWishlist = (wishlist) => localStorage.setItem('wishlist', JSON.stringify(wishlist));

    const updateWishlistIcons = () => {

        const wishlist = getWishlist();
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const imgSrc = card.querySelector('img').src; 
            const button = card.querySelector('.wishlist-btn');

            if (wishlist.some(item => item.id === imgSrc)) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

    };

    const handleWishlistClick = (event) => {

        event.preventDefault();

        const button = event.currentTarget;
        const card = button.closest('.product-card');
    
        const product = {
            id: card.querySelector('img').src, 
            name: card.querySelector('h3').textContent,
            price: card.querySelector('.price').textContent,
            img: card.querySelector('img').src
        };

        let wishlist = getWishlist();
        const productIndex = wishlist.findIndex(item => item.id === product.id);

        if (productIndex > -1) {
            wishlist.splice(productIndex, 1); 
            button.classList.remove('active');
        } else {
            wishlist.push(product); 
            button.classList.add('active');
        }
        
        saveWishlist(wishlist);

    };

    const wishlistButtons = document.querySelectorAll('.wishlist-btn');

    wishlistButtons.forEach(button => {
        button.addEventListener('click', handleWishlistClick);
    });

    const tabs = document.querySelectorAll('.tabs .tab');

    if (tabs.length > 0) {
        const productContainers = document.querySelectorAll('.product-grid-container');

        tabs.forEach(tab => {

            tab.addEventListener('click', () => {
                const targetId = tab.dataset.tab;
            
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                productContainers.forEach(container => container.classList.remove('active'));

                const targetContainer = document.getElementById(targetId);

                if (targetContainer) {
                    targetContainer.classList.add('active');
                }
            });

        });
    }

    const wishlistGrid = document.getElementById('wishlist-grid');

    if (wishlistGrid) {

        const emptyMessage = document.getElementById('empty-wishlist-message');
        const wishlist = getWishlist();

        if (wishlist.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            wishlist.forEach(product => {
                const productCardHTML = `
                    <div class="product-card">
                        <a href="#" class="wishlist-icon wishlist-btn active"><i class="far fa-heart"></i></a>
                        <img src="${product.img}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price}</p>
                        <button class="btn btn-dark">Buy Now</button>
                    </div>
                `;

                wishlistGrid.innerHTML += productCardHTML;
            });
            
            const wishlistPageButtons = wishlistGrid.querySelectorAll('.wishlist-btn');

            wishlistPageButtons.forEach(button => {
                button.addEventListener('click', (event) => {

                    event.preventDefault();

                    const card = button.closest('.product-card');
                    const productId = card.querySelector('img').src; 
                    
                    let currentWishlist = getWishlist();
                    currentWishlist = currentWishlist.filter(item => item.id !== productId);
                    saveWishlist(currentWishlist);
                    
                    card.remove(); 
                    
                    if (getWishlist().length === 0) {
                        emptyMessage.style.display = 'block';
                    }

                });
            });
        }

    }

    updateWishlistIcons();

});