/**
 * Класс товара.
 * @param {int} id Идентификатор товара.
 * @param {string} title Название товара.
 * @param {string} image картинка товара.
 * @param {int} price Цена товара.
 * @constructor
 */
function Good(id, title, image, price) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.price = price;

}

/**
 * Метод добавляет товар на страницу.
 * @param {jQuery} $containerGood
 */
Good.prototype.render = function ($containerGood) {
    var $goodContainer = $('<div />', {
        class: 'product-item'
    });

    var $goodLink = $('<a />',{
        class: 'product-link',
        href: 'single-page.html?id=' + this.id,
        'data-id': this.id
    });

    var $goodImg = $('<img />',{
        src: '../'+ this.image,
        alt: 'product-item'
        });

    var $goodTitle = $('<p />', {
        text: this.title
    });

    var $goodPrice = $('<span> $' + this.price.toFixed(2) + '</span>');

    var $goodBtnAdd = $('<div />', {
        class: 'add-to-cart',
        'data-id': this.id
    });

    var $iconCart = $('<i />',{
        class:"fa fa-shopping-cart"
    });

    $iconCart.attr("aria-hidden","true");

    //Создаем структуру
    $goodImg.appendTo($goodLink);
    $goodTitle.appendTo($goodLink);
    $goodPrice.appendTo($goodLink);
    $goodLink.appendTo($goodContainer);
    $iconCart.appendTo($goodBtnAdd);
    $goodBtnAdd.append('Add To Cart');
    $goodBtnAdd.appendTo($goodContainer);
    $containerGood.append($goodContainer);
};