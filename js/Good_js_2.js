var goods = [];
var filters = {
    sizes: [],
    priceRange: {
        min: 0,
        max: Infinity
    }
};

window.filters = filters;

// renderGoods({shouldRerenderAllGood: false, })

function renderGoods(status) {

    // var status = options && options.status || false;

    var $goodContainer = $('.fetured-items');
    if (status) {
        $goodContainer.empty();
    }
    goods
        .filter(function (value) {
            var minPrice = filters.priceRange.min;
            var maxPrice = filters.priceRange.max;

            var belongsSizesSet = !filters.sizes.length || value.sizes.some(function (size) {
                return filters.sizes.indexOf(size) !== -1;
            });
            var belongsPriceRange = value.price >= minPrice && value.price <= maxPrice;

            return belongsPriceRange && belongsSizesSet;
        })
        .map(function (value) {
            return new Good(value.id, value.title, value.image, value.price)
        })
        .forEach(function (good) {
            good.render($goodContainer)
        });
}

$(document).ready(function () {
    var $goodContainer = $('.fetured-items');
    var arrButtons = $('.page');
    var angleLeft = $('.angle-left');
    var angleRight = $('.angle-right');
    var array = [];
    var basket = new Basket();
    basket.refresh();
    $goodContainer.on('click', function (event) {
        var elem = $(event.target);
        if (elem.hasClass('add-to-cart')) {
            var idProduct = +elem.attr('data-id');
            basket.add(idProduct);
        }
    });

    function showButton() {
        if(parseInt($(this).text())!== 1){
            $('.catalog-tools-all').hide();
        }else{
            $('.catalog-tools-all').show();
        }
    }
    arrButtons.each(function (index) {
        $(this).attr('data-id', index);
        array.push(index);
    });

    arrButtons.on('click', function () {
        if (!$(this).hasClass('active_one')) {
            arrButtons.removeClass('active_one');
            ajax(parseInt($(this).text()) + 1, true);
        }
        if(parseInt($(this).text())!== 1){
            $('.catalog-tools-all').hide();
        }else{
            $('.catalog-tools-all').show();
        }
        $(this).addClass('active_one');
    });

    angleLeft.on('click', function () {
        var index = $('.active_one').data('id');
        if (index > 0) {
            arrButtons.removeClass('active_one');
            $('.page[data-id = ' + (index - 1) + ']').addClass('active_one');
            ajax(parseInt($('.active_one').text()) + 1, true);
        }
        if(parseInt($('.active_one').text())!== 1){
            $('.catalog-tools-all').hide();
        }else{
            $('.catalog-tools-all').show();
        }
    });

    angleRight.on('click', function () {
        var index = $('.active_one').data('id');
        if (index < array.length - 1) {
            arrButtons.removeClass('active_one');
            $('.page[data-id = ' + (index + 1) + ']').addClass('active_one');
            ajax(parseInt($('.active_one').text()) + 1, true);
        }
        if(parseInt($('.active_one').text())!== 1){
            $('.catalog-tools-all').hide();
        }else{
            $('.catalog-tools-all').show();
        }
    });

    function ajax(url, status) {
        $.ajax({
            url: '../json/productData_' + url + '.json',
            type: 'GET',
            // async: async,
            dataType: 'json',
            success: function (result) {
                goods = result;
                renderGoods(status);

                $('.product-link').on('click', function () {
                    localStorage.setItem("productId", $(this).data('id'));
                    localStorage.setItem('products', JSON.stringify(goods));

                });
            },
            error: function () {
                $goodContainer.html('Данные не загрузились');
            }
        });
    }

    ajax(2, true);

    $('.catalog-tools-all').on('click', function () {
        ajax(3, false);
        $('.catalog-tools-nav').hide();
        $('.catalog-tools-all').hide();
    });

});