document.forms.productsForm.addEventListener("submit", function (event) {
    event.preventDefault();
});
  
document.forms.productsForm.onsubmit = function(){

    let product = {
        image: this.image.value,
        title: this.title.value,
        price: this.price.value
    }
    
    localStorage.setItem("product", JSON.stringify(product))

}; 