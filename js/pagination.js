$(document).ready(function () {

    var arrButtons = $('.page');
    var angleLeft = $('.angle-left');
    var angleRight = $('.angle-right');
    var array = [];
    arrButtons.each(function (index) {
        $(this).attr('data-id', index);
        array.push(index);
    });

    arrButtons.on('click', function () {
        arrButtons.removeClass('active_one');
        $(this).addClass('active_one');
    });

    angleLeft.on('click', function () {
        var index = $('.active_one').data('id');
        if (index > 0) {
            arrButtons.removeClass('active_one');
            $('.page[data-id = ' + (index - 1) + ']').addClass('active_one');
        }

    });

    angleRight.on('click', function () {
        var index = $('.active_one').data('id');
        if (index < array.length - 1) {
            arrButtons.removeClass('active_one');
            $('.page[data-id = ' + (index + 1) + ']').addClass('active_one');
        }

    });


});