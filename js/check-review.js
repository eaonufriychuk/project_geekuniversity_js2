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
        var inputValue = null;
        var value = null;
        if (this.id === 'name') {
                regExp = /^[A-ZА-я][a-zа-я]/;
                value = '*Required field';
                inputValue = 'Username must begin with a capital letter and contain at least 2 symbols';

        }
        if (!this.input.value) {
            this.input.style.borderColor = '#f16d7f';
            this.message.textContent = value;
            this.message.classList.add('form__message');
            return;
        } else if (!regExp.test(this.input.value)) {
            this.input.style.borderColor = '#f16d7f';
            this.message.textContent = inputValue;
            this.message.classList.add('form__message');
            return;
        } else {
            this.input.style.borderColor = '#eaeaea';
            this.message.textContent = '';
        }
    }
    return true;
};


