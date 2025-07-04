document.addEventListener('DOMContentLoaded', function() {

    const slider = document.querySelector('.banner-slider');

    if (slider) {

        const wrapper = slider.querySelector('.slider-wrapper');
        const slides = slider.querySelectorAll('.slide');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        let currentSlide = 0;
        const slideCount = slides.length;

        function goToSlide(slideIndex) {

            wrapper.style.transform = `translateX(-${slideIndex * 100}%)`;

            slides.forEach((slide, index) => {

                if (index === slideIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
                
            });

            currentSlide = slideIndex;

        }

        nextBtn.addEventListener('click', () => {
            const nextSlideIndex = (currentSlide + 1) % slideCount;
            goToSlide(nextSlideIndex);
        });

        prevBtn.addEventListener('click', () => {
            const prevSlideIndex = (currentSlide - 1 + slideCount) % slideCount;
            goToSlide(prevSlideIndex);
        });

        goToSlide(0);

    }
    
    const buyNowLinks = document.querySelectorAll('.buy-now-link');

    buyNowLinks.forEach(link => {

        link.addEventListener('click', function(event) {

            event.preventDefault();

            const card = this.closest('.product-card');

            if (card) {
                const name = card.querySelector('h3').textContent.trim();
                const price = card.querySelector('.price').textContent.trim();
                const imgSrc = card.querySelector('img').src;

                const params = new URLSearchParams({
                    name: name,
                    price: price,
                    img: imgSrc
                });

                window.location.href = `product.html?${params.toString()}`;
            }

        });

    });

    if (document.body.id === 'product-detail-page') {

        const params = new URLSearchParams(window.location.search);

        const name = params.get('name');
        const price = params.get('price');
        const imgSrc = params.get('img');

        if (name && price && imgSrc) {
            document.title = `Cyber - ${name}`;

            document.getElementById('product-name').textContent = name;
            document.getElementById('product-price').textContent = price;
            
            const mainImage = document.getElementById('main-product-image');
            mainImage.src = imgSrc;
            mainImage.alt = name;

            const firstThumbnail = document.querySelector('.thumbnail-images .thumbnail');

            if(firstThumbnail) {
                firstThumbnail.src = imgSrc.replace('200x200', '100x100').replace('500x500', '100x100'); 
                firstThumbnail.alt = name;
            }

            const breadcrumbProductName = document.getElementById('breadcrumb-product-name');

            if(breadcrumbProductName) {
                breadcrumbProductName.textContent = name;
            }
        }

    }

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
                        <a href="#" class="btn btn-dark buy-now-link">Buy Now</a>
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

            const newBuyNowLinks = wishlistGrid.querySelectorAll('.buy-now-link');

            newBuyNowLinks.forEach(link => {

                link.addEventListener('click', function(event) {

                    event.preventDefault();

                    const card = this.closest('.product-card');

                    if (card) {
                        const name = card.querySelector('h3').textContent.trim();
                        const price = card.querySelector('.price').textContent.trim();
                        const imgSrc = card.querySelector('img').src;
                        const params = new URLSearchParams({ name, price, img: imgSrc });

                        window.location.href = `product.html?${params.toString()}`;
                    }

                });

            });
        }
    }

    updateWishlistIcons();

});

let products = [

    JSON.parse(localStorage.getItem("product")) || [],

];

let cards = document.getElementById("product-card");

for (let i = 0; i < products.length; i++) {
    
    let card = document.createElement("div");
    card.className = "card";

    let cardTop = document.createElement("div");
    cardTop.className = "card__top";

    card.appendChild(cardTop);

    
    let a = document.createElement("a");
    a.className = "card__image";

    cardTop.appendChild(a);


    let img = document.createElement("img");
    img.src = products[i].image;
    
    a.appendChild(img);

    
    let label = document.createElement("div");
    label.className = "card__label";
    label.innerText = products[i].sale;

    cardTop.appendChild(label);


    let bottom = document.createElement("div");
    bottom.className = "card__bottom";

    card.appendChild(bottom);


    let prices = document.createElement("div");
    prices.className = "card__prices";

    let oldPrice = document.createElement("div");
    oldPrice.className = "card__price";
    oldPrice.className = "card__price--discount";
    oldPrice.innerText = products[i].oldPrice;

    let newPrice = document.createElement("div");
    newPrice.className = "card__price";
    newPrice.className = "card__price--common";
    newPrice.innerText = products[i].price;

    prices.appendChild(oldPrice);
    prices.appendChild(newPrice);

    bottom.appendChild(prices);


    let aTitle = document.createElement("a");
    aTitle.className = "card__title";
    aTitle.innerText = products[i].title;

    bottom.appendChild(aTitle);

    let likeBtn = document.createElement("img");
    likeBtn.className = "card__like";
    likeBtn.style.position = "absolute";
    likeBtn.style.fontSize = "20px";
    likeBtn.src = products.like ? "https://www.citypng.com/photo/18673/download-flat-red-like-heart-icon-silhouette-png" : "https://www.pngwing.com/ru/free-png-ablye";

    likeBtn.addEventListener('click', () => {
        products.like = !products.like;
    })

    cardTop.appendChild(likeBtn);


    let button = document.createElement("button");
    button.className = "card__add";
    button.innerText = "В корзину";

    bottom.appendChild(button);


    let deleteB = document.createElement("button");
    deleteB.className = "card__del";
    deleteB.innerText = "Удалить";


    deleteB.addEventListener('click', () => {
        card.remove();
    })


    bottom.appendChild(deleteB);

    
    cards.appendChild(card);

}