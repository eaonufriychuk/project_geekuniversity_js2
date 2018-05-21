/**
 * Класс корзина.
 * @constructor
 */
function MainBasket() {
    this.basketItems = JSON.parse(localStorage.getItem('db')) || []; //Массив для хранения товаров
}


/**
 * Метод добавления товара в корзину.
 * @param {int} idProduct - Идентификатор товара.
 * @param {int} value - Количество товаров.
 */
MainBasket.prototype.add = function (value, idProduct) {

    // this.basketItems = [{id: 2, count: 5}, ...]
    var basketIncludesProduct = false;
    for (var i = 0; i < this.basketItems.length; i++) {
        if (idProduct === this.basketItems[i].id) {
            this.basketItems[i].count = value;
            // $('.amount').html('$ ' + value * this.basketItems[i].price);
            basketIncludesProduct = true;
            break;
        }
    }

    basket.basketItems = this.basketItems;

    basket.refresh();


    this.refresh(); //Перерисовка корзины
    localStorage.setItem('db', JSON.stringify(this.basketItems));
};

/**
 * Метод отрисовки товара в корзине.
 * @param {Object} good Объект товара.
 */
MainBasket.prototype.renderGood = function (good) {

    var $cartListItem = $('<div />', {
        class: 'cart-list-item'
    });

    var $cartListDesk = $('<div />', {
        class: 'cart-list-desc'
    });

    var $itemImg = $('<div />', {
        class: 'item-image',
        html: '<a href="#" title="Mango  People  T-shirt">' +
        '<img src="../' + good.image + '" alt="Mango  People  T-shirt"></a>'
    });

    var $itemBlock = $('<div />', {
        class: 'item-block',
        html: '<div class="item-name">' +
        '<a href="#">Mango People T-shirt</a></div>' +
        ' <div class="item-size">Color: <span>'+good.color+'</span></div> ' +
        '<div class="item-color">Size: <span>'+good.size+'</span></div>'
    });
    var $cartListPrice = $('<div />', {
        class: 'cart-list-price',
        html: '$ ' + good.price
    });

    var $cartListPriceCount = $('<div />', {
        class: 'cart-list-price',
        html: '<label for="label"><input class="price-text" type="text" value="' + good.count + '" maxlength="3" data-id="' + good.id + '" id="label"></label>'
    });

    var $cartListShipping = $('<div />', {
        class: 'cart-list-shipping',
        text: 'Free'
    });
    var $cartListTotalPrice = $('<div />', {
        class: 'cart-list-subtotal amount',
        html: '$ ' + good.price * good.count
    });


    var $btnClose = $('<div />', {
        class: 'cart-list-action',
        html: '<i class="fa fa-times-circle cart-delete" data-id="' + good.id + '" aria-hidden="true"></i>'
    });
    var basketProductContainer = $('.cart-list-block');


    $itemImg.appendTo($cartListDesk);
    $itemBlock.appendTo($cartListDesk);
    $cartListDesk.appendTo($cartListItem);
    $cartListPrice.appendTo($cartListItem);
    $cartListPriceCount.appendTo($cartListItem);
    $cartListShipping.appendTo($cartListItem);
    $cartListTotalPrice.appendTo($cartListItem);
    $btnClose.appendTo($cartListItem);
    $cartListItem.appendTo(basketProductContainer);

};


/**
 * Метод, который перерисовывает корзину.
 */
MainBasket.prototype.refresh = function () {
    var $checkoutProceed = $('.checkout-proceed');

    var $checkoutProceedSubtotal = $('<div />', {
        class: 'checkout-proceed-subtotal'
    });
    var $checkoutProceedTotal = $('<div />', {
        class: 'checkout-proceed-total'
    });
    var $checkoutBtn = $('<div />', {
        class: 'checkout-proceed-total',
        html: '<a class="checkout-proceed-button" href="checkout.html">proceed to checkout</a>'
    });


    var $basketProduct = $('.cart-list-block');

    console.log(this.basketItems);
    $basketProduct.empty();
    $checkoutProceed.empty();
    this.basketItems.forEach(function (good) {
        this.renderGood(good);
    }.bind(this));

    var amount = this.basketItems.reduce(function (acc, item) {
        return acc + item.price * item.count;
    }, 0);

    $checkoutProceedSubtotal.append('Subtotal&nbsp;&nbsp;&nbsp;&nbsp;$' + amount);
    $checkoutProceedTotal.append('Grand total&nbsp;&nbsp;&nbsp;<span>$' + amount + '</span>');
    $checkoutProceedSubtotal.appendTo($checkoutProceed);
    $checkoutProceedTotal.appendTo($checkoutProceed);
    $checkoutBtn.appendTo($checkoutProceed);
    var self = this;
    $('.cart-delete').on('click', function () {
        var idProduct = parseInt($(this).attr('data-id'));
        self.remove(idProduct);
        basket.refresh();
    });

};

/**
 * Метод, который удаляет товар из корзины.
 * @param {int} idProduct Идентификатор товара.
 */
MainBasket.prototype.remove = function (idProduct) {
    basket.basketItems = this.basketItems;
    var index = this.basketItems.map(function (item) {
        return item.id;
    }).indexOf(idProduct);
    if (index !== -1) {
        this.basketItems.splice(index, 1);
    }
    basket.remove();
    this.refresh();
    localStorage.setItem('db', JSON.stringify(this.basketItems));
};

MainBasket.prototype.removeAllProducts = function () {
    basket.basketItems = this.basketItems;
    for(var i = 0; i< this.basketItems.length; i++){
        this.basketItems.splice(i);
    }
    basket.remove();
    this.refresh();
    localStorage.setItem('db', JSON.stringify(this.basketItems));
};