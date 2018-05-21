var goods = [];
$(document).ready(function () {

    var $goodContainer = $('.fetured-items');

    $goodContainer.on('click', function (event) {
        var elem = $(event.target);
        if (elem.hasClass('add-to-cart')) {
            var idProduct = +elem.attr('data-id');
            basket.add(idProduct);
        }
    });
    $.ajax({
        url: '../json/productData.json',
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (result) {
            goods = result;
            result
                .map(function (value) {
                    return new Good(value.id, value.title, value.image, value.price)
                })
                .forEach(function (good) {
                    good.render($goodContainer)
                });
            $('.product-link').on('click', function () {
                localStorage.setItem("productId", $(this).data('id'));
                localStorage.setItem('products', JSON.stringify(goods));

            });
        },
        error: function () {
            $goodContainer.html('Данные не загрузились');
        }
    });
    var basket = new Basket();
    basket.refresh();

    // console.log(document.querySelectorAll('.add-to-cart'));

});