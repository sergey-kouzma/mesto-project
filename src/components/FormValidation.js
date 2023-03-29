export default class FormValidation {
    constructor(config, anyPopup) {
        this._config = config;
        this._element = document.querySelector(anyPopup);
        this._formElement = this._element.querySelector(this._config.formSelector)
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _showError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = "";
    }

    _checkInputValidity(inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showError(
                inputElement,
                inputElement.validationMessage,
                this._config
            );
        } else {
            this._hideError(inputElement);
        }
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.setAttribute("disabled", true);
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.removeAttribute("disabled");
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _setEventListeners() {
        this.toggleButtonState();
        this._formElement.addEventListener("reset", () => {
            setTimeout(() => {
                this.toggleButtonState();
            }, 0);
        });

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}
