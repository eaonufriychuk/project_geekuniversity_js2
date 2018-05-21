var basket = new Basket();
$(document).ready(function () {
    var mainBasket = new MainBasket();
    console.log(mainBasket);
    mainBasket.refresh();

    basket.refresh();

    var $basketProduct = $('.cart-list-block');
    $basketProduct.on('keyup', function (event) {
        var elem = $(event.target);
        if(elem.hasClass('price-text')){
            var keyCode = [8,48,49,50,51,52,53,54,55,56,57];
            for(var i = 0; i < keyCode.length; i ++){
                if(event.keyCode === keyCode[i]) {
                    var value = +$(elem).val();
                    var idProduct = +$(elem).attr('data-id');
                    mainBasket.add(value, idProduct);
                }
            }
        }
    });
    var $buttonClear = $('.button_clear');
    $buttonClear.on('click', function () {
        mainBasket.removeAllProducts();
        basket.refresh();
    });
});