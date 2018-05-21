/**
 * Класс формы обратной связи.
 * @param {array} data Массив названий элементов формы.
 * @constructor
 */
function Form(data) {
    this.types = data;
    this.input = null;
    this.message = null;
    this.id = null;
}

/**
 * Метод, который проверяет поля формы на соответствие.
 */
Form.prototype.validate = function () {
    for (var i = 0; i < this.types.length; i++) {
        this.id = this.types[i];
        this.input = document.getElementById(this.id);
        this.message = document.getElementById('message-' + this.id);
        var regExp = null;
        var inputValue = '';
        switch (this.id) {
            case 'country':
                regExp = /^[A-Z][a-z]+\s?[A-Z]?[a-z]+?$/;
                inputValue = '*Required field';
                break;
            case 'town':
                regExp = /^[A-Z][a-z]+\s?[A-Z]?[a-z]+?$/;
                inputValue = '*Required field';
                break;
            case 'text':
                regExp = /[0-9]*/;
                inputValue = '*Required field';
                break;
            case 'email':
                regExp = /^([A-zА-я0-9_-]+\.)*[A-zА-я0-9_-]+@[A-zА-я0-9_-]+(\.[A-zА-я0-9_-]+)*\.[A-zА-я]{2,6}$/;
                inputValue = '*Required field';
                break;
            case 'password':
                regExp = /^[a-zA-Z0-9]+/;
                inputValue = '*Required field';
                break;
        }
        if (!this.input.value) {
            this.input.style.borderColor = '#f16d7f';
            this.message.textContent = inputValue;
            this.message.classList.add('form__message');
        } else if (!regExp.test(this.input.value)) {
            this.input.style.borderColor = '#f16d7f';
            this.message.textContent = inputValue;
            this.message.classList.add('form__message');
        } else {
            this.input.style.borderColor = '#eaeaea';
            this.message.textContent = '';
        }
    }
};


