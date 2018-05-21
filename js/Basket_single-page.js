/**
 * Класс корзина.
 * @constructor
 */
function Basket() {
    this.productItems = JSON.parse(localStorage.getItem('products'));
    this.basketItems = JSON.parse(localStorage.getItem('db')) || []; //Массив для хранения товаров

}

/**
 * Метод добавления товара в корзину.
 * @param {int} idProduct - Идентификатор товара.
 * @param {int} value - Количество товаров.
 * @param {string} color - Цвет товара.
 * @param {string} size - Размер товара.
 */
Basket.prototype.add = function (value, idProduct, color, size) {

    // this.basketItems = [{id: 2, count: 5}, ...]

    var basketIncludesProduct = false;
    for (var i = 0; i < this.basketItems.length; i++) {
        if (idProduct === this.basketItems[i].id&& color === this.basketItems[i].color && size === this.basketItems[i].size) {
            this.basketItems[i].count += value;
            basketIncludesProduct = true;
            break;
        }
    }
    var goodInfo = null;

    for (var j = 0; j < this.productItems.length; j++) {
        if (idProduct === this.productItems[j].id ) {
            goodInfo = this.productItems[j];
        }
    }

    if (!basketIncludesProduct && goodInfo) {
        this.basketItems.push({
            id: idProduct,
            count: value,
            price: goodInfo.price,
            image: goodInfo.image,
            description: goodInfo.description,
            color: color,
            size: size
        })
    }
    console.log(this.basketItems);

    this.refresh(); //Перерисовка корзины
    localStorage.setItem('db', JSON.stringify(this.basketItems));
};
/**
 * Метод отрисовки товара в корзине.
 * @param {Object} good Объект товара.
 */
Basket.prototype.renderGood = function (good) {
    var $goodBasketItem = $('<div />', {
        class: 'basket_product-item'
    });
    var $goodLink = $('<a />', {
        href: '#'
    });
    var $goodImg = $('<img />', {
        src: '../' + good.image,
        alt: 'product-item'
    });
    var $goodBasketDetails = $('<div />', {
        class: 'basket_product-details',
        html: '<h3>Rebox zane</h3>' +
        ' <p><i class="fa fa-star" aria-hidden="true"></i>' +
        '<i class="fa fa-star" aria-hidden="true"></i> ' +
        '<i class="fa fa-star" aria-hidden="true"></i> ' +
        '<i class="fa fa-star" aria-hidden="true"></i> ' +
        '<i class="fa fa-star-half-o" aria-hidden="true"></i> </p> ' +
        '<span>' + good.count + ' x $' + good.price + '</span>'
    });

    var $btnClose = $('<div />', {
        class: 'fontawesome',
        'data-id': good.id,
        html: '<p><i class="fa fa-times-circle" aria-hidden="true"></i></p>'
    });
    var count = null;
    // var self = this;
    // function getCount() {
    $.each(this.basketItems, function (index, value) {
        count += value.count;
    });
    //  return count;
    // }

    var $basketCount = $('<div />', {
        class: 'basket-count',
        text: count
    });
    var basketProductContainer = $('.basket-product');

    $goodImg.appendTo($goodLink);
    $goodLink.appendTo($goodBasketItem);
    $goodBasketItem.appendTo(basketProductContainer);
    $goodBasketDetails.appendTo($goodBasketItem);
    $btnClose.appendTo($goodBasketItem);
    setTimeout(function () {
        $basketCount.appendTo($('.basket-mini')).fadeTo("slow");
    }, 500);

};
/**
 * Метод, который перерисовывает корзину.
 */
Basket.prototype.refresh = function () {
    var $basketDataDiv = $('<div />', {
        class: 'total-price'
    });
    var $basketProduct = $('.basket-product');
    console.log(this.basketItems);
    $basketProduct.empty();
    this.basketItems.forEach(function (good) {
        this.renderGood(good);
    }.bind(this));

    var amount = this.basketItems.reduce(function (acc, item) {
        return acc + item.price * item.count;
    }, 0);

    $basketDataDiv.append('<p>Total</p><p>$' + amount + '</p>');
    $basketDataDiv.appendTo($basketProduct);
    var $checkout = $('<div />', {
        class: 'checkout',
        html: '<a href="checkout.html">Checkout</a>'
    });

    $checkout.appendTo($basketProduct);
    var $goToCart = $('<div />', {
        class: 'go-to-cart',
        html: '<a href="shopping-cart.html">Go To Cart</a>'
    });

    $goToCart.appendTo($basketProduct);
    var self = this;
    console.log('-----', $('.fontawesome'));
    $('.fontawesome').on('click', function () {
        var idProduct = parseInt($(this).attr('data-id'));
        self.remove(idProduct);
        console.log(idProduct);
        console.log($(this));
    });

};

/**
 * Метод, который удаляет товар из корзины.
 * @param {int} idProduct Идентификатор товара.
 */
Basket.prototype.remove = function (idProduct) {
    var index = this.basketItems.map(function (item) {
        return item.id;
    }).indexOf(idProduct);
    if (index !== -1) {
        this.basketItems.splice(index, 1);
    }
    if(this.basketItems.length === 0){
        $('.basket-count').hide();
    }

    console.log(this.basketItems);
    console.log(index);
    this.refresh();
    localStorage.setItem('db', JSON.stringify(this.basketItems));
};

