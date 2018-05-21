$(document).ready(function () {
    var basketImg = $('.basket-image');
    var basketDiv = $('.basket-product');
    var status = false;

    basketImg.on('click', function () {
        if (status === false) {
            basketDiv.addClass('active');


            status = true;
        }else if(status === true){
            basketDiv.removeClass('active');
            status = false;
        }

    })
});
