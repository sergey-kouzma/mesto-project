const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__field',
    inputErrorClassName: 'form__field_error',
    inputBlockSelector: '.form__elem-block',
    inputURLSelector: "add-place__img",
    submitButtonSelector: '.form__button',
    inactiveButtonSelector: 'form__button_disactive',
    errorClass: '.form__field-error'
};

const forms = document.querySelectorAll('.form')

export { validationConfig, forms }