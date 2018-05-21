/**
 * Класс модуля сбора отзывов.
 * @param {string} idComment Идентификатор.
 * @constructor
 */
function Comments(idComment) {
    this.id = idComment;
    this.countComments = 0;
    this.commentsItems = [];
    this.userMassage = null;
    this.getComments();
}

/**
 * Метод добавляет контейнер для отзывов.
 * @param {jQuery} $comments Контейнер для отзывов.
 */
Comments.prototype.render = function ($comments) {
    var $commentContainer = $('<div />', {
        id: this.id
    });
    var $commentsItemsDiv = $('<div />', {
        id: this.id + '_items'
    });

    $commentsItemsDiv.appendTo($commentContainer);
    $commentContainer.appendTo($comments);
};

/**
 * Метод, который получает отзывы из json файла.
 */
Comments.prototype.getComments = function () {
    var appendId = '#' + this.id + '_items';

    $.ajax({
        type: 'GET',
        url: '../json/comments.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            var $commentsData = $('<div />', {
                id: 'comments_data',
                class: 'comments-data'
            });
            this.countComments = data.comments.length;
            // this.userMassage = data.userMessage;
            this.userMassage = data.userMessage;
            $commentsData.append('Total: ' + this.countComments + '</p>');

            $commentsData.appendTo(appendId);
            for (var itemKey in data.comments) {
                this.commentsItems.push(data.comments[itemKey]);
            }
        }
    });
};

/**
 * Метод, который выводит все отзывы.
 */
Comments.prototype.showComments = function () {
    $('#comments_opened').remove();
    var $commentsContainer = $('<div />', {
        id: 'comments_opened'
    });
    for (var item in this.commentsItems) {
        var array = this.commentsItems[item],
            $commentsElements = $('<div />', {
                id: array.id,
                class: 'review',
                html: '<h3>' + array.username + '</h3>'
                + '<p class="review-massage">' + array.text + '</p>' + '<p class="date">' + array.date + '</p>'+'<div class="buttons"><div class="btn_submit">Submit</div>'
                + '<div class="btn_delete">Delete</div> </div>'
            });
        $commentsElements.appendTo($commentsContainer);
    }
    $commentsContainer.appendTo('#comments-wrapper');
};

/**
 * Метод, который добавляет отзыв.
 * @param {string} text Текст отзыва.
 */
Comments.prototype.add = function (userName, text) {
    var idComment;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var fullDate = day + '-' + month + '-' + year;

    this.commentsItems.length > 0 ? idComment = this.commentsItems[this.commentsItems.length - 1].id + 1 :
        idComment = 1;

    var commentsItem = {
        "id": idComment,
        "username": userName,
        "text": text,
        'date': fullDate
    };
    this.countComments++;
    // Добавляем отзыв в массив
    this.commentsItems.push(commentsItem);
    console.log(this.commentsItems);

    var $commentsElement = $('<div />', {
        id: idComment,
        class: 'review',
        html: '<h3> ' + userName + '</h3>'
        + '<p class="review-massage">' + text + '</p>' + '<p class="date">' +  fullDate + '</p>'+'<div class="buttons"><div class="btn_submit">Submit</div>'
        + '<div class="btn_delete">Delete</div> </div>'
    });
    $commentsElement.appendTo($('#comments_opened'));

    this.refresh();
};

/**
 * Метод, который удаляет отзыв.
 * @param {int} idComment Идентификатор отзыва.
 */
Comments.prototype.delete = function (idComment) {
    var index = this.commentsItems.map(function (item) {
        return item.id;
    }).indexOf(idComment);
    console.log(index);
    if (index !== -1) {
        this.commentsItems.splice(index, 1);
        this.countComments--;
    }
    $('#' + idComment).remove();
    console.log(this.commentsItems);
    this.refresh();
};

/**
 * Метод, который одобряет отзыв.
 * @param {jQuery} element Элемент, содержащий отзыв.
 */
Comments.prototype.submit = function (element) {
    element.closest('.review').prepend('<p class="massage">' + this.userMassage + '</p>').addClass('submit');
};

/**
 * Метод, который перерисовывает элемент с информацией о количестве отзывов.
 */
Comments.prototype.refresh = function () {
    var commentsDataDiv = $('#comments_data');
    commentsDataDiv.empty();
    commentsDataDiv.append('Total: ' + this.countComments + '</p>');
};