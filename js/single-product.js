/**
 * Класс товара.
 * @param {int} id Идентификатор товара.
 * @constructor
 */
function SingleProduct(id) {
    this.id = id;
    this.productItems = JSON.parse(localStorage.getItem('products'));
    this.index = this.productItems.map(function (item) {
        return item.id;
    }).indexOf(this.id);
}

/**
 * Метод добавляет товар на страницу.
 */
SingleProduct.prototype.render = function () {

    var $containerGood = $('.image-slide');
    var $leftArrow = $('<div />', {
        class: 'arrow-left',
        html: '<i class="fa fa-angle-left" aria-hidden="true"></i>'
    });
    var $rightArrow = $('<div />', {
        class: 'arrow-right',
        html: '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    });

    var $goodContainer = $('<div />', {
        class: 'container image-slide-item'
    });

    var $goodLink = $('<a />', {
        href: '#'
    });

    var $goodImg = $('<img />', {
        class: 'product-image',
        src: '../' + this.productItems[this.index].image,
        alt: 'product-item'
    });
    var $backgroundContainer = $('.background');

    var $backgroundHeader = $('<div />', {
        class: 'background-heading',
        html: '<h3>Women collection</h3>' +
        '<h2>Moschino cheap and chic</h2>' +
        '<p>' + this.productItems[this.index].description + '</p>' +
        '<div class="material-designer">' +
        '<div class="material"><p>material:<span>cotton</span></p></div>' +
        '<div class="designer">' +
        '<p>designer: <span>binburhan</span></p></div>' +
        '<div class="price"><span>$' + this.productItems[this.index].price + '</span></div></div>'
    });

    var $colorSize = $('<div />', {
        class: 'color-size'

    });
    var $colorSelect = $('<div />', {
        class: 'choose-color',
        html: '<h2>Choose color</h2>' +
        '<div class="select"><i class="fa fa-angle-down" aria-hidden="true"></i></div>' +
        '<div class="choose">' +
        '<p><span><i class="fa fa-square" aria-hidden="true"></i></span>&nbsp; Red</p>' +
        '</div>' +
        '<div class="color">' +
        '<div class="color-block active-one"  data-id="1"><p><span><i class="fa fa-square" aria-hidden="true"></i></span>&nbsp; Red</p></div>' +
        '<div class="color-block" data-id="2"><p ><span style="color: blue"><i class="fa fa-square" aria-hidden="true"></i></span>&nbsp; Blue</p></div>' +
        '<div class="color-block"  data-id="3"><p><span style="color: yellow"><i class="fa fa-square" aria-hidden="true"></i></span>&nbsp; Yellow</p></div>' +
        '<div class="color-block"  data-id="4"><p><span style="color: green"><i class="fa fa-square" aria-hidden="true"></i></span>&nbsp; Green</p></div>' +
        '<div class="color-block"  data-id="5"><p><span style="color: black"><i class="fa fa-square" aria-hidden="true"></i></span>&nbsp; Black</p></div>' +
        '<div class="color-block"  data-id="6"><p><span style="color: pink"><i class="fa fa-square" aria-hidden="true"></i></span>&nbsp; Pink</p></div></div>'
    });
    var $sizeSelect = $('<div />', {
        class: 'choose-size',
        html: '<h2>Choose size</h2><div class="select"><i class="fa fa-angle-down" aria-hidden="true"></i></div>' +
        '<div class="size-select"><p>XS</p></div>' +
        '<div class="size-choose">' +
        '<div class="size-block active-one"  data-id="1"><p>XS</p></div>' +
        '<div class="size-block" data-id="2"><p>S</p></div>' +
        '<div class="size-block"  data-id="3"><p>M</p></div>' +
        '<div class="size-block"  data-id="4"><p>L</p></div>' +
        '<div class="size-block"  data-id="5"><p>XL</p></div>' +
        '<div class="size-block"  data-id="6"><p>XXL</p></div></div>'
    });

    var $quantityBlock = $('<div />', {
        class: 'quantity',
        html: '<h2>Quantity</h2><label for="label"><input type="text" value="1" maxlength="3" id="label"></label>'
    });
    var $buttonCart = $('<div />', {
        class: 'button-cart',
        "data-id": this.productItems[this.index].id,
        html: '<i class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp; Add to Cart'
    });

    $goodImg.appendTo($goodLink);
    $goodLink.appendTo($goodContainer);
    $containerGood.append($leftArrow);
    $containerGood.append($goodContainer);
    $containerGood.append($rightArrow);
    $backgroundHeader.appendTo($backgroundContainer);
    $colorSelect.appendTo($colorSize);
    $sizeSelect.appendTo($colorSize);
    $quantityBlock.appendTo($colorSize);
    $buttonCart.appendTo($colorSize);
    $colorSize.appendTo($backgroundContainer);
    $('.color-block').hide();
    // $('.active-one').show();
    var status = false;
    $('.color').css({
        "border": "none"
    });
    $('.choose').on('click', function () {

        if (status === false) {
            $('.color-block').show();
            $('.color').css({
                "border": "1px solid #eaeaea"
            });

            status = true;
        } else if (status === true) {
            $('.color-block').hide();
            // $('.active-one').show();
            $('.color').css({
                "border": "none"
            });
            status = false;
        }

    });
    $('.color-block').on('click', function () {
        $('.color-block').removeClass('active-one');
        // $('.color-block').show();
        $('.color-block').hide();
        var value = $(this).addClass('active-one').html();
        // $('.choose').empty();
        $('.choose').html(value);
        $('.color').css({
            "border": "none"
        });
        status = false;
    });


    $('.size-block').hide();
    // $('.active-one').show();
    var statusSize = false;
    $('.size-choose').css({
        "border": "none"
    });
    $('.size-select').on('click', function () {

        if (statusSize === false) {
            $('.size-block').show();
            $('.size-choose').css({
                "border": "1px solid #eaeaea"
            });

            statusSize = true;
        } else if (statusSize === true) {
            $('.size-block').hide();
            // $('.active-one').show();
            $('.size-choose').css({
                "border": "none"
            });
            statusSize = false;
        }

    });
    $('.size-block').on('click', function () {
        $('.size-block').removeClass('active-one');
        // $('.color-block').show();
        $('.size-block').hide();
        var value = $(this).addClass('active-one').html();
        // $('.choose').empty();
        $('.size-select').html(value);
        $('.size-choose').css({
            "border": "none"
        });
        statusSize = false;
    });


    this.addListeners();
    var self = this;
    $('.quantity input').on('keyup', function (event) {
        var value = +$('.quantity input').val();
        if (!isNaN(value)) {
            // $('.price').empty();
            $('.price').html('<span>$' + self.productItems[self.index].price * value + '</span>');
        }
    });

};


/**
 * Метод, который меняет ссылку открытой картинки.
 * @param {number} idx Индекс элемента в массиве.
 */
SingleProduct.prototype.renderImage = function (idx) {
    var maxImg = $('.product-image');
    maxImg.src = this.productItems[idx].image;
};


/**
 * Метод, который навешивает обработчики события клика на элементы.
 */
SingleProduct.prototype.addListeners = function () {
    $('.arrow-left').on('click', function () {
        var newIdx;
        this.index === 0 ? newIdx = this.productItems.length - 1 : newIdx = this.index - 1;
        // window.location.replace('../html/single-page.html?id=' + this.productItems[newIdx].id);
        this.renderImage(newIdx);
        this.index = newIdx;
        history.pushState(null, null, '../html/single-page.html?id=' + this.productItems[newIdx].id);
        this.refresh();
    }.bind(this));
    $('.arrow-right').on('click', function () {
            var newIdx;
            this.index === this.productItems.length - 1 ? newIdx = 0 : newIdx = this.index + 1;
            this.renderImage(newIdx);
            this.index = newIdx;
            history.pushState(null, null, '../html/single-page.html?id=' + this.productItems[newIdx].id);
            this.refresh();
        }.bind(this)
    );
};

/**
 * Метод, который перерисовывает корзину.
 */
SingleProduct.prototype.refresh = function () {
    var $goodContainer = $('.image-slide');
    var $backgroundContainer = $('.background');
    $goodContainer.empty();
    $backgroundContainer.empty();
    this.render();


};
